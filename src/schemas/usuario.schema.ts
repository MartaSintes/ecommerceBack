import { Schema } from 'mongoose';

export const usuarioSchema = new Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  estado: { type: Boolean, default: true },
  rol: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
