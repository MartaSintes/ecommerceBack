import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller()
export class OrdenController {
  constructor(private readonly _ordenService: OrdenService) {}

  @Post('createOrden')
  @UseGuards(AuthGuard)
  async createOrden(@Res() res, @Req() req) {
    const data = req.body;
    const orden = await this._ordenService.createOrden(data);
    res.status(200).send(orden);
  }

  @Get('findOrdenes/:usuarioId')
  @UseGuards(AuthGuard)
  async findOrdenesUsuario(@Res() res, @Req() req) {
    const usuarioId = req.params.usuarioId;
    const ordenes = await this._ordenService.findOrdenesUsuario(usuarioId);
    res.status(200).send(ordenes);
  }
}
