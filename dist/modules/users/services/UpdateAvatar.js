"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _fs = _interopRequireDefault(require("fs"));

var _typeorm = require("typeorm");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _UsersRepository = _interopRequireDefault(require("../typeorm/repositories/UsersRepository"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//biblioteca nariva do node para trabalhar com manipulação de arquivos
class UpdateAvatar {
  async execute({
    UserId,
    AvatarFilename
  }) {
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await usersRepository.findById(UserId);

    if (!user) {
      throw new _AppError.default('Usuário não encontrado');
    }
    /*Essa parte faz a verificação se já existe um avatar pro usuario, se não existir,cria um
    se ja existir, exclui o que ja tem e adiciona outro
    */


    if (user.avatar) {
      const UserAvatarFilePath = _path.default.join(_upload.default.directory, user.avatar);

      const UserAvatarFileExists = await _fs.default.promises.stat(UserAvatarFilePath);

      if (UserAvatarFileExists) {
        await _fs.default.promises.unlink(UserAvatarFilePath);
      }
    }

    user.avatar = AvatarFilename;
    await usersRepository.save(user);
    return user;
  }

}

exports.default = UpdateAvatar;