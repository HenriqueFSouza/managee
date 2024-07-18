import { Models } from '@/@types/models';
import mongoose, { Schema } from 'mongoose';

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: false },
  location: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  organizer: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Types.ObjectId, ref: 'Registration' }],
});

export default mongoose.model<Models.IEvent>('Event', EventSchema);