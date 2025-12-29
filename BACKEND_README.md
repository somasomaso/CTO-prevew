# Educational Platform Backend API

A robust Node.js + Express backend with comprehensive Role-Based Access Control (RBAC), PostgreSQL database, JWT authentication, and AWS S3 integration.

## Features

- ✅ Express.js server with TypeScript
- ✅ PostgreSQL database with RBAC schema
- ✅ JWT authentication with role/permission payload
- ✅ Comprehensive RBAC system (Admin, Moderator, Contributor, Viewer)
- ✅ AWS S3 integration for file uploads
- ✅ Module approval workflow
- ✅ User role management
- ✅ Audit logging for role changes and content approvals
- ✅ Rate limiting for uploads
- ✅ Input validation and sanitization
- ✅ Error handling with detailed messages
- ✅ CORS enabled for frontend integration

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- AWS Account with S3 bucket configured
- Git

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   - Database credentials
   - JWT secret
   - AWS credentials and S3 bucket name
   - Server port

3. **Create PostgreSQL database:**
   ```bash
   createdb educational_platform
   ```

4. **Run migrations:**
   ```bash
   npm run server:build
   npm run db:migrate
   ```

5. **Seed initial data (roles, permissions, admin user):**
   ```bash
   npm run db:seed
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run server:dev
```

### Production Mode
```bash
npm run server:build
npm run server:start
```

The server will run on `http://localhost:5000` (or the PORT specified in .env)

## Default Admin Account

After seeding, use these credentials to login:
- **Email:** admin@example.com
- **Password:** Admin123!

⚠️ **IMPORTANT:** Change the admin password immediately after first login!

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/logout` - Logout user

### Subjects
- `GET /api/subjects` - List all subjects
- `GET /api/subjects/:id` - Get subject by ID
- `POST /api/subjects` - Create subject (Admin/Moderator)
- `PUT /api/subjects/:id` - Update subject (Admin/Moderator)
- `DELETE /api/subjects/:id` - Delete subject (Admin)

### Chapters
- `GET /api/chapters/subject/:subjectId` - List chapters by subject
- `GET /api/chapters/:id` - Get chapter by ID
- `POST /api/chapters/subject/:subjectId` - Create chapter (Admin/Moderator)
- `PUT /api/chapters/:id` - Update chapter (Admin/Moderator)
- `DELETE /api/chapters/:id` - Delete chapter (Admin)

### Subchapters
- `GET /api/subchapters/chapter/:chapterId` - List subchapters by chapter
- `GET /api/subchapters/:id` - Get subchapter by ID
- `POST /api/subchapters/chapter/:chapterId` - Create subchapter (Admin/Moderator)
- `PUT /api/subchapters/:id` - Update subchapter (Admin/Moderator)
- `DELETE /api/subchapters/:id` - Delete subchapter (Admin)

### Modules
- `GET /api/modules/subchapter/:subchapterId` - List modules by subchapter
- `GET /api/modules/:id` - Get module by ID
- `GET /api/modules/:id/download` - Get presigned download URL
- `POST /api/modules/subchapter/:subchapterId/upload` - Upload module (Contributor+)
- `PUT /api/modules/:id` - Update module metadata
- `DELETE /api/modules/:id` - Delete module
- `POST /api/modules/:id/approve` - Approve module (Moderator+)
- `POST /api/modules/:id/reject` - Reject module (Moderator+)
- `POST /api/modules/:id/hide` - Hide module (Moderator+)

### Users
- `GET /api/users` - List all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/profile` - Update user profile
- `POST /api/users/roles/assign` - Assign role to user (Admin)
- `POST /api/users/roles/revoke` - Revoke role from user (Admin)
- `POST /api/users/:id/verify-contributor` - Verify contributor (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Roles & Permissions
- `GET /api/roles` - List all roles
- `GET /api/roles/:id` - Get role details with permissions
- `GET /api/roles/:id/users` - List users with specific role
- `GET /api/roles/audit/changes` - Get role change audit logs (Admin)
- `GET /api/permissions` - List all permissions

### Ratings
- `GET /api/ratings/module/:moduleId` - Get module ratings
- `POST /api/ratings/module/:moduleId` - Create rating (Viewer+)
- `PUT /api/ratings/:id` - Update rating
- `DELETE /api/ratings/:id` - Delete rating

## Role-Based Access Control

### Roles Hierarchy (by level)

1. **Viewer** (Level 1)
   - View all approved content
   - Rate and review modules
   - Update own profile

2. **Contributor** (Level 2)
   - All Viewer permissions
   - Upload new modules
   - Update/delete own modules
   - View own upload analytics

3. **Moderator** (Level 3)
   - All Contributor permissions
   - Approve/reject modules
   - Hide/feature modules
   - Moderate user content
   - Manage user profiles

4. **Admin** (Level 4)
   - All Moderator permissions
   - Manage subjects, chapters, subchapters
   - Assign/revoke roles
   - Delete any content
   - View audit logs
   - Full system access

### Module Approval Workflow

1. Contributor uploads module → Status: `pending`
2. Moderator/Admin reviews module
3. Moderator/Admin approves → Status: `approved` (visible to all)
4. OR Moderator/Admin rejects → Status: `rejected` (only visible to uploader)
5. OR Moderator/Admin hides → Status: `hidden` (removed from public view)

## File Upload

- Only HTML files allowed
- Maximum file size: 10MB
- Files stored in AWS S3
- Automatic file validation
- SHA-256 hash for file integrity
- Rate limiting: 10 uploads per 15 minutes

## Security Features

- JWT authentication with expiry
- Password hashing with bcrypt (10 rounds)
- Input validation and sanitization
- XSS protection
- CORS configuration
- Helmet security headers
- Rate limiting on sensitive endpoints
- SQL injection prevention (parameterized queries)

## Audit Logging

The system logs:
- All role assignments/revocations
- Module uploads/deletions
- Module approvals/rejections
- User actions with IP addresses
- Timestamps for all operations

## Database Schema

### Core Tables
- `users` - User accounts
- `user_profiles` - Extended user information
- `roles` - System roles
- `permissions` - Granular permissions
- `user_roles` - User-role assignments
- `role_permissions` - Role-permission mappings

### Content Tables
- `subjects` - Top-level content categories
- `chapters` - Subject subdivisions
- `subchapters` - Chapter subdivisions
- `modules` - Learning modules (HTML files)

### Metadata Tables
- `module_ratings` - User ratings and reviews
- `upload_logs` - Audit trail for uploads
- `role_change_logs` - Audit trail for role changes

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here",
  "details": []
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Project Structure
```
src/
├── config/          # Configuration files (DB, JWT, S3, Multer)
├── controllers/     # Business logic
├── middleware/      # Express middleware (auth, RBAC, validation, errors)
├── routes/          # API route definitions
├── utils/           # Utility functions (S3, password)
├── types/           # TypeScript type definitions
├── database/        # SQL schema and seed files
├── scripts/         # Migration and seed scripts
└── server.ts        # Main server entry point
```

### Adding New Permissions

1. Add permission to `src/database/seed.sql`
2. Assign to appropriate roles
3. Run seed script or insert manually
4. Use in route middleware: `requirePermission('resource:action')`

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Add RBAC middleware
4. Register in `src/server.ts`

## Testing

Test the API using:
- Postman/Insomnia
- cURL
- Automated tests (to be implemented)

Example cURL request:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin123!"}'

# Use token in subsequent requests
curl -X GET http://localhost:5000/api/subjects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Environment Variables

See `.env.example` for all required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing
- `AWS_ACCESS_KEY_ID` - AWS credentials
- `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `AWS_S3_BUCKET_NAME` - S3 bucket name
- `AWS_REGION` - AWS region
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Deployment

1. Build the TypeScript code:
   ```bash
   npm run server:build
   ```

2. Set production environment variables

3. Run migrations and seeds on production database

4. Start the server:
   ```bash
   NODE_ENV=production npm run server:start
   ```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### S3 Upload Errors
- Verify AWS credentials
- Check S3 bucket permissions
- Ensure bucket exists in specified region

### Authentication Failures
- Check JWT_SECRET is set
- Verify token hasn't expired
- Ensure user has required role/permission

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
