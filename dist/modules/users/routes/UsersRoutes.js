"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middleware/isAuthenticated"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prettier/prettier */
const usersRouter = (0, _express.Router)();
const usersController = new _UsersController.default();
const userAvatarController = new _UserAvatarController.default();
const upload = (0, _multer.default)(_upload.default);
usersRouter.get('/', _isAuthenticated.default, usersController.index);
/* DEIXA PRA DEPOIS
usersRouter.get(
     '/:id',
     celebrate({
       [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
       },
     }),
     productsController.readOne,
  );
  */

usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersController.create);
usersRouter.patch('/avatar', _isAuthenticated.default, upload.single('avatar'), userAvatarController.update);
var _default = usersRouter;
exports.default = _default;