"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateSession = _interopRequireDefault(require("../services/CreateSession"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;
    const createSession = new _CreateSession.default();
    const user = await createSession.execute({
      email,
      password
    });
    return response.json(user);
  }

}

exports.default = SessionController;