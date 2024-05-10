import { Schema } from 'mongoose';

export const usuarioSchema = new Schema({
  nombres: String,
  apellidos: String,
  email: String,
  password: String,
  estado: Boolean,
  rol: String,
  createdAt: { type: Date, default: Date.now },
});
