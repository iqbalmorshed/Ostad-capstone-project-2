import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import * as userEntity from '../entities/user.entity';

export class UpdateRoleDto {
  @ApiProperty({ enum: userEntity.USER_ROLES })
  @IsIn(userEntity.USER_ROLES)
  role: userEntity.UserRole;
}
