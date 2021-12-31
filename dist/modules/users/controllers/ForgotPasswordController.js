"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SendForgotPasswordEmail = require("../services/SendForgotPasswordEmail");

class ForgotPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body;
    const sendForgotPassword = new _SendForgotPasswordEmail.SendForgotPasswordEmail();
    await sendForgotPassword.execute({
      email
    });
    return response.status(204).json();
  }

}

exports.default = ForgotPasswordController;