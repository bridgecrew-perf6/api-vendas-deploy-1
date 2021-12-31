"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

require("../typeorm");

var _celebrate = require("celebrate");

var _upload = _interopRequireDefault(require("../../config/upload"));

var _typeormPagination = require("typeorm-pagination");

var _rateLimiter = _interopRequireDefault(require("./middleware/rateLimiter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-unused-vars */

/*This library allow to us separate the files in different pages. Like 5, 10, 15 register per page and
then you click "next" to change the page or "previous" to go back */
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_rateLimiter.default);
app.use(_typeormPagination.pagination);
app.use('/files', _express.default.static(_upload.default.directory));
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((error, request, response, next) => {
  if (error instanceof _AppError.default) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.log(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
app.listen(process.env.PORT || 3334, () => {
  console.log('Server started on port 3334! 🏆');
});
