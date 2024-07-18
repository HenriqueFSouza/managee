import mongoose, { Document } from "mongoose";

declare namespace Models {
  interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'organizer' | 'participant';
    events: mongoose.Types.ObjectId[];
    registeredEvents: mongoose.Types.ObjectId[];
  }

  interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    startTime: string;
    endTime: string;
    location: string;
    isOnline: boolean;
    location: string;
    organizer: mongoose.Types.ObjectId;
    participants: mongoose.Types.ObjectId[];
  }

  interface IRegistration extends Document {
    event: mongoose.Types.ObjectId;
    participant: mongoose.Types.ObjectId;
    confirmed: boolean;
    registrationDate: Date;
  }
}