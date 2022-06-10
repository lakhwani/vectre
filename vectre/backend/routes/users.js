var express = require('express');
var router = express.Router();

const User = require('../models/user');
const dbUtils = require('../utils/neo4j/dbUtils');
const {authenticateToken} = require("../utils/auth");

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

// POST /users/login/nonce
router.post('/login/nonce', (req, res) => {
    User.getNonce(dbUtils.getSession(req), req.body.wallet_address)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// POST /users/login
router.post('/login', (req, res) => {
    const setTokenInCookie = (token) => { res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true })} // Expires in 7 days
    User.login(dbUtils.getSession(req), req.body.wallet_address, req.body.signed_nonce, setTokenInCookie)
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
})

// DELETE /users/{wallet_address}/delete
router.delete('/:wallet_address/delete', authenticateToken, (req, res) => {
    if (req.wallet_address === req.params.wallet_address) {
        User.delete(dbUtils.getSession(req), req.wallet_address, req.params.wallet_address)
            .then((result) => res.send(result))
            .catch((error) => res.send(error))
    } else {
        res.status(403).send({
            success: false,
            message: "You do not have access to delete this User"
        })
    }
})

module.exports = router;