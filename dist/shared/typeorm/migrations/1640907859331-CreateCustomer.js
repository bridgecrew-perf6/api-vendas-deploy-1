"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomer1640907859331 = void 0;

var _typeorm = require("typeorm");

/*
  Ao criar uma migration, precisa colocar -- -n <nome da migration>
  se nao colocar os "--" nao da certo, a sintaxe é assim
*/
class CreateCustomer1640907859331 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'customers',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('customers');
  }

}

exports.CreateCustomer1640907859331 = CreateCustomer1640907859331;