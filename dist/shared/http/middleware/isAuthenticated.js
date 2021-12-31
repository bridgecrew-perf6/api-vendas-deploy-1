"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Esse arquivo serve pra autenticar os tokens das sessoes. É usado nas rotas
function isAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('Token JWT não identificado');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decodedToken;
    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Token inválido!');
  }
}