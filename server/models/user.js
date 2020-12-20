import mongoose from 'mongoose';

// ------------ User Schema ------------//
const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['admin', 'manager', 'user'],
      default: 'user',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    DoB: {
      type: Date,
      default: new Date(2000, 1, 1),
    },
    sex: {
      type: String,
      enum: ['Nam', 'Nữ', 'Khác'],
      default: 'Khác',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    town: {
      type: String,
      default: '',
    },
    point: {
      type: Number,
      default: 0,
    },
    spending: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    resetLink: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', UserSchema);
