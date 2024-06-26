import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as path from 'path';
import * as fs from 'fs';

@Controller()
export class ProductoController {
  constructor(private readonly _productoService: ProductoService) {}

  @Post('createProducto')
  @UseInterceptors(
    FilesInterceptor('files[]', 10, {
      storage: diskStorage({
        destination: './uploads/productos',
        filename: (req, file, cb) => {
          cb(null, uuidv4() + '' + extname(file.originalname));
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  @UseGuards(AuthGuard)
  async createProducto(@Res() res, @Req() req, @UploadedFiles() files) {
    const data = req.body;
    const producto = await this._productoService.createProducto(data, files);
    res.status(200).send(producto);
  }

  @Post('uploadImgProducto')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/productos',
        filename: (req, file, cb) => {
          cb(null, uuidv4() + '' + extname(file.originalname));
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  @UseGuards(AuthGuard)
  async uploadImgProducto(@Res() res, @Req() req, @UploadedFile() file) {
    const data = req.body;
    const imagen = await this._productoService.uploadImgProducto(data, file);
    res.status(200).send(imagen);
  }

  @Get('getProductos/:filtro')
  @UseGuards(AuthGuard)
  async getProductos(@Res() res, @Req() req, @Param('filtro') filtro) {
    const productos = await this._productoService.getProductos(filtro);
    res.status(200).send(productos);
  }
  @Get('getProductoPortada/:img')
  async getProductoPortada(@Res() res, @Param('img') img) {
    const filename = './uploads/productos/' + img;

    if (fs.existsSync(filename)) {
      //SI
      res.status(200).sendFile(path.resolve(filename));
    } else {
      //NO
      res.status(200).sendFile(path.resolve('./uploads/default.png'));
    }
  }
  @Put('setState/:id')
  @UseGuards(AuthGuard)
  async setStateProducto(@Res() res, @Req() req, @Param('id') id: any) {
    const data = req.body;
    const productos = await this._productoService.setStateProducto(id, data);
    res.status(200).send(productos);
  }

  @Get('getProducto/:id')
  @UseGuards(AuthGuard)
  async getProducto(@Res() res, @Req() req, @Param('id') id) {
    const producto = await this._productoService.getProducto(id); // Ahora se pasa 'id' a la función
    res.status(200).send(producto);
  }
  @Get('getGaleriaProducto/:id')
  @UseGuards(AuthGuard)
  async getGaleriaProducto(@Res() res, @Req() req, @Param('id') id: any) {
    const galeria = await this._productoService.getGaleriaProducto(id);
    res.status(200).send(galeria);
  }
  @Put('updateProducto/:id')
  @UseGuards(AuthGuard)
  async updateProducto(@Res() res, @Req() req, @Param('id') id: any) {
    const data = req.body;
    const producto = await this._productoService.updateProducto(id, data);
    res.status(200).send(producto);
  }

  @Delete('deleteImgProducto/:id')
  @UseGuards(AuthGuard)
  async deleteImgProducto(@Res() res, @Req() req, @Param('id') id: any) {
    const imagen = await this._productoService.deleteImgProducto(id);
    res.status(200).send(imagen);
  }
  @Delete('deleteProducto/:id')
  @UseGuards(AuthGuard)
  async deleteProducto(@Res() res, @Param('id') id: any) {
    const result = await this._productoService.deleteProducto(id);
    if (result.data) {
      res.status(200).send(result);
    } else {
      res.status(404).send(result);
    }
  }
}
