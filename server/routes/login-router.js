const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/users', (req, res) => {
    const sqlText = `SELECT * FROM users ORDER BY id;`;
    pool.query(sqlText).then(function(response){
        res.send(response);
    }).catch(function(error){
        console.log('PROBLEM IN /USERS GET', error);
    });
}); // END router /login GET

router.post('/new-user', (req, res) => {
    const username = req.body.username;
    const sqlText = `INSERT INTO users (username)
    VALUES ($1);`;
    pool.query(sqlText, [username]).then(function(response){
        res.sendStatus(200);
    }).catch(function(error){
        console.log('PROBLEM IN /NEW-USER POST');
        res.sendStatus(500);
    })

}); // END router /new-user POST

module.exports = router;