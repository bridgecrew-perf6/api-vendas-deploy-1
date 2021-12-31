"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ProductsController = _interopRequireDefault(require("../controllers/ProductsController"));

var _celebrate = require("celebrate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prettier/prettier */
const productsRouter = (0, _express.Router)();
const productsController = new _ProductsController.default();
productsRouter.get('/', productsController.index);
productsRouter.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), productsController.readOne);
productsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    price: _celebrate.Joi.number().required(),
    quantity: _celebrate.Joi.number().precision(2).required()
  }
}), productsController.create);
productsRouter.put('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    price: _celebrate.Joi.number().required(),
    quantity: _celebrate.Joi.number().precision(2).required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), productsController.update);
productsRouter.delete('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), productsController.delete);
var _default = productsRouter;
exports.default = _default;