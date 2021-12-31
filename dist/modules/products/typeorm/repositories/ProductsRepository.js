"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Product = _interopRequireDefault(require("../entities/Product"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ProductsRepository = (_dec = (0, _typeorm.EntityRepository)(_Product.default), _dec(_class = class ProductsRepository extends _typeorm.Repository {
  async findByName(name) {
    const product = await this.findOne({
      where: {
        name
      }
    });
    return product;
  }

  async findAllProducts(products) {
    //can map the entity and callback just what you want, in this case, the id
    const productsIds = products.map(product => product.id);
    const productsExists = await this.find({
      where: {
        id: (0, _typeorm.In)(productsIds)
      }
    });
    return productsExists;
  }

}) || _class);
var _default = ProductsRepository;
exports.default = _default;