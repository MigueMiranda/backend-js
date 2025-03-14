const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {

  constructor() {
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const order = await models.Order.findByPk(data.orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    if (!order.customerId) {
      throw new Error('Order must have a customerId before adding items');
    }
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const order = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })
    return order;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
