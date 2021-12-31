"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UserTokens = _interopRequireDefault(require("../entities/UserTokens"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UserTokensRepository = (_dec = (0, _typeorm.EntityRepository)(_UserTokens.default), _dec(_class = class UserTokensRepository extends _typeorm.Repository {
  async findByToken(token) {
    const userToken = await this.findOne({
      where: {
        token
      }
    });
    return userToken;
  }

  async generateToken(user_id) {
    const userToken = await this.create({
      user_id
    });
    await this.save(userToken);
    return userToken;
  }

}) || _class);
exports.default = UserTokensRepository;