import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoSchema } from 'src/schemas/producto.schema';
import { Producto_galeriaSchema } from 'src/schemas/producto_galeria.schema';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'producto',
        schema: ProductoSchema,
      },
      {
        name: 'producto_galeria',
        schema: Producto_galeriaSchema,
      },
    ]),
  ],
  controllers: [GuestController],
  providers: [GuestService],
  exports: [],
})
export class GuestModule {}
