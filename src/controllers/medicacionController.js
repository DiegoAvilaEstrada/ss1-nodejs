const medicacionService = require('../services/medicacionService');
const ResponseSuccessDto = require('../dtos/response/ResponseSuccessDto');

class MedicacionController {
  async getAllMedicaciones(req, res, next) {
    try {
      const medicaciones = await medicacionService.getAll();
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Medicaciones obtenidas con éxito');
      responseSuccessDto.setResponseObject(medicaciones);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async getMedicacionById(req, res, next) {
    try {
      const medicacion = await medicacionService.getById(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Medicación encontrada con éxito');
      responseSuccessDto.setResponseObject(medicacion);
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async createMedicacion(req, res, next) {
    try {
      await medicacionService.createNewMedicacion(req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Medicación creada con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async updateMedicacion(req, res, next) {
    try {
      await medicacionService.updateMedicacion(req.params.id, req.body);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Medicación actualizada con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }

  async deleteMedicacion(req, res, next) {
    try {
      await medicacionService.deleteMedicacion(req.params.id);
      const responseSuccessDto = new ResponseSuccessDto();
      responseSuccessDto.setCode(200);
      responseSuccessDto.setMessage('Medicación eliminada con éxito');
      res.status(200).json(responseSuccessDto);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MedicacionController();

