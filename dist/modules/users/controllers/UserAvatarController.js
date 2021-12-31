"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateAvatar = _interopRequireDefault(require("../services/UpdateAvatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { ReadOne } from '../services/ReadOne';
class UserAvatarController {
  async update(request, response) {
    var _request$file;

    const update = new _UpdateAvatar.default();
    const user = update.execute({
      UserId: Number(request.user.id),
      AvatarFilename: (_request$file = request.file) === null || _request$file === void 0 ? void 0 : _request$file.filename
    });
    return response.json(user);
  }

}

exports.default = UserAvatarController;