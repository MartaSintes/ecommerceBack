import { Module } from '@nestjs/common';
import { TclienteService } from './tcliente.service';
import { TclienteController } from './tcliente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ClienteSchema } from 'src/schemas/cliente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cliente', schema: ClienteSchema }]),
    JwtModule.register({
      secret: 'marta1',
      signOptions: {
        expiresIn: '5d',
      },
    }),
  ],
  providers: [TclienteService],
  controllers: [TclienteController],
})
export class TclienteModule {}
