# Node.js Production Ready Backend

A scalable, production-ready Node.js Express backend project.

## Features

- **Layered Architecture**: Routes, Controllers, Services, Repositories layer separation.
- **Winston Logger**: Daily rotating files and console logs.
- **JWT Auth**: Authentication built-in.
- **Validation**: Zod schema validations.
- **Security**: Helmet, Rate Limiter, CORS protection.
- **Developer Experience**: ESLint, Prettier, Husky, lint-staged.
- **Testing**: Jest with Supertest setup.

## Setup

1. Copy `.env.example` to `.env` and configure your database credentials.

## Folder Structure

```
src/
 ├── config/
 ├── controllers/
 ├── middlewares/
 ├── models/ (Prisma schema replaces internal models logic)
 ├── repositories/
 ├── routes/
 ├── services/
 ├── utils/
 ├── validators/
 ├── app.js
 └── server.js
```

## Running Tests

```bash
npm run test
```
