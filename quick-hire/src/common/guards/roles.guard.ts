import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

const ROLE_ORDER: UserRole[] = ['user', 'admin', 'super-admin'];

function hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const userLevel = ROLE_ORDER.indexOf(userRole);
  const requiredLevel = ROLE_ORDER.indexOf(requiredRole);
  return userLevel >= 0 && requiredLevel >= 0 && userLevel >= requiredLevel;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles?.length) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user?.role) {
      throw new ForbiddenException('Access denied');
    }

    const allowed = requiredRoles.some((role) =>
      hasMinimumRole(user.role as UserRole, role),
    );
    if (!allowed) {
      throw new ForbiddenException('Insufficient role');
    }
    return true;
  }
}
