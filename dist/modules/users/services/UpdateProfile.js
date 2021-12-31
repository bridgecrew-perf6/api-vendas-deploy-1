"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));

var _bcryptjs = require("bcryptjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateProfile {
  async execute({
    user_id,
    name,
    email,
    new_password,
    old_password
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Usuário não encontrado', 400);
    }

    const emailExists = await userRepository.findByEmail(email);
    /* Here we verify if the email exists. But the user can change others parameters (name or password)
     and use the same email adress. In this case, of course the email will exists, he's from the own user.
    Because of that is necessary a second verification. If the email owner havent the same id from
    the request user, they arent the same person, so, cannot change anything  */

    if (emailExists && emailExists.id != user_id) {
      throw new _AppError.default('O email informado já está sendo utilizado');
    }

    if (new_password && !old_password) {
      throw new _AppError.default('Insira a senha antiga para conseguir trocá-la');
    }

    if (new_password && old_password) {
      const checkOldPassword = await (0, _bcryptjs.compare)(old_password, user.password);

      if (!checkOldPassword) {
        throw new _AppError.default('A senha antiga está incorreta');
      }

      user.password = await (0, _bcryptjs.hash)(new_password, 8);
    }

    user.name = name;
    user.email = email;
    await userRepository.save(user);
    return user;
  }

}

var _default = UpdateProfile;
exports.default = _default;