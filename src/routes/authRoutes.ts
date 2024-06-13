import { Router } from 'express';
import { register, login } from '../controllers/authController';
import passport from '../config/passport';

const router = Router();

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/auth/login' }), (req, res) => {
  // Successful authentication, redirect to the frontend
  if (req.user) {
    res.redirect(`http://localhost:3001?token=${req.user.id}`); // Adjust token passing as per your frontend logic
  } else {
    res.redirect('http://localhost:3001/auth/login');
  }
});

// LinkedIn OAuth
router.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: 'http://localhost:3000/auth/login' }), (req, res) => {
  // Successful authentication, redirect to the frontend
  if (req.user) {
    res.redirect(`http://localhost:3001?token=${req.user.id}`); // Adjust token passing as per your frontend logic
  } else {
    res.redirect('http://localhost:3001/auth/login');
  }
});

export default router;
