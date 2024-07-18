import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import User from '../models/User';
import jwt from 'jsonwebtoken'

class SessionsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6).max(100),
    });

    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.errors });
    }
    const { email, password } = parsedData.data;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: '8h',
      });

      return res.status(200).json({ name: user.username, email: user.email, role: user.role, token });
    } catch (err) {
      return res.status(500).json({ error: 'Error logging in.' });
    }
  }
}

export default new SessionsController();