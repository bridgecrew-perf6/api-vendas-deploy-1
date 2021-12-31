"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _typeorm = require("typeorm");

var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateSession {
  async execute({
    email,
    password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default('Usuário inválido!', 401);
    }

    const passwordCheck = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordCheck) {
      throw new _AppError.default('Senha incorreta!', 401);
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secret, {
      subject: String(user.id),
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }

}

var _default = CreateSession;
exports.default = _default;