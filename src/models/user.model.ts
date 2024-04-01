import { any, string } from 'joi';
import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'guest'],
    default: "guest"
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
const User = model('User', userSchema);
export default User;
