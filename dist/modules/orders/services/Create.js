"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _typeorm = require("typeorm");

var _OrdersRepository = _interopRequireDefault(require("../typeorm/repositories/OrdersRepository"));

var _CustomersRepository = _interopRequireDefault(require("../../customers/typeorm/repositories/CustomersRepository"));

var _ProductsRepository = _interopRequireDefault(require("../../products/typeorm/repositories/ProductsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Create {
  async execute({
    customer_id,
    products
  }) {
    const ordersRepository = (0, _typeorm.getCustomRepository)(_OrdersRepository.default);
    const customersRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const productsRepository = (0, _typeorm.getCustomRepository)(_ProductsRepository.default);
    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new _AppError.default('Cliente não encontrado', 400);
    }

    const productsExists = await productsRepository.findAllProducts(products);

    if (!productsExists.length) {
      throw new _AppError.default('Produto não encontrado', 400);
    }
    /**
     The variable "productsIdsExists" map all the products array list by your ids
     The variable "checkInexistentsProducts" filter the array list and
     check if some product couldn't be founded and show what this product was
     */


    const productsIdsExists = productsExists.map(product => product.id);
    const checkInexistentsProducts = products.filter(product => !productsIdsExists.includes(product.id));

    if (checkInexistentsProducts.length) {
      throw new _AppError.default(`O Produto ${checkInexistentsProducts[0].id} não foi encontrado`, 400);
    }
    /**
     Product Id sent must be exactly equal to product Id that we ensured exists in variable
     "productsExists". If they're equal, we check if the quantity requested by client is
     less than quantity in my stock
     */


    const quantityAvaliable = products.filter(product => productsExists.filter(product2 => product2.id === product.id)[0].quantity < product.quantity);

    if (quantityAvaliable.length) {
      throw new _AppError.default(`${quantityAvaliable[0].quantity} é uma quantidade maior do que temos em estoque`, 400);
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(produto2 => produto2.id === product.id)[0].price
    }));
    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    });
    const {
      order_products
    } = order;
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: productsExists.filter(produto2 => produto2.id === product.product_id)[0].quantity - product.quantity
    }));
    await productsRepository.save(updatedProductQuantity);
    return order;
  }

}

var _default = Create;
exports.default = _default;