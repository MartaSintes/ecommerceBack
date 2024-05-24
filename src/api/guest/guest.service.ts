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
  async getProductoShop(slug: string) {
    try {
      const producto = await this.productoModel.findOne({ slug, estado: true });

      if (producto) {
        const galeria = await this.producto_galeriaModel.find({
          producto: producto._id,
        });

        return { data: producto, galeria };
      } else {
        return { data: undefined, message: 'No se pudo encontrar el producto' };
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return { data: undefined, message: 'No se pudo obtener el producto' };
    }
  }
}
