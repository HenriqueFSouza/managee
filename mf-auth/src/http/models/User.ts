import { Models } from '@/@types/models';
import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['organizer', 'participant'], required: true },
  events: [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
  registeredEvents: [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
});

export default mongoose.model<Models.IUser>('User', UserSchema);
