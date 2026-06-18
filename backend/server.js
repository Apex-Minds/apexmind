const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const clientOrigin = process.env.CLIENT_URL;

app.use(
  cors({
    origin: clientOrigin ? [clientOrigin] : true,
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth',       require('./routes/auth.routes'));
app.use('/api/admin',      require('./routes/admin.routes'));
app.use('/api/teacher',    require('./routes/teacher.routes'));
app.use('/api/teachers',   require('./routes/teacher.routes'));
app.use('/api/student',    require('./routes/student.routes'));
app.use('/api/students',   require('./routes/student.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/marks',      require('./routes/marks.routes'));
app.use('/api/classes',    require('./routes/classes.routes'));
app.use('/api/subjects',   require('./routes/subjects.routes'));
app.use('/api/public',     require('./routes/public.routes'));

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(buildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.use(require('./middleware/error.middleware'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ApexMinds server running on port ${PORT}`));
