"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Create = _interopRequireDefault(require("../services/Create"));

var _Read = _interopRequireDefault(require("../services/Read"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { ReadOne } from '../services/ReadOne';
class UsersController {
  async index(request, response) {
    const listUsers = new _Read.default(); // eslint-disable-next-line no-console

    console.log(request.user.id);
    const user = await listUsers.execute();
    return response.json(user);
  }
  /* DEIXA PRA FAZER DEPOIS
  public async readOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const readOne = new ReadOne();
    const user = await readOne.execute({ id });
      return response.json(user);
  }
    */


  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const create = new _Create.default();
    const user = await create.execute({
      name,
      email,
      password
    });
    return response.json(user);
  }

}

exports.default = UsersController;