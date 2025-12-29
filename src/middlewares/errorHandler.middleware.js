const ErrorDto = require('../dtos/exception/ErrorDto');
const BusinessException = require('../dtos/exception/BusinessException');

const errorHandler = (err, req, res, next) => {
  if (err instanceof BusinessException) {
    const errorDto = ErrorDto.builder()
      .code(err.code)
      .message(err.message)
      .build();
    
    return res.status(err.code || 500).json(errorDto);
  }

  // Default error
  console.error('Unexpected error:', err);
  const errorDto = ErrorDto.builder()
    .code(500)
    .message(err.message || 'Internal server error')
    .build();
  
  res.status(500).json(errorDto);
};

module.exports = errorHandler;

