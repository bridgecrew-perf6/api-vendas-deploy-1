"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ProductsRoutes = _interopRequireDefault(require("../../../modules/products/routes/ProductsRoutes"));

var _UsersRoutes = _interopRequireDefault(require("../../../modules/users/routes/UsersRoutes"));

var _SessionRoutes = _interopRequireDefault(require("../../../modules/users/routes/SessionRoutes"));

var _PasswordRoutes = _interopRequireDefault(require("../../../modules/users/routes/PasswordRoutes"));

var _ProfileRoutes = _interopRequireDefault(require("../../../modules/users/routes/ProfileRoutes"));

var _CustomersRoutes = _interopRequireDefault(require("../../../modules/customers/routes/CustomersRoutes"));

var _OrdersRoutes = _interopRequireDefault(require("../../../modules/orders/routes/OrdersRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*import { Router } from 'express';
import productsRouter from '@modules/products/routes/ProductsRoutes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
*/
const routes = (0, _express.Router)();
routes.use('/products', _ProductsRoutes.default);
routes.use('/users', _UsersRoutes.default);
routes.use('/sessions', _SessionRoutes.default);
routes.use('/password', _PasswordRoutes.default);
routes.use('/profile', _ProfileRoutes.default);
routes.use('/customers', _CustomersRoutes.default);
routes.use('/orders', _OrdersRoutes.default);
var _default = routes;
exports.default = _default;