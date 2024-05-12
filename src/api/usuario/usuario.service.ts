import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel('usuario') private usuarioModel) {}

  async createUsuario(data: any) {
    try {
      const _usuarios = await this.usuarioModel.find({ email: data.email });

      if (_usuarios.length >= 1) {
        return {
          data: undefined,
          message: 'El correo electrónico ya está en uso',
        };
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('123456', salt);

        data.password = hash;
        const usuario = await this.usuarioModel.create(data);
        return usuario;
      }
    } catch (error) {
      console.log(error);
      return {
        data: undefined,
        message: 'No se pudo crear usuario',
      };
    }
  }

  async login(data: any) {
    const usuario = await this.usuarioModel.find({ email: data.email });
    if (usuario.length >= 1) {
      const compare = await bcrypt.compare(data.password, usuario[0].password);

      if (compare) {
        return { data: usuario[0] };
      } else {
        return { data: undefined, message: 'La contraseña es incorrecta.' };
      }
    } else {
      return {
        data: undefined,
        message: 'El correo electrónico no encontrado.',
      };
    }
  }
}
