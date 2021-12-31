"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrders1640908472014 = void 0;

var _typeorm = require("typeorm");

class CreateOrders1640908472014 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'customer_id',
        type: 'uuid',
        isNullable: true
      }]
    }));
    await queryRunner.createForeignKey('orders', new _typeorm.TableForeignKey({
      name: 'OrdersCustomer',
      columnNames: ['customer_id'],
      referencedTableName: 'customers',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
    await queryRunner.dropTable('orders');
  }

}

exports.CreateOrders1640908472014 = CreateOrders1640908472014;