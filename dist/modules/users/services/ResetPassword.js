"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../typeorm/repositories/UserTokensRepository"));

var _dateFns = require("date-fns");

var _bcryptjs = require("bcryptjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This library compares date datas, like, after 1 hour, what i do? befere 2 hours, what will work?
class ResetPassword {
  async execute({
    token,
    password
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const usersTokenRepository = (0, _typeorm.getCustomRepository)(_UserTokensRepository.default);
    const userToken = await usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new _AppError.default('O Token informado não existe', 400);
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new _AppError.default('O usuário informado não existe', 400);
    }

    const tokenCreatedAt = userToken.created_at;
    /*the firts field is the date reference and the second field is how much time
    will pass after the reference */

    const compareDate = (0, _dateFns.addHours)(tokenCreatedAt, 2);

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default('Token expirado!');
    }

    user.password = await (0, _bcryptjs.hash)(password, 8);
    await usersRepository.save(user);
    console.log(token);
  }

}

exports.default = ResetPassword;