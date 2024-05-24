import { Schema } from 'mongoose';

export const OrdenSchema = new Schema({
  cliente: { type: Schema.Types.ObjectId, required: true, ref: 'cliente' },
  producto: { type: Schema.Types.ObjectId, required: true, ref: 'producto' },
  tarjeta: { type: String, required: true },
  direccion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
