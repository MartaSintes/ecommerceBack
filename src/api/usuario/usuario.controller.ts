import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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

  @Get()
  @UseGuards(AuthGuard)
  async getUsuarios(@Res() res) {
    const usuarios = await this.usuarioService.getUsuarios();
    res.status(200).send(usuarios);
  }
  @Get('getUsuario/:id')
  @UseGuards(AuthGuard)
  async getUsuario(@Res() res, @Req() req, @Param('id') id: any) {
    const usuario = await this.usuarioService.getUsuario(id);
    res.status(200).send(usuario);
  }

  @Put('updateUsuario/:id')
  @UseGuards(AuthGuard)
  async updateUsuario(@Res() res, @Req() req, @Param('id') id: any) {
    const data = req.body;
    const usuario = await this.usuarioService.updateUsuario(id, data);
    res.status(200).send(usuario);
  }
  @Delete('deleteUsuario/:id')
  @UseGuards(AuthGuard)
  async deleteUsuario(@Res() res, @Param('id') id: any) {
    const result = await this.usuarioService.deleteUsuario(id);
    res.status(200).send(result);
  }

  @Post('login')
  async login(@Res() res, @Req() req) {
    const data = req.body;
    const usuario = await this.usuarioService.login(data);
    res.status(200).send(usuario);
  }
}
