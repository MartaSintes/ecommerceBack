import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('usuario') private usuarioModel,
    private readonly _jwtService: JwtService,
  ) {}

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
  async getUsuarios() {
    try {
      const usuarios = await this.usuarioModel.find().sort({ createdAt: -1 });
      return usuarios;
    } catch (error) {
      return { data: undefined, message: 'No se pudo obtener los usuarios' };
    }
  }

  async getUsuario(id: any) {
    const usuario = await this.usuarioModel.findOne({ _id: id });
    if (usuario) {
      return usuario;
    } else {
      return { data: undefined, message: 'No se pudo obtener los usuario' };
    }
  }

  async updateUsuario(id: any, data: any) {
    try {
      const usuario = await this.usuarioModel.findOne({ _id: id });
      if (usuario) {
        const reg = await this.usuarioModel.findOneAndUpdate(
          { _id: id },
          {
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            rol: data.rol,
          },
        );
        return reg;
      } else {
        return { data: undefined, message: 'No se pudo obtener los usuarios' };
      }
    } catch (error) {
      return { data: undefined, message: 'No se pudo actualizar el usuario' };
    }
  }
  async deleteUsuario(id) {
    try {
      const usuario = await this.usuarioModel.findOne({ _id: id });
      if (usuario) {
        await this.usuarioModel.findOneAndDelete({ _id: id });
        return { data: true };
      } else {
        return { data: undefined, message: 'No se pudo eliminar el usuario' };
      }
    } catch (error) {
      return { data: undefined, message: 'Error al eliminar el usuario' };
    }
  }

  async login(data: any) {
    const usuario = await this.usuarioModel.find({ email: data.email });
    if (usuario.length >= 1) {
      const compare = await bcrypt.compare(data.password, usuario[0].password);

      if (compare) {
        const jwt = this._jwtService.sign({
          sub: usuario[0]._id,
          nombres: usuario[0].nombre,
          apellidos: usuario[0].apellidos,
          email: usuario[0].email,
          rol: usuario[0].rol,
        });
        return { data: usuario[0], jwt };
      } else {
        return { data: undefined, message: 'La contraseña es incorrecta.' };
      }
    } else {
      return {
        data: undefined,
        message: 'Correo electrónico no encontrado.',
      };
    }
  }
}
