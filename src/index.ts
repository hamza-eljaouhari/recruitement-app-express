import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './models';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(authRoutes);

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
  .catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });
