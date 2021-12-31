"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Read = _interopRequireDefault(require("../services/Read"));

var _ReadOne = _interopRequireDefault(require("../services/ReadOne"));

var _Create = _interopRequireDefault(require("../services/Create"));

var _Update = _interopRequireDefault(require("../services/Update"));

var _Delete = _interopRequireDefault(require("../services/Delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomersController {
  async index(request, response) {
    const listCustomers = new _Read.default();
    const customer = await listCustomers.execute();
    return response.json(customer);
  }

  async ReadOne(request, response) {
    const {
      id
    } = request.params;
    const readOne = new _ReadOne.default();
    const customer = await readOne.execute({
      id
    });
    return response.json(customer);
  }

  async create(request, response) {
    const {
      name,
      email
    } = request.body;
    const create = new _Create.default();
    const customer = await create.execute({
      name,
      email
    });
    return response.json(customer);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      name,
      email
    } = request.body;
    const update = new _Update.default();
    const customer = await update.execute({
      id,
      name,
      email
    });
    return response.json(customer);
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

exports.default = CustomersController;