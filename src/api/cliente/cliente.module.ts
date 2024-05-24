import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
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
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
