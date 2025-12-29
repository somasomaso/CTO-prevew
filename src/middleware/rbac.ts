import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
      return;
    }

    const userRoles = req.user.roles || [];
    const hasRole = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      res.status(403).json({
        success: false,
        error: `Access denied. Required role(s): ${allowedRoles.join(', ')}`,
        requiredRoles: allowedRoles,
        userRoles: userRoles,
      });
      return;
    }

    next();
  };
};

export const requirePermission = (...requiredPermissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
      return;
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      res.status(403).json({
        success: false,
        error: `Access denied. Required permission(s): ${requiredPermissions.join(', ')}`,
        requiredPermissions,
        userPermissions,
      });
      return;
    }

    next();
  };
};

export const requireAnyPermission = (...permissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
      return;
    }

    const userPermissions = req.user.permissions || [];
    const hasAnyPermission = permissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasAnyPermission) {
      res.status(403).json({
        success: false,
        error: `Access denied. Required at least one of: ${permissions.join(', ')}`,
        requiredPermissions: permissions,
        userPermissions,
      });
      return;
    }

    next();
  };
};

export const requireOwnership = (resourceIdParam: string = 'id') => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
      return;
    }

    const resourceOwnerId = req.params[resourceIdParam] || req.body.userId;
    const isOwner = resourceOwnerId === req.user.userId;
    const isAdmin = req.user.roles.includes('admin');
    const isModerator = req.user.roles.includes('moderator');

    if (!isOwner && !isAdmin && !isModerator) {
      res.status(403).json({
        success: false,
        error: 'Access denied. You can only access your own resources.',
      });
      return;
    }

    next();
  };
};
