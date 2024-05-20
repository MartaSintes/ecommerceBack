import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usuarioSchema } from 'src/schemas/usuario.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'usuario', schema: usuarioSchema }]),
    JwtModule.register({
      secret: 'marta',
      signOptions: {
        expiresIn: '5d',
      },
    }),
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
