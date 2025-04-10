const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');
const CustomerService = require('../services/customers.service');

const router = express.Router();
const customerService = new CustomerService();
const service = new OrderService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
  try {
    const order = await service.find();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const customer = customerService.findByUser(req.user);
      console.log('customerId: ', customer)
      const newOrder = await service.create(customer);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-items',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    console.log('BODY RECEIVED:', req.body);
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
