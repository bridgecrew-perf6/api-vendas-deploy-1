"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _ProductsRepository = _interopRequireDefault(require("../typeorm/repositories/ProductsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadOne {
  async execute({
    id
  }) {
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.default); //const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new _AppError.default('Produto não encontrado', 400);
    }

    return product;
  }

}

var _default = ReadOne;
exports.default = _default;