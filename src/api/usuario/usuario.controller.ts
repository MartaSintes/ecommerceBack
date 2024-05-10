import { Controller, Post, Req, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(public readonly usuarioService: UsuarioService) {}

  @Post('create')
  async createUsuario(@Res() res, @Req() req) {
    const data = req.body;
    const usuario = await this.usuarioService.createUsuario(data);
    res.status(200).send(usuario);
  }
}
