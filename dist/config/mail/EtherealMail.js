"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _HandleBarsMailTemplate = _interopRequireDefault(require("./HandleBarsMailTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Ethereamail {
  static async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const account = await _nodemailer.default.createTestAccount();
    const mailTemplate = new _HandleBarsMailTemplate.default();

    const transporter = _nodemailer.default.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    const message = await transporter.sendMail({
      from: {
        name: (from === null || from === void 0 ? void 0 : from.name) || 'Equipe API vendas',
        address: (from === null || from === void 0 ? void 0 : from.email) || 'suporte@apivendas.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });
    console.log('Message sent: %s ', message.messageId);
    console.log('Preview URL: %s ', _nodemailer.default.getTestMessageUrl(message));
  }

}

exports.default = Ethereamail;