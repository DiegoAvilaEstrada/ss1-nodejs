const productoService = require('../services/productoService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class ProductoController {
  async getAllProductos(req, res, next) {
    try {
      const productos = await productoService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Productos obtenidos con éxito');
      responseSuccessDto.setResponseObject(productos);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getProductoById(req, res, next) {
    try {
      const producto = await productoService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Producto encontrado con éxito');
      responseSuccessDto.setResponseObject(producto);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createProducto(req, res, next) {
    try {
      await productoService.createNewProducto(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Producto creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductoController();

