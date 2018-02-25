

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// let currentUsers = [];

// router.post('/current-user', (req, res) => {
//     let ranNum = Math.random() * 1000;
//     currentUsers.push({user: req.body.currentUser, serverID: ranNum});
//     console.log('login-router LINE 9:', currentUsers);
//     res.sendStatus(200);
//     getCurrentUser(ranNum);
// });

// function getCurrentUser (serverID){
//     router.get('/current-user', (req, res) => {
//         for(user of currentUsers){
//             if(user.serverID === serverID){
//                 res.send(user);
//             } else {
//                 res.send('user not found');
//             }
//         }
//     });
// }


// router.put('/current-user', (req, res) => {
//     const clientSideUser = req.body;
//     for(user of currentUsers){
//         if(user.serverID === clientSideUser.serverID){
//             console.log('FOUND IT!');
//             currentUsers.splice(currentUsers.indexOf(user));
//             console.log('After currentUsers splice', currentUsers);
            
//         }
//     }
//     // currentUser = {};
//     res.sendStatus(200);
// }); 


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