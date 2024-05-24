import { Schema } from 'mongoose';

export const OrdenSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, required: true, ref: 'usuario' },
  producto: { type: Schema.Types.ObjectId, required: true, ref: 'producto' },
  tarjeta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
