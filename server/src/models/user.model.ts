import { Role } from '../constants/role.enum';
import { model, Schema, Types } from 'mongoose';

interface UserInterface {
  email: string;
  password: string;
  roles?: [string];
  profileId?: Types.ObjectId;
}

const UserSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    roles: [
      {
        type: String,
        enum: Role,
        default: Role.USER,
      },
    ],
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  { timestamps: true }
);

const User = model<UserInterface>('User', UserSchema);
export default User;
