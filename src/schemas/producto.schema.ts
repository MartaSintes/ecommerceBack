// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export const ProductoSchema = new Schema({
  titulo: { type: String, required: true },
  slug: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  estado: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});
