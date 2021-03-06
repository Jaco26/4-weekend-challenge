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
    const sqlText = ` SELECT comment_id, picture_id, users.username, users.id, comment FROM comments 
     JOIN pictures_comments_users ON comments.id = pictures_comments_users.comment_id 
     JOIN users ON users.id = pictures_comments_users.user_id;`;
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

router.put('/view-count/:id', (req, res) => {
    const id = req.params.id;
    const viewCount = req.body.viewCount;
    const sqlText = `UPDATE pictures SET view_count = $1 WHERE id=$2;`;
    pool.query(sqlText, [viewCount, id]).then(function(response){
        res.sendStatus(200);
    }).catch(function(error){
        console.log('PROBLEM IN ROUTER.PUT /GALLERY/VIEW-COUNT/:ID', error);
        res.sendStatus(500);
    }); // END pool.query
}); // END router gallery/view-count/:id PUT

router.post('/comment', (req, res) => {
    const picture_id = req.body.picture_id;
    const comment = req.body.comment;
    const user_id = req.body.user_id;
    console.log('THIS IS THE NEW COMMENT', comment);
    const sqlText = `INSERT INTO comments (comment) 
    VALUES ($1);`;
    pool.query(sqlText, [comment]).then(function(response){
        pictures_commentsINSERT(picture_id, user_id);
        res.sendStatus(200)
    }).catch(function(error){
        console.log('PROBLEM IN ROUTER.POST /GALLERY/COMMENT', error);
        res.sendStatus(500);
    }); // END pool.query
}); // END router /gallery/comment POST

function pictures_commentsINSERT(picture_id, user_id){
    const sqlText = `INSERT INTO pictures_comments_users (picture_id, comment_id, user_id)
    VALUES ($1, (SELECT MAX(id) FROM comments), $2);`;
    pool.query(sqlText, [picture_id, user_id]).then(function(response){
    }).catch(function(error){
        console.log('PROBLEM IN pictures_commentsINSERT', error);
    }); // END pool.query
} // END pictures_commentsINSERT


module.exports = router;