const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const authMiddleWare = require('./../middlewares/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to User Profile APIs');
});

router.use(authMiddleWare);

router.get('/users', users.getUsers);

router.post('/user', users.createUser);

router.delete('/user/:id', users.deleteUser);

module.exports = router;
