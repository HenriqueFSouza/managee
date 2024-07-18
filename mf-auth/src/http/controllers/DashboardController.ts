import { Request, Response } from 'express';
import Event from "../models/Event";
import Registration from '../models/Registration';

class DashboardController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const events = await Event.find({ organizer: req.user.id });

      const eventsWithCounts = await Promise.all(events.map(async (event) => {
        const participantsCount = await Registration.countDocuments({ event: event._id });
        const confirmedCount = await Registration.countDocuments({ event: event._id, confirmed: true });

        return {
          ...event.toObject(),
          participantsCount,
          confirmedCount,
        };
      }));

      return res.json({ totalEvents: events.length, events: eventsWithCounts });
    } catch (error) {
      console.error('Failed to fetch events', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { days } = req.query;
    const daysLimit = parseInt(days as string) || 7;

    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysLimit);

      const events = await Event.find({ organizer: req.user.id });

      if (!events.length) {
        return res.status(404).json({ message: 'No events found for this user' });
      }

      const eventIds = events.map(event => event._id);

      const statistics = await Registration.aggregate([
        { $match: { event: { $in: eventIds }, registrationDate: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$registrationDate' } },
            participants: { $sum: 1 },
            confirmed: { $sum: { $cond: ['$confirmed', 1, 0] } },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const totalParticipants = statistics.reduce((acc, stat) => acc + stat.participants, 0);
      const totalConfirmed = statistics.reduce((acc, stat) => acc + stat.confirmed, 0);
      const confirmationRate = totalParticipants > 0 ? (totalConfirmed / totalParticipants) * 100 : 0;

      return res.json({ pendingSubscribes: totalParticipants - totalConfirmed, confirmationRate });
    } catch (error) {
      console.error('Failed to fetch statistics', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async engagement(req: Request, res: Response): Promise<Response> {
    const { eventId } = req.params;
    const { days } = req.query;
    const daysLimit = parseInt(days as string) || 7;

    try {
      const event = await Event.findOne({ _id: eventId, organizer: req.user.id });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysLimit);

      const engagementData = await Registration.aggregate([
        { $match: { event: event._id, registrationDate: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$registrationDate' } },
            participants: { $sum: 1 },
            confirmed: { $sum: { $cond: ['$confirmed', 1, 0] } },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const statisticsData = engagementData.map((data) => ({
        date: data._id,
        participants: data.participants,
        confirmed: data.confirmed,
        notConfirmed: data.participants - data.confirmed,
      }));

      const totalParticipants = engagementData.reduce((acc, day) => acc + day.participants, 0);
      const totalConfirmed = engagementData.reduce((acc, day) => acc + day.confirmed, 0);

      const confirmedPercentage = totalParticipants > 0 ? (totalConfirmed / totalParticipants) * 100 : 0;

      return res.json({
        statistics: statisticsData,
        confirmedPercentage: confirmedPercentage.toFixed(2)
      });
    } catch (error) {
      console.error('Failed to fetch engagement data', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

}

export default new DashboardController()