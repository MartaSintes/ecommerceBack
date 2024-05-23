import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { GuestService } from './guest.service';
import * as path from 'path';

@Controller('')
export class GuestController {
  constructor(private readonly _guestService: GuestService) {}

  @Get('getProductosShop')
  async getProductosShop(@Res() res) {
    const productos = await this._guestService.getProductosShop();
    res.status(200).send(productos);
  }

  @Get('getImgProductos/:file')
  async getImgProductos(@Res() res, @Req() req, @Param('file') file) {
    const file_ = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'productos',
      file,
    );
    res.status(200).sendFile(file_);
  }
}
