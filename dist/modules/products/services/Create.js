"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _ProductsRepository = _interopRequireDefault(require("../typeorm/repositories/ProductsRepository"));

var _RedisCache = _interopRequireDefault(require("../../../shared/cache/RedisCache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Create {
  async execute({
    name,
    price,
    quantity
  }) {
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.default);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new _AppError.default('Produto já cadastrado', 400);
    } //const redisCache = new RedisCache();


    const product = productsRepository.create({
      name,
      price,
      quantity
    });
    await _RedisCache.default.invalidate('api-vendas-PRODUCT_LIST');
    await productsRepository.save(product);
    return product;
  }

}

var _default = Create;
exports.default = _default;