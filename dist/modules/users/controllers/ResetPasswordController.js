"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ResetPassword = _interopRequireDefault(require("../services/ResetPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(request, response) {
    const {
      token,
      password
    } = request.body;
    const resetPassword = new _ResetPassword.default();
    await resetPassword.execute({
      token,
      password
    });
    return response.status(204).json();
  }

}

exports.default = ResetPasswordController;