import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import {
  getModulesBySubchapter,
  getModuleById,
  getModuleDownloadUrl,
  uploadModule,
  updateModule,
  deleteModule,
  approveModule,
  rejectModule,
  hideModule,
} from '../controllers/modulesController';
import { authenticate, optionalAuth } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { validate } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { upload } from '../config/multer';

const router = Router();

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many upload requests, please try again later',
});

router.get('/subchapter/:subchapterId', optionalAuth, asyncHandler(getModulesBySubchapter));

router.get('/:id', optionalAuth, asyncHandler(getModuleById));

router.get('/:id/download', authenticate, asyncHandler(getModuleDownloadUrl));

router.post(
  '/subchapter/:subchapterId/upload',
  authenticate,
  requirePermission('modules:create'),
  uploadLimiter,
  upload.single('file'),
  validate([
    body('name').notEmpty().isLength({ max: 200 }).withMessage('Name is required and must be max 200 characters'),
    body('description').optional().isString(),
    body('order').optional().isInt({ min: 0 }),
  ]),
  asyncHandler(uploadModule)
);

router.put(
  '/:id',
  authenticate,
  requirePermission('modules:update'),
  validate([
    body('name').optional().isLength({ max: 200 }),
    body('description').optional().isString(),
    body('order').optional().isInt({ min: 0 }),
  ]),
  asyncHandler(updateModule)
);

router.delete(
  '/:id',
  authenticate,
  requirePermission('modules:delete'),
  asyncHandler(deleteModule)
);

router.post(
  '/:id/approve',
  authenticate,
  requirePermission('modules:approve'),
  asyncHandler(approveModule)
);

router.post(
  '/:id/reject',
  authenticate,
  requirePermission('modules:approve'),
  validate([
    body('reason').optional().isString(),
  ]),
  asyncHandler(rejectModule)
);

router.post(
  '/:id/hide',
  authenticate,
  requirePermission('modules:moderate'),
  asyncHandler(hideModule)
);

export default router;
