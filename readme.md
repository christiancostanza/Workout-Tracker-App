(# 📘 Workout Tracker App

A simple full-stack workout tracker to log exercises, manage routines, and monitor progress over time.

---

## 🚀 Overview

This is a full-stack application for tracking workouts. Users can register and log in, then create, view, update, and delete workouts tied to their account. It's aimed at anyone who wants a lightweight tool to record workouts and see quick summaries of their activity.


---

## 🌐 Live Demo

| Type                         | Link                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| **Frontend (Deployed Site)** | [https://cs195workouttracker.netlify.app/] |(https://cs195workouttracker.netlify.app/)
| **Backend (API Base URL)**   | [https://workout-tracker-app-backend-28fg.onrender.com/](https://workout-tracker-app-backend-28fg.onrender.com/)   |

---

## ✨ Features

* Create, read, update, and delete **workouts**
* Responsive UI with reusable components (`WorkoutCard`, `PrivateRoute`)
* Backend API with full CRUD operations and auth middleware
* Data persisted in MongoDB via Mongoose
* Advanced feature: **Authentication & Protected Routes** — users must sign in to access their workouts; JWT tokens protect API endpoints
* Error handling on client and server

### **Advanced Feature**

Authentication and protected routes are implemented using JSON Web Tokens (JWT). On login/register the server returns a token stored in localStorage; the frontend attaches the token to API requests and the backend validates it with middleware before granting access to user-specific data.

---

## 📸 Screenshots

> Include 2–4 screenshots of your app.
> Use relative paths (e.g., `/screenshots/home.png`) or full URLs.

| View | Path |
| ---- | ---- |
| Dashboard | '/screenshots/Screenshot 2025-12-14 153149.png' |
| Add Workout | '/screenshots/Screenshot 2025-12-14 153216.png' |

---

## 🏗️ Project Architecture

```
/Frontend
	/src
		/components
		/pages
		App.jsx
		main.jsx

/Backend
	/models
	/routes
	server.js
```

The React frontend communicates with the Express backend through API routes under `/api`. The backend interacts with MongoDB using Mongoose models, and environment variables are used to store secrets.

---

## 📦 Installation & Setup

### **1. Clone the project**

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

---

### **2. Environment Variables**

Include a `.env.example` file in both repos.

**Backend `.env.example`:**

```
MONGO_URI=your_mongodb_url
PORT=4000
JWT_SECRET=your_secret_if_using_auth
API_KEY=if_using_external_apis
```

**Frontend `.env.example`:**

```
VITE_API_URL=https://your-backend-url.com
```

---

### **3. Install Dependencies**

#### Frontend:

```bash
cd Frontend
npm install
npm run dev
```

#### Backend:

```bash
cd Backend
npm install
npm run dev
```

---

### **4. Running Entire App Locally**

1. Start backend on `http://localhost:3000` (or `PORT` in `.env`)
2. Start frontend on `http://localhost:5173`
3. Confirm CORS + API requests are working

---

## 🛠 API Documentation

### **GET /api/workouts**

Returns all workouts for the authenticated user.

### **POST /api/workouts**

Creates a new workout.
Body example:

```json
{
	"title": "Leg Day",
	"load": 80,
	"reps": 8
}
```

### **PATCH /api/workouts/:id**

Updates a workout.

### **DELETE /api/workouts/:id**

Deletes a workout.

### **POST /api/auth/register** and **POST /api/auth/login**

Create an account and sign in. On success, both return a JWT token.

---

## 🚀 Deployment Notes

### **Frontend**

* Recommended: Netlify
* Build command: `npm run build`

### **Backend**

* Recommended: Render
* Set environment variables in the hosting dashboard (e.g., `MONGO_URI`, `JWT_SECRET`)


---

## 🎥 Video Walkthrough

**Link to Loom/YouTube:**
[https://www.loom.com/share/d8b011f8656847e394b72b29732c1343](https://www.loom.com/share/d8b011f8656847e394b72b29732c1343)


---

# 🧠 Reflection

### **1. What was the hardest part of this project?**

The hardest part was coordinating authentication across the frontend and backend and ensuring protected API routes only return user-specific data. Debugging token handling and CORS issues took the most time.

### **2. What are you most proud of?**

I'm most proud of the totality of the whole project, I've worked on all of the parts seperately for this project but I've never worked on all of them alone and made the full project solo.

### **3. What would you do differently next time?**

Next time I would probably focus on the whole project instead of focusing on the frontend first and then focusing on the backend.

### **4. How did you incorporate feedback from the 12/5 check-in gallery?**

My project did not get a ton of feedback to integrate, the big thing people mentioned was creating a nicer looking frontend which I did and focused on.

---

# Acknowledgments / AI Usage Disclosure

Used tools: VSCode, Vite, Node.js. Some documentation and debugging assistance came from ChatGPT and GitHub Copilot for small suggestions as well as helping with css design.

