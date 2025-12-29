class ErrorDto {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static builder() {
    return new ErrorDtoBuilder();
  }
}

class ErrorDtoBuilder {
  constructor() {
    this.errorDto = new ErrorDto();
  }

  code(code) {
    this.errorDto.code = code;
    return this;
  }

  message(message) {
    this.errorDto.message = message;
    return this;
  }

  build() {
    return this.errorDto;
  }
}

module.exports = ErrorDto;

