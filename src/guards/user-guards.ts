import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('Payload:', payload); 
      const userRole = payload.role;
      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );

      if (!requiredRoles || requiredRoles.length === 0) {
        return true; 
      }

      console.log('User Role:', userRole); // Debug user role
      console.log('Required Roles:', requiredRoles); // Debug required roles

      return requiredRoles.includes(userRole);
    } catch (error) {
      console.error('Role Verification Error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
