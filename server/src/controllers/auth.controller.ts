import User from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../constants/role.enum';

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const found = await User.findOne({ email });
    if (found) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      roles: Role.USER,
    });

    user.save();

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const found = await User.findOne({ email });
    if (!found) {
      return res.status(400).json({ msg: 'No user found!!' });
    }
    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials!!' });
    }
    const token = jwt.sign(
      { id: found._id, roles: found.roles },
      process.env.JWT_SECRET!
    );
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};
