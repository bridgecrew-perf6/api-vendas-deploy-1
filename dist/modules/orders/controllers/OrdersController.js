"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Create = _interopRequireDefault(require("../services/Create"));

var _ReadOne = _interopRequireDefault(require("../services/ReadOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrdersController {
  async readOne(request, response) {
    const {
      id
    } = request.params;
    const readOne = new _ReadOne.default();
    const order = await readOne.execute({
      id
    });
    return response.json(order);
  }

  async create(request, response) {
    const {
      customer_id,
      products
    } = request.body;
    const create = new _Create.default();
    const order = await create.execute({
      customer_id,
      products
    });
    return response.json(order);
  }

}

exports.default = OrdersController;