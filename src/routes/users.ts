import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  assignRole,
  revokeRole,
  verifyContributor,
  deleteUser,
} from '../controllers/usersController';
import { authenticate } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { validate } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get(
  '/',
  authenticate,
  requirePermission('users:manage'),
  asyncHandler(getAllUsers)
);

router.get('/:id', authenticate, asyncHandler(getUserById));

router.put(
  '/:id/profile',
  authenticate,
  validate([
    body('bio').optional().isString(),
    body('avatar_url').optional().isURL(),
  ]),
  asyncHandler(updateUserProfile)
);

router.post(
  '/roles/assign',
  authenticate,
  requirePermission('roles:assign'),
  validate([
    body('userId').isUUID().withMessage('Valid user ID is required'),
    body('roleId').isUUID().withMessage('Valid role ID is required'),
    body('expiresAt').optional().isISO8601(),
  ]),
  asyncHandler(assignRole)
);

router.post(
  '/roles/revoke',
  authenticate,
  requirePermission('roles:assign'),
  validate([
    body('userId').isUUID().withMessage('Valid user ID is required'),
    body('roleId').isUUID().withMessage('Valid role ID is required'),
  ]),
  asyncHandler(revokeRole)
);

router.post(
  '/:id/verify-contributor',
  authenticate,
  requirePermission('users:manage'),
  asyncHandler(verifyContributor)
);

router.delete(
  '/:id',
  authenticate,
  requirePermission('users:delete'),
  asyncHandler(deleteUser)
);

export default router;
