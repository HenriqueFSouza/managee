import { Models } from '@/@types/models';
import mongoose, { Schema } from 'mongoose';

const RegistrationSchema: Schema = new Schema({
  event: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  confirmed: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
});

export default mongoose.model<Models.IRegistration>('Registration', RegistrationSchema);