"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Create = _interopRequireDefault(require("../services/Create"));

var _Delete = _interopRequireDefault(require("../services/Delete"));

var _Read = _interopRequireDefault(require("../services/Read"));

var _ReadOne = _interopRequireDefault(require("../services/ReadOne"));

var _Update = _interopRequireDefault(require("../services/Update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsController {
  async index(request, response) {
    const listProducts = new _Read.default();
    const product = await listProducts.execute();
    return response.json(product);
  }

  async readOne(request, response) {
    const {
      id
    } = request.params;
    const readOne = new _ReadOne.default();
    const product = await readOne.execute({
      id
    });
    return response.json(product);
  }

  async create(request, response) {
    const {
      name,
      price,
      quantity
    } = request.body;
    const create = new _Create.default();
    const product = await create.execute({
      name,
      price,
      quantity
    });
    return response.json(product);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      name,
      price,
      quantity
    } = request.body;
    const update = new _Update.default();
    const product = await update.execute({
      id,
      name,
      price,
      quantity
    });
    return response.json(product);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;
    const deletar = new _Delete.default();
    await deletar.execute({
      id
    });
    return response.json([]);
  }

}

exports.default = ProductsController;