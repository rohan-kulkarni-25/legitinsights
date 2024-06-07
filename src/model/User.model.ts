import mongoose, { Schema, Document } from "mongoose";
import MessageSchema, { Message } from "./Message.model";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  messages: Message[];
  isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required."],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required."],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: {
    type: [MessageSchema],
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
