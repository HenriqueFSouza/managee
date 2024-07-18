import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import User from '../models/User';

const userSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(['participant', 'organizer']),
});

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.errors });
    }

    const { username, email, password, role } = parsedData.data;

    const userAlrearyExists = await User.findOne({ email });

    if (userAlrearyExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 6);

      const user = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await user.save();

      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Error registering new user.' });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(user);
  }
}

export default new UserController();
