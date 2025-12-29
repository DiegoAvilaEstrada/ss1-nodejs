const rolService = require('../services/rolService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class RolController {
  async getAllRoles(req, res, next) {
    try {
      const roles = await rolService.getAllRoles();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Roles obtenidos con éxito');
      responseSuccessDto.setResponseObject(roles);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getRolById(req, res, next) {
    try {
      const rol = await rolService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Rol encontrado con éxito');
      responseSuccessDto.setResponseObject(rol);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createRol(req, res, next) {
    try {
      await rolService.createNewRole(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Rol creado con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RolController();

