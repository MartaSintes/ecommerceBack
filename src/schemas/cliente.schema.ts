import { Schema } from 'mongoose';

export const ClienteSchema = new Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  fullnames: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  estado: { type: Boolean, default: true, required: true },
  createdAt: { type: Date, default: Date.now },
});
