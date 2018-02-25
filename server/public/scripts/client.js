const app = angular.module('myGallery', []);

const galleryController = app.controller('galleryController', ['$http', galleryCtl]);
function galleryCtl($http){
    let self = this;

    // // // // // // // // // // // 
    // LOGIN FUNCTIONALITY // // // // 
    // // // // // // // // // // // 
    self.loggedIn = false;
    self.usersArray = []; // populate with sql query to users table
    self.currentUser = {};

    self.submitUsername = (username) => {
        $http({
            method: 'POST',
            url: '/login/new-user',
            data: { username: username }
        }).then(function (response) {
            self.getUsers();
        }).catch(function (error) {
            console.log(error);
        }); // END $http
        self.newUsername = '';
    } // END self.submitUsername

    self.getUsers = () => {
        $http({
            method: 'GET',
            url: '/login/users',
        }).then(function (response) {
            self.usersArray = response.data.rows;
        }).catch(function (error) {
            console.log(error);
        }); // END $http
    } // END self.getUsers

    self.login = () => {
        if(!self.currentUser.username){
            alert('Whoa! Who are you again?? AND BE HONEST! I havn\'t learned passwords yet...');
        } else {
            self.loggedIn = true;
        }
    } // END self.login

     // // // // // // // // // // // //
    // ON-PAGE FUNCTIONALITY // // // // 
     // // // // // // // // // // // //
    
    self.imagesArray = []; // This will hold the image objects that come back from the GET request in self.getImages

    self.imgClick = (image) => {
        if (image.clicked === false) {
            for (let pic of self.imagesArray) {
                pic.clicked = false;
            }
            image.clicked = true;
        } else {
            image.clicked = false;
        }
    } // END self.imgClick

    self.likeClick = (image) => {
        image.up_votes++;
        $http({
            method: 'PUT',
            url: `/gallery/likes/${image.id}`,
            data: { likes: image.up_votes }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.error(error);
            image.up_votes--;
        }); // END $http
    } // END self.likeClick

    self.commentBtnClick = (image) => {
        if (image.commenting === false) {
            for (let pic of self.imagesArray) {
                pic.commenting = false;
            }
            image.commenting = true
        } else {
            image.commenting = false;
        }
    } // END self.commentBtnClick

    self.submitComment = (image) => {
        console.log(image.newComment);
        $http({
            method: 'POST',
            url: '/gallery/comment',
            data: { comment: image.newComment, picture_id: image.id, user_id: self.currentUser.id }
        }).then(function (response) {
            self.getComments();
            image.newComment = ''; // clear the comment field
        }).catch(function (error) {
            console.error(error);
        }); // END $http
        
    } // END self.submitComment

    self.getImages = () => {
        $http({
            method: 'GET',
            url: '/gallery',
        }).then(function(response){
            self.imagesArray = response.data
            for (let pic of self.imagesArray) {
                pic.clicked = false;
                pic.commenting = false;
                pic.newComment = '';
                pic.allComments = [];
            }
            self.getComments();
        }).catch(function(error){
            console.error(error);            
        }); // END $http
    }; // END self.getImages

    self.getComments = () => {
        $http({
            method: 'GET',
            url: '/gallery/comments'
        }).then(function(response){
            let result = response.data;
            for (let i = 0; i < self.imagesArray.length; i++){
                let pic = self.imagesArray[i]
                pic.allComments = [];
                for(let i = 0; i < result.length; i++){
                    if (pic.id === result[i].picture_id) {
                        pic.allComments.push(result[i])
                    }
                }    
            }
        }).catch(function(error){
            console.error(error);
        })
    } // END self.getComments
   
     // // // // /
    // ON LOAD //
    self.getUsers();
    self.getImages(); 
    
     
} // END galleryCtl





