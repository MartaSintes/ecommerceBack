import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel('producto') private productoModel,
    @InjectModel('producto_galeria') private producto_galeriaModel,
  ) {}

  async getProductosShop() {
    try {
      const productos = await this.productoModel
        .find({ estado: true })
        .sort({ createdAt: -1 });
      return { data: productos };
    } catch (error) {
      return { data: undefined, message: 'No se pudo obtener los productos.' };
    }
  }
}
