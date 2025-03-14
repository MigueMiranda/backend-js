const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderid = Joi.number().integer();
const productid = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const addItemSchema = Joi.object({
  orderId: orderid.required(),
  productId: productid.required(),
  amount: amount.required()
})

module.exports = { getOrderSchema, createOrderSchema, addItemSchema };
