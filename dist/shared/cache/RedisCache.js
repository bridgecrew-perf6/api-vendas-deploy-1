"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _cache = _interopRequireDefault(require("../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RedisCache {
  constructor() {
    this.client = void 0;
    this.connected = false;

    if (!this.connected) {
      this.client = new _ioredis.default(_cache.default.config.redis);
      this.connected = true;
    }
  } //JSON.stringify  converts an Object in to a string


  async save(key, value) {
    await this.client.set(key, JSON.stringify(value));
  }

  async recover(key) {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    } //JSON.parse converts a String in an Object


    const parseData = JSON.parse(data);
    return parseData;
  }

  async invalidate(key) {
    await this.client.del(key);
  }

}

var _default = new RedisCache();

exports.default = _default;