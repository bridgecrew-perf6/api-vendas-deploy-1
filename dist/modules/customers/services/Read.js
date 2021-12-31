"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _CustomersRepository = _interopRequireDefault(require("../typeorm/repositories/CustomersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Read {
  async execute() {
    const customerRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const customer = await customerRepository.createQueryBuilder().paginate();

    if (!customer) {
      throw new _AppError.default('Erro ao listar clientes', 400);
    }

    return customer;
  }

}

var _default = Read;
exports.default = _default;