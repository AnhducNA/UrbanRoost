'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM place';
        db.query(sql, (err, response) => {
            if (err) console.log(err)
            res.json(response)
        })
    },
    detail: (req, res) => {
        console.log(req)
        let sql = `SELECT * FROM place WHERE id = ?`
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) console.log(err)
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE place SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) console.log(err)
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO place SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) console.log(err)
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM place WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) console.log(err)
            res.json({message: 'Delete success!'})
        })
    }
}
