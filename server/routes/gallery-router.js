const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
    const sqlText = 'SELECT * FROM pictures ORDER BY id ASC;';
    pool.query(sqlText).then(function(response){
        res.send(response.rows);
    }).catch(function(error){
        console.log('PROBLEM IN ROUTER.GET /GALLERY', error);
        res.sendStatus(500);
    });
}); // END router /gallery GET

router.put('/likes/:id', (req, res) => {
    const id = req.params.id;
    const likes = req.body.likes;
    const sqlText = 'UPDATE pictures SET up_votes=$1 WHERE id=$2;';
    pool.query(sqlText, [likes, id]).then(function(response) {
        res.sendStatus(200);
    }).catch(function(error) {
        console.log('PROBLEM IN ROUTER.PUT /GALLERY/LIKES/:ID', error);
        res.sendStatus(500);
    }); // END pool.query
}); // END router /gallery/likes PUT




module.exports = router;