import pkg, { Document } from 'mongoose';
const { Schema, model, Types } = pkg;

const schema = new Schema({
  login: { type: String, required: true, unique: true },
  token: { type: String },
  games: [{ type: Types.ObjectId, ref: 'Game' }],
});

export default model<IUser & Document>('User', schema);
