"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function rateLimiter(request, response, next) {
  try {
    const redisClient = new _ioredis.default({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined
    });
    const limiter = new _rateLimiterFlexible.RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      //Maximum number of request per second by each IP adress
      points: 3,
      duration: 1
    });
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new _AppError.default('Muitas requisições ao mesmo tempo!', 429);
  }
}