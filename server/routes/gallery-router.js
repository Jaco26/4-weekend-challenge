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
    })

}); // END router /gallery GET




module.exports = router;