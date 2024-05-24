import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdenService {
  constructor(@InjectModel('ordenes') private ordenModel) {}

  async createOrden(data: any) {
    try {
      const orden = await this.ordenModel.create(data);
      return { data: orden };
    } catch (error) {
      return { data: undefined, message: 'No se pudo crear el orden' };
    }
  }

  async findOrdenes() {
    try {
      const ordenes = await this.ordenModel
        .find()
        .populate('cliente')
        .populate('producto');

      return { data: ordenes };
    } catch (error) {
      return {
        data: undefined,
        message: 'No se pudieron obtener las órdenes del usuario',
      };
    }
  }
}
