import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IChat extends Document {
  from: string; // Wallet address of the sender
  to: string;   // Wallet address of the recipient
  message: string;
  type: string; // USER or AI
  timestamp: Date;
}

const ChatSchema: Schema = new Schema<IChat>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    type: {type: String, required: true},
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const Chat: Model<IChat> =
  mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
