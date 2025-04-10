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
    if (order.status != 'pendiente_pago') {
      throw new Error('Order must be in pendiente pago status to add items');
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

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })
    return orders;
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
}

module.exports = OrderService;
