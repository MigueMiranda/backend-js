const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService;

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      const token = service.signToken(user);
      console.log('Email: ', req.user.email, 'Role: ', req.user.role, 'Password: ', req.user.password);
      console.log('Token: ', token);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePaswword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
