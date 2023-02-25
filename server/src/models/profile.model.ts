import { model, Schema, Types } from 'mongoose';

interface ProfileInterface {
  firstName: string;
  lastName: string;
  dob: Date;
  phone?: String;
  bio?: string;
  profileImg?: string;
  userId: Types.ObjectId;
}

const ProfileSchema = new Schema<ProfileInterface>(
  {
    firstName: {
      type: String,
      max: 50,
      required: true,
    },
    lastName: {
      type: String,
      max: 50,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    phone: {
      type: String,
    },
    bio: {
      type: String,
    },
    profileImg: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = model<ProfileInterface>('Profile', ProfileSchema);
export default Profile;
