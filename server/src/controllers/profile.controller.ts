import { Request, Response } from 'express';
import User from '../models/user.model';
import Profile from '../models/profile.model';

export const GetProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).send({ message: 'Access denied!!' });
    }
    const profile = await Profile.findOne({ userId: user.id });
    return res.status(200).json({ profile });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const CreateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).send({ message: 'Access denied!!' });
    }
    const found = await Profile.findOne({ userId: user.id });
    if (found) {
      return res.status(500).send({ message: 'User profile already exist' });
    }
    const { firstName, lastName, dob, phone, profileImg, bio } = req.body;
    const profile = new Profile({
      firstName,
      lastName,
      bio,
      dob,
      phone,
      profileImg,
      userId: user.id,
    });
    await profile.save();
    await User.findByIdAndUpdate(user.id, { profileId: profile._id });
    return res.status(201).json({ profile });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const UpdateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).send({ message: 'Access denied!!' });
    }
    const { id } = req.params;
    await Profile.findByIdAndUpdate(id, req.body);
    const profile = await Profile.findById(id);
    return res.status(200).json({ profile });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const DeleteProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).send({ message: 'Access denied!!' });
    }
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Profile successfully deleted!!' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
