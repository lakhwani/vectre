var express = require('express');
var router = express.Router();

const User = require('../models/user');
const dbUtils = require('../utils/neo4j/dbUtils');

// GET /users
router.get('/', (req, res, next) => {
    User.getAll(dbUtils.getSession(req))
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// GET /users/{wallet_address}
router.get('/:wallet_address', (req, res) => {
    User.getByWalletAddress(dbUtils.getSession(req), req.params.wallet_address)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /users/register
router.post('/register', (req, res) => {
    User.register(dbUtils.getSession(req), req.body)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

module.exports = router;