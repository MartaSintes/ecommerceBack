import { Controller, Post, Req, Res } from '@nestjs/common';
import { TclienteService } from './tcliente.service';

@Controller('')
export class TclienteController {
  constructor(private readonly _tclienteService: TclienteService) {}
  @Post('createTCliente')
  async createTCliente(@Res() res, @Req() req) {
    const data = req.body;
    const cliente = await this._tclienteService.createTCliente(data);
    res.status(200).send(cliente);
  }

  @Post('logintCliente')
  async logintCliente(@Res() res, @Req() req) {
    const data = req.body;
    const cliente = await this._tclienteService.logintCliente(data);
    res.status(200).send(cliente);
  }
}
