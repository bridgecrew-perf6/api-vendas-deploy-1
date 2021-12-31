"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

var _typeorm = require("typeorm");

var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Create {
  async execute({
    name,
    email,
    password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new _AppError.default('O Email informado já está sendo utilizado', 400);
    }

    const hashPassword = await (0, _bcryptjs.hash)(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashPassword
    });
    await usersRepository.save(user);
    return user;
  }

}

var _default = Create;
exports.default = _default;