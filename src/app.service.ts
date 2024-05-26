import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsuarioService } from './api/usuario/usuario.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectConnection() private connection: Connection,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    const usuarioPorDefecto = {
      nombres: 'admin',
      apellidos: 'admin',
      email: 'admin@admin.com',
      password: 'password123',
      rol: 'admin',
    };
    const usuarioService = this.moduleRef.get(UsuarioService, {
      strict: false,
    });
    const coleccion = this.connection.collection('usuarios');
    const usuarioExistente = await coleccion.findOne({
      email: usuarioPorDefecto.email,
    });
    if (!usuarioExistente) {
      await usuarioService.createUsuario(usuarioPorDefecto);
      console.log('Usuario por defecto creado');
      return;
    }
    console.log('Usuario por defecto ya existe');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
