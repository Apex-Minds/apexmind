# ApexMinds School Management System

A full-scale MERN stack school management platform with role-based access for Admins, Teachers, and Students.

## Stack
- MongoDB + Mongoose
- Express.js
- React.js
- Node.js
- JWT Authentication

## Roles
- **Admin** — manage students, teachers, classes, subjects
- **Teacher** — take attendance, enter marks
- **Student** — view dashboard, attendance, marks

## Setup

### Backend
```bash
cd backend && npm install && npm run dev
```

### Frontend
```bash
cd frontend && npm install && npm start
```

## Render Deployment

This repo includes a `render.yaml` blueprint for a single Render web service that:
- builds the React frontend
- installs backend dependencies
- serves the built frontend from the Express server

Before deploying, set these Render environment variables:
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL` if you use a custom domain

If you deploy from the Render dashboard instead of the blueprint, use:
- Build command: `cd frontend && npm install && npm run build && cd ../backend && npm install`
- Start command: `cd backend && npm start`
