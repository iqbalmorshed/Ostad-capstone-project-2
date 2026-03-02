import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { UserDocument, UserRole } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt.strategy';

const SALT_ROUNDS = 10;

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthUserResponse {
  id: string;
  email: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private getExpires(): { accessMs: number; refreshMs: number } {
    const access = this.config.get('JWT_ACCESS_EXPIRES', '15m');
    const refresh = this.config.get('JWT_REFRESH_EXPIRES', '7d');
    const accessMs = this.parseMs(access);
    const refreshMs = this.parseMs(refresh);
    return { accessMs, refreshMs };
  }

  private parseMs(value: string): number {
    const match = value.match(/^(\d+)(s|m|h|d)$/);
    if (!match) return 15 * 60 * 1000;
    const [, n, unit] = match;
    const num = parseInt(n!, 10);
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };
    return num * (multipliers[unit] ?? 1000);
  }

  private buildTokens(user: UserDocument): TokenResponse {
    const { accessMs, refreshMs } = this.getExpires();
    const accessSecret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role as UserRole,
      type: 'access',
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: accessMs / 1000,
    });
    const refreshToken = this.jwtService.sign(
      { sub: user._id.toString(), type: 'refresh' },
      { secret: refreshSecret, expiresIn: refreshMs / 1000 },
    );
    return {
      accessToken,
      refreshToken,
      expiresIn: Math.floor(accessMs / 1000),
    };
  }

  private toUserResponse(user: UserDocument): AuthUserResponse {
    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role as UserRole,
    };
  }

  async register(
    dto: RegisterDto,
  ): Promise<{ user: AuthUserResponse } & TokenResponse> {
    const existing = await this.usersRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.usersRepository.create({
      email: dto.email,
      password: hash,
      role: 'user',
    } as Partial<UserDocument>);
    const tokens = this.buildTokens(user);
    return {
      user: this.toUserResponse(user),
      ...tokens,
    };
  }

  async login(dto: LoginDto): Promise<{ user: AuthUserResponse } & TokenResponse> {
    const user = await this.usersRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const tokens = this.buildTokens(user);
    return {
      user: this.toUserResponse(user),
      ...tokens,
    };
  }

  async refresh(refreshToken: string): Promise<TokenResponse> {
    if (!refreshToken?.trim()) {
      throw new UnauthorizedException('Refresh token is required');
    }
    const refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    let payload: { sub: string; type?: string };
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: refreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }
    const user = await this.usersRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.buildTokens(user);
  }

  logout(): { message: string } {
    return { message: 'Logged out successfully' };
  }
}
