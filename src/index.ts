import express from 'express';
import session from 'express-session';
import passport from './config/passport'; // Adjust the path as needed
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import candidateRoutes from './routes/candidateRoutes';
import recruiterRoutes from './routes/recruiterRoutes';
import sequelize from './config/sequelize';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// Use express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(authRoutes);
app.use(candidateRoutes);
app.use(recruiterRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the SaaS Recruitment App');
});

// Synchronize all defined models to the DB
sequelize.sync()
  .then(() => {
    console.log("Database synchronized");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: any) => {
    console.error('Unable to synchronize the database:', error);
  });
