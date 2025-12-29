import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login, getProfile, logout } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { validatePassword } from '../utils/password';

const router = Router();

router.post(
  '/signup',
  validate([
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('username')
      .isLength({ min: 3, max: 30 })
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
    body('password').custom((value) => {
      const validation = validatePassword(value);
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      return true;
    }),
  ]),
  asyncHandler(signup)
);

router.post(
  '/login',
  validate([
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  asyncHandler(login)
);

router.get('/profile', authenticate, asyncHandler(getProfile));

router.post('/logout', authenticate, asyncHandler(logout));

export default router;
