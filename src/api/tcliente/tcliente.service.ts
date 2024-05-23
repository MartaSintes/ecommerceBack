import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TclienteService {
  constructor(
    @InjectModel('cliente') private _clienteModel,
    private readonly _jwtService: JwtService,
  ) {}

  async createTCliente(data: any) {
    try {
      const _cliente = await this._clienteModel.find({ email: data.email });

      if (_cliente.length >= 1) {
        return {
          data: undefined,
          message: 'El correo electrónico ya está en uso',
        };
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);

        data.password = hash;
        data.fullnames = data.nombres + ' ' + data.apellidos;
        const cliente = await this._clienteModel.create(data);
        return { data: cliente };
      }
    } catch (error) {
      console.log(error);
      return {
        data: undefined,
        message: 'No se pudo crear usuario',
      };
    }
  }

  async logintCliente(data: any) {
    try {
      const clientes = await this._clienteModel.find({ email: data.email });
      if (clientes.length >= 1) {
        const compare = await bcrypt.compare(
          data.password,
          clientes[0].password,
        );

        if (compare) {
          const jwt = this._jwtService.sign({
            sub: clientes[0]._id,
            nombres: clientes[0].nombre,
            apellidos: clientes[0].apellidos,
            email: clientes[0].email,
          });
          return { data: clientes[0], jwt };
        } else {
          return {
            data: undefined,
            message: 'La contraseña es incorrecta.',
            tipo: 'password',
          };
        }
      } else {
        return {
          data: undefined,
          message: 'Correo electrónico no encontrado.',
          tipo: 'email',
        };
      }
    } catch (error) {
      return {
        data: undefined,
        message: 'No se pudo identificar al cliente',
        tipo: 'password',
      };
    }
  }
  async gettCliente(filtro) {
    try {
      const searchTerm = filtro.split(' ');
      const regex = new RegExp(
        searchTerm.map((term) => `(?=.*\\b${term}\\b)`).join(''),
        'i',
      );
      const query = {
        $or: ['fullnames', 'nombres', 'email', 'apellidos'].map((field) => ({
          [field]: regex,
        })),
      };
      const clientes = await this._clienteModel.find(query);
      return clientes;
    } catch (error) {
      return { data: undefined, message: 'No se pudo obtener los clientes' };
    }
  }
}
