import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  dob: { type: Date },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  mobile: { type: String },
  website: { type: String },
  socialLinkedIn: { type: String },
  socialTwitter: { type: String },
  socialFacebook: { type: String },
  gender: { type: String },
  profilePic: { type: String },
  bio: { type: String },
  notifyOnAnswersThread: { type: Boolean, default: false },
  notifyOnNewsAnnouncements: { type: Boolean, default: false },
  notifyOnFollows: { type: Boolean, default: false },
  notifyOnWeeklyBlog: { type: Boolean, default: false },
  notifyOnProductUpdates: { type: Boolean, default: false },
  experience: [
    {
      title: { type: String },
      description: { type: String },
      city: { type: String },
      from: { type: Date },
      to: { type: Date }
    }
  ],
  education: [
    {
      degree: { type: String },
      school: { type: String },
      description: { type: String },
      grade: { type: String },
      from: { type: Date },
      to: { type: Date }
    }
  ],
  skills: [
    {
      skill: { type: String },
      level: Number
    }
  ],
  about: { type: String },
  tagline: { type: String }
});

export default mongoose.model('users', UserSchema);
