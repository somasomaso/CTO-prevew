# Project Structure Overview

## Directory Layout

```
/home/engine/project/
├── app/                          # Next.js frontend application
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── src/                          # Express backend application
│   ├── config/                   # Configuration files
│   │   ├── database.ts          # PostgreSQL connection pool
│   │   ├── jwt.ts               # JWT token utilities
│   │   ├── multer.ts            # File upload configuration
│   │   └── s3.ts                # AWS S3 client
│   │
│   ├── controllers/              # Business logic
│   │   ├── authController.ts    # Authentication (signup, login, profile)
│   │   ├── chaptersController.ts
│   │   ├── modulesController.ts # Module CRUD + upload + approval
│   │   ├── ratingsController.ts
│   │   ├── rolesController.ts   # Role and permission management
│   │   ├── subchaptersController.ts
│   │   ├── subjectsController.ts
│   │   └── usersController.ts   # User management + role assignment
│   │
│   ├── database/                 # Database schema and seeds
│   │   ├── schema.sql           # Full database schema with RBAC
│   │   └── seed.sql             # Initial roles, permissions, admin user
│   │
│   ├── middleware/               # Express middleware
│   │   ├── auth.ts              # JWT authentication
│   │   ├── errorHandler.ts      # Global error handling
│   │   ├── logger.ts            # Request logging
│   │   ├── rbac.ts              # Role-based access control
│   │   └── validation.ts        # Input validation & sanitization
│   │
│   ├── routes/                   # API route definitions
│   │   ├── auth.ts              # POST /api/auth/signup, /login, /logout
│   │   ├── chapters.ts          # /api/chapters/*
│   │   ├── modules.ts           # /api/modules/* (includes upload)
│   │   ├── ratings.ts           # /api/ratings/*
│   │   ├── roles.ts             # /api/roles/* + /api/permissions
│   │   ├── subchapters.ts       # /api/subchapters/*
│   │   ├── subjects.ts          # /api/subjects/*
│   │   └── users.ts             # /api/users/* (includes role assignment)
│   │
│   ├── scripts/                  # Utility scripts
│   │   ├── migrate.ts           # Database migration runner
│   │   └── seed.ts              # Database seed runner
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts             # All interfaces and types
│   │
│   ├── utils/                    # Utility functions
│   │   ├── password.ts          # Bcrypt hashing & validation
│   │   └── s3.ts                # S3 upload/download/delete utilities
│   │
│   └── server.ts                 # Main Express server entry point
│
├── dist/                         # Compiled JavaScript (build output)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── scripts/
│   ├── types/
│   ├── utils/
│   └── server.js
│
├── node_modules/                 # Dependencies
├── public/                       # Next.js public assets
│
├── .env                          # Environment variables (create from .env.example)
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── BACKEND_README.md             # Comprehensive backend documentation
├── IMPLEMENTATION_SUMMARY.md     # What was implemented
├── QUICKSTART.md                 # Quick setup guide
├── PROJECT_STRUCTURE.md          # This file
├── README.md                     # Next.js default readme
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Locked dependency versions
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript config (Next.js)
└── tsconfig.server.json          # TypeScript config (Express)
```

## File Count Summary

- **TypeScript Source Files**: 31 files
- **Compiled JavaScript Files**: 31 files
- **SQL Files**: 2 files (schema + seed)
- **Documentation Files**: 4 files (BACKEND_README, QUICKSTART, IMPLEMENTATION_SUMMARY, PROJECT_STRUCTURE)

## Key Files

### Configuration
- `src/config/database.ts` - PostgreSQL connection with pooling
- `src/config/jwt.ts` - JWT generation and verification
- `src/config/s3.ts` - AWS S3 client initialization
- `src/config/multer.ts` - File upload middleware configuration

### Database
- `src/database/schema.sql` - Complete database schema (13 tables with RBAC)
- `src/database/seed.sql` - Initial data (4 roles, 30+ permissions, admin user)

### Core Server
- `src/server.ts` - Express app initialization and route mounting
- `src/types/index.ts` - TypeScript interfaces for all models

### Authentication & Authorization
- `src/middleware/auth.ts` - JWT token verification
- `src/middleware/rbac.ts` - Role and permission checking
- `src/controllers/authController.ts` - Login, signup, profile

### Content Management
- `src/controllers/subjectsController.ts` - Subject CRUD
- `src/controllers/chaptersController.ts` - Chapter CRUD
- `src/controllers/subchaptersController.ts` - Subchapter CRUD
- `src/controllers/modulesController.ts` - Module CRUD + upload + approval

### User & Role Management
- `src/controllers/usersController.ts` - User management + role assignment
- `src/controllers/rolesController.ts` - Role and permission listing
- `src/controllers/ratingsController.ts` - Rating and review management

### Utilities
- `src/utils/password.ts` - Password hashing with bcrypt
- `src/utils/s3.ts` - S3 file operations

### Scripts
- `src/scripts/migrate.ts` - Run database migrations
- `src/scripts/seed.ts` - Seed initial data

## Database Schema

### Core Tables (13 total)

#### Content Hierarchy (4 tables)
1. `subjects` - Top-level categories
2. `chapters` - Subject subdivisions
3. `subchapters` - Chapter subdivisions
4. `modules` - Learning modules (HTML files in S3)

#### Users & Auth (2 tables)
5. `users` - User accounts
6. `user_profiles` - Extended user info

#### RBAC System (4 tables)
7. `roles` - System roles (viewer, contributor, moderator, admin)
8. `permissions` - Granular permissions (resource:action)
9. `role_permissions` - Role-permission mappings
10. `user_roles` - User-role assignments

#### Metadata & Audit (3 tables)
11. `module_ratings` - User ratings and reviews
12. `upload_logs` - Audit trail for uploads/approvals/deletions
13. `role_change_logs` - Audit trail for role changes

## API Endpoints (40+ endpoints)

### Authentication (4 endpoints)
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/profile
- POST /api/auth/logout

### Subjects (5 endpoints)
- GET /api/subjects
- GET /api/subjects/:id
- POST /api/subjects
- PUT /api/subjects/:id
- DELETE /api/subjects/:id

### Chapters (5 endpoints)
- GET /api/chapters/subject/:subjectId
- GET /api/chapters/:id
- POST /api/chapters/subject/:subjectId
- PUT /api/chapters/:id
- DELETE /api/chapters/:id

### Subchapters (5 endpoints)
- GET /api/subchapters/chapter/:chapterId
- GET /api/subchapters/:id
- POST /api/subchapters/chapter/:chapterId
- PUT /api/subchapters/:id
- DELETE /api/subchapters/:id

### Modules (9 endpoints)
- GET /api/modules/subchapter/:subchapterId
- GET /api/modules/:id
- GET /api/modules/:id/download
- POST /api/modules/subchapter/:subchapterId/upload
- PUT /api/modules/:id
- DELETE /api/modules/:id
- POST /api/modules/:id/approve
- POST /api/modules/:id/reject
- POST /api/modules/:id/hide

### Users (7 endpoints)
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id/profile
- POST /api/users/roles/assign
- POST /api/users/roles/revoke
- POST /api/users/:id/verify-contributor
- DELETE /api/users/:id

### Roles & Permissions (5 endpoints)
- GET /api/roles
- GET /api/roles/:id
- GET /api/roles/:id/users
- GET /api/roles/audit/changes
- GET /api/permissions

### Ratings (4 endpoints)
- GET /api/ratings/module/:moduleId
- POST /api/ratings/module/:moduleId
- PUT /api/ratings/:id
- DELETE /api/ratings/:id

### Health (1 endpoint)
- GET /health

## NPM Scripts

### Backend Scripts
```bash
npm run server:dev      # Start dev server (tsx watch)
npm run server:build    # Build TypeScript to JavaScript
npm run server:start    # Start production server
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database
```

### Frontend Scripts
```bash
npm run dev             # Start Next.js dev server
npm run build           # Build Next.js for production
npm run start           # Start Next.js production server
npm run lint            # Run ESLint
```

## Environment Variables (14 required)

### Database (5)
- DATABASE_URL
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

### JWT (2)
- JWT_SECRET
- JWT_EXPIRES_IN

### AWS (4)
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_S3_BUCKET_NAME
- AWS_REGION

### Server (3)
- PORT
- NODE_ENV
- FRONTEND_URL

## Dependencies

### Production Dependencies (13)
- express - Web framework
- cors - CORS middleware
- dotenv - Environment variables
- jsonwebtoken - JWT authentication
- bcrypt - Password hashing
- pg - PostgreSQL client
- @aws-sdk/client-s3 - S3 operations
- @aws-sdk/s3-request-presigner - Presigned URLs
- express-validator - Input validation
- express-rate-limit - Rate limiting
- helmet - Security headers
- multer - File uploads
- uuid - UUID generation

### Development Dependencies (8)
- typescript - TypeScript compiler
- tsx - TypeScript execution
- @types/* - TypeScript type definitions
  - express, cors, jsonwebtoken, bcrypt, pg, multer, uuid

## Code Organization Patterns

### Controllers
- Handle business logic
- Interact with database
- Return responses
- Throw AppError for errors

### Routes
- Define endpoint paths
- Apply middleware (auth, RBAC, validation)
- Call controller functions
- Use asyncHandler for error handling

### Middleware
- `authenticate` - Verify JWT token
- `requireRole` - Check user has role
- `requirePermission` - Check user has permission
- `validate` - Validate input with express-validator
- `sanitizeInput` - Remove XSS attempts

### Utilities
- `hashPassword` - Bcrypt hash
- `comparePassword` - Verify password
- `uploadFileToS3` - Upload to S3
- `generatePresignedUrl` - Get download URL
- `deleteFileFromS3` - Remove from S3

## Security Features

1. **Authentication**: JWT with expiration
2. **Authorization**: RBAC with roles and permissions
3. **Password Security**: Bcrypt hashing (10 rounds)
4. **Input Validation**: express-validator
5. **XSS Protection**: Input sanitization
6. **SQL Injection**: Parameterized queries
7. **Rate Limiting**: Upload rate limits
8. **Security Headers**: Helmet middleware
9. **CORS**: Configured for frontend
10. **Audit Logging**: All sensitive operations logged

## RBAC Permissions

### Resources
- subjects, chapters, subchapters, modules, users, roles, ratings

### Actions
- create, read, update, delete, approve, moderate, manage, assign

### Permission Format
- `resource:action` (e.g., `modules:create`, `users:manage`)

### Role Levels
1. Viewer (Level 1) - 9 permissions
2. Contributor (Level 2) - 12 permissions
3. Moderator (Level 3) - 16 permissions
4. Admin (Level 4) - All permissions (30+)

## Testing Checklist

- [ ] Health check endpoint works
- [ ] User can signup
- [ ] User can login and receive JWT
- [ ] Protected routes require authentication
- [ ] RBAC permissions are enforced
- [ ] Subject CRUD operations work
- [ ] Chapter CRUD operations work
- [ ] Subchapter CRUD operations work
- [ ] Module upload works (HTML to S3)
- [ ] Module approval workflow works
- [ ] Module download presigned URL works
- [ ] Role assignment works (admin only)
- [ ] Ratings work
- [ ] Audit logs are created
- [ ] Error responses are consistent

## Deployment Checklist

- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Configure production database
- [ ] Run migrations on production
- [ ] Run seed on production
- [ ] Change default admin password
- [ ] Set up AWS S3 bucket
- [ ] Configure CORS for production URL
- [ ] Set up HTTPS
- [ ] Configure reverse proxy
- [ ] Set up monitoring
- [ ] Configure database backups
- [ ] Configure S3 backups
- [ ] Test all endpoints in production

## Documentation Files

1. **BACKEND_README.md** - Comprehensive API documentation (300+ lines)
2. **QUICKSTART.md** - Step-by-step setup guide (400+ lines)
3. **IMPLEMENTATION_SUMMARY.md** - What was built (350+ lines)
4. **PROJECT_STRUCTURE.md** - This file (architecture overview)

## Next Steps

1. Test backend locally
2. Set up frontend integration
3. Deploy to staging environment
4. Test end-to-end workflows
5. Deploy to production
6. Monitor and iterate

---

**Total Lines of Code**: 3000+ lines
**Implementation Time**: Complete
**Status**: ✅ Ready for integration and testing
