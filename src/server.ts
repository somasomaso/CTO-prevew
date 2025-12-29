import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import { sanitizeInput } from './middleware/validation';

import authRoutes from './routes/auth';
import subjectsRoutes from './routes/subjects';
import chaptersRoutes from './routes/chapters';
import subchaptersRoutes from './routes/subchapters';
import modulesRoutes from './routes/modules';
import usersRoutes from './routes/users';
import rolesRoutes, { permissionsRouter } from './routes/roles';
import ratingsRoutes from './routes/ratings';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(sanitizeInput);
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/chapters', chaptersRoutes);
app.use('/api/subchapters', subchaptersRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permissions', permissionsRouter);
app.use('/api/ratings', ratingsRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('Failed to connect to database. Please check your database configuration.');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log('');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`✓ Server is running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ API Base URL: http://localhost:${PORT}/api`);
      console.log(`✓ Health Check: http://localhost:${PORT}/health`);
      console.log('═══════════════════════════════════════════════════════');
      console.log('');
      console.log('Available endpoints:');
      console.log('  POST   /api/auth/signup');
      console.log('  POST   /api/auth/login');
      console.log('  GET    /api/auth/profile');
      console.log('  POST   /api/auth/logout');
      console.log('');
      console.log('  GET    /api/subjects');
      console.log('  GET    /api/chapters/subject/:subjectId');
      console.log('  GET    /api/subchapters/chapter/:chapterId');
      console.log('  GET    /api/modules/subchapter/:subchapterId');
      console.log('');
      console.log('  POST   /api/modules/subchapter/:subchapterId/upload');
      console.log('  POST   /api/modules/:id/approve');
      console.log('  POST   /api/modules/:id/reject');
      console.log('');
      console.log('  GET    /api/users');
      console.log('  POST   /api/users/roles/assign');
      console.log('  POST   /api/users/roles/revoke');
      console.log('');
      console.log('  GET    /api/roles');
      console.log('  GET    /api/permissions');
      console.log('');
      console.log('  GET    /api/ratings/module/:moduleId');
      console.log('  POST   /api/ratings/module/:moduleId');
      console.log('═══════════════════════════════════════════════════════');
      console.log('');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
