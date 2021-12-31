"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middleware/isAuthenticated"));

var _ProfileController = _interopRequireDefault(require("../controllers/ProfileController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRouter = (0, _express.Router)();
const profileController = new _ProfileController.default(); //using this method, we ensure the user will be authenticated to do changes in profile

profileRouter.use(_isAuthenticated.default);
profileRouter.get('/', profileController.show);
profileRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    new_password: _celebrate.Joi.string().optional(),
    old_password: _celebrate.Joi.string(),

    /*If a new password is created, it needs confirmation  */
    password_confirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('new_password')).when('new_password', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.required()
    })
  }
}), profileController.update);
var _default = profileRouter;
exports.default = _default;