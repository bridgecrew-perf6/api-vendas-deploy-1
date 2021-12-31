"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Customers = _interopRequireDefault(require("../entities/Customers"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CustomersRepository = (_dec = (0, _typeorm.EntityRepository)(_Customers.default), _dec(_class = class CustomersRepository extends _typeorm.Repository {
  async findByName(name) {
    const customer = await this.findOne({
      where: {
        name
      }
    });
    return customer;
  }

  async findById(id) {
    const customer = await this.findOne({
      where: {
        id
      }
    });
    return customer;
  }

  async findByEmail(email) {
    const customer = await this.findOne({
      where: {
        email
      }
    });
    return customer;
  }

}) || _class);
var _default = CustomersRepository;
exports.default = _default;