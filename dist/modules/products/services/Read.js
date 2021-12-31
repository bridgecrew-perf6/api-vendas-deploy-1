"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _ProductsRepository = _interopRequireDefault(require("../typeorm/repositories/ProductsRepository"));

var _RedisCache = _interopRequireDefault(require("../../../shared/cache/RedisCache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Read {
  async execute() {
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.default); //const productsRepository = getRepository(Product);
    //const redisCache = new RedisCache();

    let products = await _RedisCache.default.recover('api-vendas-PRODUCT_LIST');

    if (!products) {
      products = await productsRepository.find();
      await _RedisCache.default.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }

}

var _default = Read;
exports.default = _default;