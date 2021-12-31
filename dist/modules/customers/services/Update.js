"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _CustomersRepository = _interopRequireDefault(require("../typeorm/repositories/CustomersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Update {
  async execute({
    id,
    name,
    email
  }) {
    const customersRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new _AppError.default('Cliente não encontrado', 400);
    }

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists && emailExists.id != id) {
      throw new _AppError.default('O email informado já está sendo utilizado');
    }

    customer.name = name;
    customer.email = email;
    await customersRepository.save(customer);
    return customer;
  }

}

var _default = Update;
exports.default = _default;