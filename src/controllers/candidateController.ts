import { Request, Response } from 'express';
import User from '../models/user';

export const getProfile = async (req: Request, res: Response) => {
  const user = req.user as User;

  if (!user || !user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const foundUser = await User.findByPk(user.id);
    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: foundUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const user = req.user as User;

  if (!user || !user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { name, email } = req.body;
    const foundUser = await User.findByPk(user.id);
    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    foundUser.name = name || foundUser.name;
    foundUser.email = email || foundUser.email;
    await foundUser.save();
    res.json({ user: foundUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
