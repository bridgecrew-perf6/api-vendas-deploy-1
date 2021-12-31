"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrdersProducts1640908764625 = void 0;

var _typeorm = require("typeorm");

class CreateOrdersProducts1640908764625 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders_products',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
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
      }, {
        name: 'order_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'product_id',
        type: 'uuid',
        isNullable: true
      }]
    }));
    await queryRunner.createForeignKey('orders_products', new _typeorm.TableForeignKey({
      name: 'OrdersProductsOrder',
      columnNames: ['order_id'],
      referencedTableName: 'orders',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.createForeignKey('orders_products', new _typeorm.TableForeignKey({
      name: 'OrdersProductsProduct',
      columnNames: ['product_id'],
      referencedTableName: 'products',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('orders_products');
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsProduct');
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
  }

}

exports.CreateOrdersProducts1640908764625 = CreateOrdersProducts1640908764625;