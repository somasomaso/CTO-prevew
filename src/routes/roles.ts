import { Router } from 'express';
import {
  getAllRoles,
  getRoleById,
  getAllPermissions,
  getRoleUsers,
  getRoleChangeLogs,
} from '../controllers/rolesController';
import { authenticate } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, asyncHandler(getAllRoles));

router.get('/:id', authenticate, asyncHandler(getRoleById));

router.get('/:id/users', authenticate, requirePermission('users:manage'), asyncHandler(getRoleUsers));

router.get(
  '/audit/changes',
  authenticate,
  requirePermission('roles:manage'),
  asyncHandler(getRoleChangeLogs)
);

export default router;

export const permissionsRouter = Router();

permissionsRouter.get('/', authenticate, asyncHandler(getAllPermissions));
