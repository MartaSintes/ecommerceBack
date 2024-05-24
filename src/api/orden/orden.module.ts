import { Module } from '@nestjs/common';
import { OrdenController } from './orden.controller';
import { OrdenService } from './orden.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdenSchema } from '../../schemas/orden.schema';
import { JwtModule } from '@nestjs/jwt';
import { usuarioSchema } from '../../schemas/usuario.schema';
import { ProductoSchema } from '../../schemas/producto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ordenes',
        schema: OrdenSchema,
      },
      {
        name: 'usuario',
        schema: usuarioSchema,
      },
      {
        name: 'producto',
        schema: ProductoSchema,
      },
    ]),
    JwtModule.register({
      secret: 'marta',
      signOptions: {
        expiresIn: '5d',
      },
    }),
  ],
  controllers: [OrdenController],
  providers: [OrdenService],
})
export class OrdenModule {}
