import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as LinkedInStrategy, Profile as LinkedInProfile } from 'passport-linkedin-oauth2';
import User from '../models/user';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, async (token: string, tokenSecret: string, profile: GoogleProfile, done) => {
  try {
    const existingUser = await User.findOne({ where: { googleId: profile.id } });
    if (existingUser) {
      return done(null, existingUser);
    }
    const newUser = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails ? profile.emails[0].value : '',
      type: 'candidate', // or determine based on your logic
    });
    done(null, newUser);
  } catch (err) {
    done(err, false);
  }
}));

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID!,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  callbackURL: 'http://localhost:3000/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_liteprofile'],
}, async (token: string, tokenSecret: string, profile: LinkedInProfile, done) => {
  try {
    const existingUser = await User.findOne({ where: { linkedinId: profile.id } });
    if (existingUser) {
      return done(null, existingUser);
    }
    const newUser = await User.create({
      linkedinId: profile.id,
      name: profile.displayName,
      email: profile.emails ? profile.emails[0].value : '',
      type: 'candidate', // or determine based on your logic
    });
    done(null, newUser);
  } catch (err) {
    done(err, false);
  }
}));

export default passport;
