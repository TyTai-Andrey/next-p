import pkg, { Document } from 'mongoose';
const { Schema, model } = pkg;

const schema = new Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  released: { type: String, required: true },
  gameId: { type: String, required: true },
});

const Game = model<IGame & Document>('Game', schema)

export default Game;
