"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _OrdersRepository = _interopRequireDefault(require("../typeorm/repositories/OrdersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Read {
  async execute({
    id
  }) {
    const ordersRepository = (0, _typeorm.getCustomRepository)(_OrdersRepository.default);
    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new _AppError.default('Pedido não encontrado', 400);
    }

    return order;
  }

}

var _default = Read;
exports.default = _default;