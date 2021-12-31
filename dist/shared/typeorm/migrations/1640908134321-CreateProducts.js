"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProducts1640908134321 = void 0;

var _typeorm = require("typeorm");

class CreateProducts1640908134321 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'products',
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
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2
      }, {
        name: 'quantity',
        type: 'int'
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
    await queryRunner.dropTable('products');
  }

}

exports.CreateProducts1640908134321 = CreateProducts1640908134321;