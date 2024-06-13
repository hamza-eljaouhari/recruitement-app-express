import { Router } from 'express';
import { register, login } from '../controllers/authController';
import passport from '../config/passport';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);

const generateJwtToken = (user: User) => {
    return jwt.sign({ id: user.id, type: user.type }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  };
  
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3001/auth/login' }),
    (req, res) => {
      // Successful authentication, generate the JWT token and redirect to the frontend
      const user = req.user as User;
      const jwtToken = generateJwtToken(user);
      res.redirect(`http://localhost:3001?token=${jwtToken}`);
    }
  );
  
  router.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));
  
  router.get(
    '/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: 'http://localhost:3001/auth/login' }),
    (req, res) => {
      // Successful authentication, generate the JWT token and redirect to the frontend
      const user = req.user as User;
      const jwtToken = generateJwtToken(user);
      res.redirect(`http://localhost:3001?token=${jwtToken}`);
    }
  );

export default router;
