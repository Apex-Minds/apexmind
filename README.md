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

## VPS Deployment

This app is already set up to run as a single production service:
- the React frontend is built with `npm run build`
- the Express server serves `frontend/build`
- API requests go to `/api`

### 1. Install prerequisites
On your VPS, install:
- Node.js 18+ or 20+
- npm
- MongoDB connection access
- PM2
- Nginx

### 2. Set environment variables
Create `backend/.env` on the server with:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRE=7d
CLIENT_URL=http://your-vps-ip-or-domain
```

If you use HTTPS and a domain, set `CLIENT_URL` to your exact site URL, for example:
```env
CLIENT_URL=https://school.yourdomain.com
```

### 3. Install and build
From the project root:
```bash
cd backend && npm install
cd ../frontend && npm install && npm run build
```

### 4. Start the backend
```bash
cd backend
pm2 start server.js --name apexminds
pm2 save
pm2 startup
```

### 5. Configure Nginx
Use Nginx as a reverse proxy to the Node app:
```nginx
server {
    listen 80;
    server_name your-domain-or-server-ip;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6. Verify
- Visit the site in your browser.
- Confirm the homepage loads.
- Test `/login`, admin, teacher, and student flows.
- Confirm API routes respond through the same domain.

### Notes
- If you want HTTPS, add a Let’s Encrypt certificate after Nginx is working.
- If you change frontend code, rebuild with `npm run build` again before restarting PM2.
- If you change backend code, restart PM2 after deploying the update.
