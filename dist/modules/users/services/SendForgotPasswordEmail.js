"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordEmail = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../typeorm/repositories/UserTokensRepository"));

var _EtherealMail = _interopRequireDefault(require("../../../config/mail/EtherealMail"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SendForgotPasswordEmail {
  async execute({
    email
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const usersTokenRepository = (0, _typeorm.getCustomRepository)(_UserTokensRepository.default);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default('Usuario não existe');
    }

    const {
      token
    } = await usersTokenRepository.generateToken(user.id);

    const forgotPasswordTemplate = _path.default.resolve(__dirname, '..', 'views', 'ForgotPasswordHBS.hbs');

    await _EtherealMail.default.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[API Vendas] recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }

}

exports.SendForgotPasswordEmail = SendForgotPasswordEmail;