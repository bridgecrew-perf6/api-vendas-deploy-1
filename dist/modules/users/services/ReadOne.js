"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadOne {
  async execute({
    id
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await userRepository.findOne(id);

    if (user) {
      throw new _AppError.default('Usuário não encontrado', 400);
    }

    return user;
  }

}

var _default = ReadOne;
exports.default = _default;