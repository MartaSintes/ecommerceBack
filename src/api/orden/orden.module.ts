import { Module } from '@nestjs/common';
import { OrdenController } from './orden.controller';
import { OrdenService } from './orden.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdenSchema } from '../../schemas/orden.schema';
import { JwtModule } from '@nestjs/jwt';
import { ProductoSchema } from '../../schemas/producto.schema';
import { ClienteSchema } from '../../schemas/cliente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ordenes',
        schema: OrdenSchema,
      },
      {
        name: 'cliente',
        schema: ClienteSchema,
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
