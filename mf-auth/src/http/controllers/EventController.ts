import { Request, Response } from 'express';
import Event from '../models/Event';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string().min(3).max(100),
  isOnline: z.boolean().optional(),
});

class EventController {
  public async store(req: Request, res: Response): Promise<Response> {
    const parsedData = eventSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.errors });
    }

    const { title, description, date, startTime, endTime, location, isOnline } = parsedData.data;


    try {
      const event = new Event({
        title,
        description,
        date,
        startTime,
        endTime,
        location,
        isOnline,
        organizer: req.user.id,
      });

      await event.save();

      return res.status(201).json(event);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Error creating new event.' });
    }
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const events = await Event.find({ organizer: req.user.id });
    return res.status(200).json(events);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    if (req.user?.id) {
      const eventWithParticipants = await Event.findById(req.params.id).populate('participants');
      return res.status(200).json(eventWithParticipants);
    }

    return res.status(200).json(event);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const parsedData = eventSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: parsedData.error.errors });
    }

    const { title, description, date, startTime, endTime, location, isOnline } = parsedData.data;

    try {
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        { title, description, date, startTime, endTime, location, isOnline },
        { new: true }
      );

      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      return res.status(200).json(event);
    } catch (err) {
      return res.status(500).json({ error: 'Error updating event.' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      return res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (err) {
      return res.status(500).json({ error: 'Error deleting event.' });
    }
  }

}

export default new EventController();
