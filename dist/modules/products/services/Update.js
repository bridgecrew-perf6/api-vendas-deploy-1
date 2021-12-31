"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RedisCache = _interopRequireDefault(require("../../../shared/cache/RedisCache"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _ProductsRepository = _interopRequireDefault(require("../typeorm/repositories/ProductsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Update {
  async execute({
    id,
    name,
    price,
    quantity
  }) {
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.default);
    const productExists = await productsRepository.findByName(name);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new _AppError.default('Produto não encontrado', 400);
    }

    if (productExists) {
      throw new _AppError.default('Produto já cadastrado', 400);
    } //const redisCache = new RedisCache();


    product.name = name;
    product.price = price;
    product.quantity = quantity;
    await _RedisCache.default.invalidate('api-vendas-PRODUCT_LIST');
    await productsRepository.save(product);
    return product;
  }

}

var _default = Update;
exports.default = _default;