import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(public readonly usuarioService: UsuarioService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createUsuario(@Res() res, @Req() req) {
    const data = req.body;
    const usuario = await this.usuarioService.createUsuario(data);
    res.status(200).send(usuario);
  }
  @Post('login')
  async login(@Res() res, @Req() req) {
    const data = req.body;
    const usuario = await this.usuarioService.login(data);
    res.status(200).send(usuario);
  }
}
