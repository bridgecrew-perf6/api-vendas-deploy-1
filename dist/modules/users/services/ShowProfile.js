"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowProfile {
  async execute({
    user_id
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Usuário não encontrado', 400);
    }

    return user;
  }

}

var _default = ShowProfile;
exports.default = _default;