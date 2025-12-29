import { Router } from 'express';
import { body } from 'express-validator';
import {
  getRatingsByModule,
  createRating,
  updateRating,
  deleteRating,
} from '../controllers/ratingsController';
import { authenticate, optionalAuth } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { validate } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/module/:moduleId', optionalAuth, asyncHandler(getRatingsByModule));

router.post(
  '/module/:moduleId',
  authenticate,
  requirePermission('ratings:create'),
  validate([
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('review').optional().isString().isLength({ max: 1000 }),
  ]),
  asyncHandler(createRating)
);

router.put(
  '/:id',
  authenticate,
  validate([
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('review').optional().isString().isLength({ max: 1000 }),
  ]),
  asyncHandler(updateRating)
);

router.delete('/:id', authenticate, asyncHandler(deleteRating));

export default router;
