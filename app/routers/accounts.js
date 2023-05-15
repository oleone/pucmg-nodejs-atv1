const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');

const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
});

/**
 * GET ACCOUNTS
 */
router.get('/accounts', (req, res) => {
    knex.select('*').from('accounts')
        .then(accounts => res.status(200).json(accounts))
        .catch(error => {
            res.status(500).json({
                message: `Erro ao recuperar accounts - ${error.message}`
            });
        });
});

/**
 * GET ACCOUNTS BY ID
 */
router.get('/accounts/:id', (req, res) => {
    const id = req.params?.id;

    if (!id) {
        res.status(400).send({ statusCode: 400, message: 'Expected id param' })
    }

    knex.select('*')
        .from('accounts')
        .where(id)
        .then(account => res.status(200).json(account))
        .catch(error => {
            res.status(500).json({
                message: `Erro ao recuperar accounts - ${error.message}`
            });
        });
});

/**
 * CREATE ACCOUNT
 */
router.post('/accounts', (req, res) => {
    const payload = req.body;

    knex.insert(payload, 'id')
        .into('account')
        .then(account => res.status(201).json(account))
        .catch(error => {
            res.status(500).json({
                message: `Erro ao criar account - ${error.message}`
            });
        });
});

/**
 * UPDATE ACCOUNT
 */
router.put('/accounts/:id', (req, res) => {
    const id = req.params?.id;
    const payload = req.body;

    if (!id) {
        res.status(400).send({ statusCode: 400, message: 'Expected id param' })
    }

    knex('accounts')
        .where(id)
        .update(payload)
        .then(account => res.status(200).json(account))
        .catch(error => {
            res.status(500).json({
                message: `Erro ao atualizar account - ${error.message}`
            });
        });
});

/**
 * DELETE ACCOUNT
 */
router.delete('/accounts/:id', (req, res) => {
    const id = req.params?.id;

    if (!id) {
        res.status(400).send({ statusCode: 400, message: 'Expected id param' })
    }

    knex('accounts')
        .where(id)
        .del()
        .then(account => res.status(200))
        .catch(error => {
            res.status(500).json({
                message: `Erro ao atualizar account - ${error.message}`
            });
        });
});

module.exports = router;