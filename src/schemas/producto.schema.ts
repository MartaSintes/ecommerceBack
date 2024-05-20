import { Schema } from 'mongoose';

export const ProductoSchema = new Schema({
  titulo: { type: String, required: true },
  portada: { type: String, required: true },
  slug: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, default: 56.6, required: true },
  stock: { type: Number, default: 20, required: true },
  estado: { type: Boolean, default: false, required: true },
  createdAt: { type: Date, default: Date.now },
});
