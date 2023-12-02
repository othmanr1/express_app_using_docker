const express = require('express')
const route = express.Router()
const usr = require('../controllers/user.controller')

route.post('/sub', usr.subscribe);
route.post('/login', usr.login);

module.exports = route;