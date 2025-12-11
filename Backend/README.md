# Workout Tracker - Backend

This is a simple Express + MongoDB backend for the Workout Tracker app.

## Features

- User registration and login (JWT)
- Workout CRUD (per-user)
- MongoDB using Mongoose

## Setup

1. Copy `.env.example` to `.env` and update values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/workout-app
JWT_SECRET=your_jwt_secret
```

2. Install dependencies:

```bash
cd Backend
npm install
```

3. Start development server:

```bash
npm run dev
```

API will be available at `http://localhost:5000`.

## Endpoints

- `POST /api/auth/register` - { name, email, password }
- `POST /api/auth/login` - { email, password }
- `GET /api/workouts` - (auth required)
- `POST /api/workouts` - (auth required) { name, description, exercises }
- `PUT /api/workouts/:id` - (auth required)
- `DELETE /api/workouts/:id` - (auth required)

## Notes
- The frontend expects the auth endpoints to return `{ user, token }` on register/login.
- The token must be set in `Authorization: Bearer <token>` header for protected endpoints.
