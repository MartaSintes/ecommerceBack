import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { OrdenService } from './orden.service';

@Controller()
export class OrdenController {
  constructor(private readonly _ordenService: OrdenService) {}

  @Post('createOrden')
  /* @UseGuards(AuthGuard) */
  async createOrden(@Res() res, @Req() req) {
    const data = req.body;
    const orden = await this._ordenService.createOrden(data);
    res.status(200).send(orden);
  }

  @Get('findOrdenes')
  /*  @UseGuards(AuthGuard) */
  async findOrdenesUsuario(@Res() res) {
    const ordenes = await this._ordenService.findOrdenes();
    res.status(200).send(ordenes);
  }
}
