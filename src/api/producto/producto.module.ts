import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ProductoSchema } from 'src/schemas/producto.schema';
import { Producto_galeriaSchema } from 'src/schemas/producto_galeria.schema';

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
    JwtModule.register({
      secret: 'marta',
      signOptions: {
        expiresIn: '5d',
      },
    }),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
