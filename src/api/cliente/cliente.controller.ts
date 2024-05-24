import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('')
export class ClienteController {
  constructor(private readonly _clienteService: ClienteService) {}
  @Post('createCliente')
  async createCliente(@Res() res, @Req() req) {
    const data = req.body;
    const cliente = await this._clienteService.createCliente(data);
    res.status(200).send(cliente);
  }

  @Post('loginCliente')
  async loginCliente(@Res() res, @Req() req) {
    const data = req.body;
    const cliente = await this._clienteService.loginCliente(data);
    res.status(200).send(cliente);
  }
  @Get('getCliente/:filtro')
  async getCliente(@Res() res, @Req() req, @Param('filtro') filtro: any) {
    const clientes = await this._clienteService.getCliente(filtro);
    res.status(200).send(clientes);
  }
}
