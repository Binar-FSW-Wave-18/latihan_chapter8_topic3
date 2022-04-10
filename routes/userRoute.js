const express = require('express');
const route = express.Router();
const UserController = require('../controllers/userController');


route.get('/', UserController.openRegister);
route.post('/', UserController.register);
route.get('/login', UserController.openLogin);
route.post('/login', UserController.login);



module.exports = route;