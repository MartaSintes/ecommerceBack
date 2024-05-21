import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel('producto') private productoModel,

    @InjectModel('producto_galeria') private producto_galeriaModel,
  ) {}

  async createProducto(data: any, files: any) {
    try {
      data.portada = files[0].filename;
      data.slug = slugify(data.titulo, { lower: true });
      const producto = await this.productoModel.create(data);

      data.galeria = JSON.parse(data.galeria);

      data.galeria.forEach(async (element, index) => {
        element.producto = producto._id;
        element.imagen = files[index].filename;
        await this.producto_galeriaModel.create(element);
      });

      return { data: producto };
    } catch (error) {
      return { data: undefined, message: 'No se pudo crear el producto' };
    }
  }

  async getProductos(filtro) {
    try {
      const arr_productos = [];
      let productos;
      if (filtro == 'Todos') {
        productos = await this.productoModel.find().sort({ createdAt: -1 });
      } else {
        productos = await this.productoModel
          .find({ titulo: new RegExp(filtro, 'i') })
          .sort({ createdAt: -1 });
      }

      for (const item of productos) {
        const galeria = await this.producto_galeriaModel.find({
          producto: item._id,
        });

        arr_productos.push({
          producto: item,
          galeria,
        });
      }

      return { data: arr_productos };
    } catch (error) {
      return { data: undefined, message: 'error' };
    }
  }
  async setStateProducto(id: any, data: any) {
    const producto = await this.productoModel.findOne({ _id: id });

    if (producto) {
      ///
      const estado_actual = data.estado;
      let estado_nuevo;

      if (estado_actual) estado_nuevo = false;
      else if (!estado_actual) estado_nuevo = true;

      const reg = await this.productoModel.findOneAndUpdate(
        { _id: id },
        {
          estado: estado_nuevo,
        },
      );

      return reg;
    } else {
      return { data: undefined, message: 'No se pudo obtener los productos' };
    }
  }

  async getProducto(id: any) {
    try {
      const producto = await this.productoModel.findOne({ _id: id });
      if (producto) {
        return { data: producto };
      } else {
        // Si no se encuentra el producto, se devuelve un mensaje específico
        return {
          data: undefined,
          message: 'Producto no encontrado con el ID: ' + id,
        };
      }
    } catch (error) {
      // Se captura y se devuelve cualquier error que ocurra durante la consulta
      console.error(error);
      return {
        data: undefined,
        message: 'Error al obtener el producto: ' + error.message,
      };
    }
  }
  async getGaleriaProducto(id) {
    try {
      const galeria = await this.productoModel.findOne({ _id: id });
      if (galeria) {
        const galeria = await this.producto_galeriaModel.find({
          producto: id,
        });
        return { data: galeria };
      } else {
        return { data: undefined, message: 'No se pudo obtener la galeria' };
      }
    } catch (error) {
      return { data: undefined, message: 'No se pudo obtener la galeria' };
    }
  }

  async updateProducto(id, data) {
    try {
      const producto = await this.productoModel.findOne({ _id: id });
      if (producto) {
        //
        const producto = await this.productoModel.findOneAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            descripcion: data.descripcion,
          },
        );

        return { data: producto };
      } else {
        return { data: undefined, message: 'No se pudo encontrar el producto' };
      }
    } catch (error) {
      return { data: undefined, message: 'No se pudo actualizar el producto' };
    }
  }

  async uploadImgProducto(data, file) {
    console.log(data);
    console.log(file);
    try {
      data.imagen = file.filename;
      const imagen = await this.producto_galeriaModel.create(data);
      return { data: imagen };
    } catch (error) {
      return { data: undefined, message: 'No se pudo agregar la imagen' };
    }
  }
  async deleteImgProducto(id) {
    try {
      const imagen = await this.producto_galeriaModel.findOne({ _id: id });
      if (imagen) {
        await fs.remove(path.resolve('./uploads/productos/' + imagen.imagen));
        const imagen_delete = await this.producto_galeriaModel.findOneAndDelete(
          { _id: id },
        );
        if (!imagen_delete) {
          return {
            data: undefined,
            message: 'La imagen no se encontró en la base de datos',
          };
        }
        return { data: imagen_delete };
      } else {
        return {
          data: undefined,
          message: 'No se pudo encontrar la imagen con el ID: ' + id,
        };
      }
    } catch (error) {
      console.error('Error al eliminar la imagen: ', error);
      return {
        data: undefined,
        message: 'Error al eliminar la imagen: ' + error.message,
      };
    }
  }
  async deleteProducto(id: any) {
    try {
      const producto = await this.productoModel.findOne({ _id: id });
      if (producto) {
        // Eliminar la galería asociada al producto
        await this.producto_galeriaModel.deleteMany({ producto: id });
        // Eliminar el producto
        await this.productoModel.deleteOne({ _id: id });
        return { data: producto };
      } else {
        return {
          data: undefined,
          message: 'No se encontró el producto con el ID: ' + id,
        };
      }
    } catch (error) {
      return {
        data: undefined,
        message: 'Error al eliminar el producto: ' + error.message,
      };
    }
  }
}
