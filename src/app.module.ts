import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './api/usuario/usuario.module';
import { ProductoModule } from './api/producto/producto.module';
import { TclienteModule } from './api/tcliente/tcliente.module';
import { GuestModule } from './api/guest/guest.module';
import { OrdenModule } from './api/orden/orden.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UsuarioModule,
    ProductoModule,
    TclienteModule,
    GuestModule,
    OrdenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
