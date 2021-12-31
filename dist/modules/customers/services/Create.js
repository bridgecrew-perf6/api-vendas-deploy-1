"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _CustomersRepository = _interopRequireDefault(require("../typeorm/repositories/CustomersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Create {
  async execute({
    name,
    email
  }) {
    const customersRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new _AppError.default('O Email informado já está sendo utilizado', 400);
    }

    const customer = customersRepository.create({
      name,
      email
    });
    await customersRepository.save(customer);
    return customer;
  }

}

exports.default = Create;