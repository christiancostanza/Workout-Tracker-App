# Workout Tracker - Frontend

A modern React-based fitness tracking application built with Vite, React Router, Tailwind CSS, and Axios.

## Features

### Authentication & Account Management
- User registration and login
- JWT token-based authentication
- Protected routes for authenticated users
- Account management page with profile editing
- Password change functionality
- Security settings dashboard

### Workout Management
- View all your workouts in a dashboard
- Create new workouts with multiple exercises
- Track sets and reps for each exercise
- Edit and delete workouts
- Clean, responsive UI

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── AddWorkout.jsx
│   └── Account.jsx
├── components/         # Reusable components
│   ├── PrivateRoute.jsx
│   └── WorkoutCard.jsx
├── context/           # React Context
│   └── AuthContext.jsx
├── services/          # API services
│   └── api.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the frontend folder:
```env
VITE_API_URL=http://localhost:5000/api
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building

Create a production build:
```bash
npm run build
```

## Environment Variables

- `VITE_API_URL`: Backend API URL (default: `http://localhost:5000/api`)

## API Endpoints Expected

The frontend expects the following API endpoints from the backend:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Workouts
- `GET /api/workouts` - Get all workouts for authenticated user
- `POST /api/workouts` - Create a new workout
- `PUT /api/workouts/:id` - Update a workout
- `DELETE /api/workouts/:id` - Delete a workout

## Authentication Flow

1. User registers or logs in
2. Backend returns user data and JWT token
3. Token is stored in localStorage
4. Token is automatically added to all subsequent API requests via Axios interceptor
5. Protected routes check for authenticated user

## Future Enhancements

- Workout history and analytics
- Exercise library
- Progress tracking charts
- Social features (share workouts)
- Mobile app version

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
