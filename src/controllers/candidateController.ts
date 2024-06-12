import { Request, Response } from 'express';
import models from '../models';

const { User } = models;

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user?.id); // req.user is now properly typed
    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user?.id); // req.user is now properly typed
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      await user.save();
      res.json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
