"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowProfile = _interopRequireDefault(require("../services/ShowProfile"));

var _UpdateProfile = _interopRequireDefault(require("../services/UpdateProfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async show(request, response) {
    const showProfile = new _ShowProfile.default();
    const user_id = request.user.id;
    const user = await showProfile.execute({
      user_id
    });
    return response.json(user);
  }

  async update(request, response) {
    const user_id = request.user.id;
    const {
      name,
      email,
      new_password,
      old_password
    } = request.body;
    const updateProfile = new _UpdateProfile.default();
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      new_password,
      old_password
    });
    return response.json(user);
  }

}

exports.default = ProfileController;