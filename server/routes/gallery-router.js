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

router.get('/comments', (req, res) => {
    const sqlText = ` SELECT comment_id, picture_id, comment FROM comments 
 	JOIN pictures_comments ON comments.id = pictures_comments.comment_id;`;
    pool.query(sqlText).then(function(response){
        res.send(response.rows);
    }).catch(function(error){
        console.log('PROBLEM IN ROUTER.GET /GALLERY/COMMENTS', error);
        res.sendStatus(500);
    }); // END pool.query
}); // END router /gallery/comments GET

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

router.post('/comment', (req, res) => {
    const id = req.body.id;
    const comment = req.body.newComment;
    console.log('THIS IS THE NEW COMMENT', comment);
    
    const sqlText = `INSERT INTO comments (comment) 
    VALUES ($1);`;
    pool.query(sqlText, [comment]).then(function(response){
        pictures_commentsINSERT(id, comment)
        res.sendStatus(200)
    }).catch(function(error){
        console.log('PROBLEM IN ROUTER.POST /GALLERY/COMMENT');
        res.sendStatus(500);
    }); // END pool.query
}); // END router /gallery/comment POST

function pictures_commentsINSERT(id, comment){
    const sqlText = `INSERT INTO pictures_comments (picture_id, comment_id)
    VALUES ($1, (SELECT id FROM comments WHERE comment=$2));`;
    pool.query(sqlText, [id, comment]).then(function(response){
    }).catch(function(error){
        console.log('PROBLEM IN pictures_commentsINSERT', error);
    }); // END pool.query
} // END pictures_commentsINSERT



module.exports = router;