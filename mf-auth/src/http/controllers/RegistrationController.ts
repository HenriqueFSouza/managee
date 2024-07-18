import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { z } from 'zod';

import Event from '../models/Event';
import Registration from '../models/Registration';
import { sendRegistrationEmail } from '@/utils/sendRegistrationEmail';
import mongoose from 'mongoose';

const registrationSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
});

class RegistrationController {
  public async store(req: Request, res: Response): Promise<Response> {
    const parsedData = registrationSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.errors });
    }

    const { name, email } = parsedData.data;

    try {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      const exitingRegistration = await Registration.findOne({
        event: event._id,
        email: email,
      })

      if (exitingRegistration) {
        return res.status(400).json({ error: 'Email já inscrito!' });
      }

      const registration = new Registration({
        event: event._id,
        name,
        email,
      });

      await registration.save();

      // Adicionar o participante diretamente na lista de participantes do evento
      event.participants.push(registration._id as mongoose.Types.ObjectId);
      await event.save();

      const token = jwt.sign({ email, eventId: event._id }, process.env.JWT_SECRET!, {
        expiresIn: '8h',
      });

      await sendRegistrationEmail(email, event, token);

      return res.status(201).json({});
    } catch (err) {
      return res.status(500).json({ error: 'Error registering for event.' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {

    const updateSchema = z.object({
      eventId: z.string().min(1),
      email: z.string().email(),
    });

    const parsedData = updateSchema.safeParse(req.registration);

    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.errors });
    }

    const { eventId, email } = parsedData.data;

    try {
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      await Registration.findOneAndUpdate({
        event: event._id,
        email: email,
      }, {
        confirmed: true
      });

      return res.status(200).json();
    } catch (err) {
      return res.status(500).json({ error: 'Error updating registraton.' });
    }
  }

}

export default new RegistrationController()