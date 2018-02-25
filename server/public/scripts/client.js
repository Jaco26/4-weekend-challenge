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
            //self.getUsers();
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
            console.log(self.usersArray);
        }).catch(function (error) {
            console.log(error);
        }); // END $http
    } // END self.getUsers

    self.login = () => {
        console.log(self.currentUser);
        self.loggedIn = true;
    }


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
            self.getImages();
        }).catch(function (error) {
            console.error(error);
        }); // END $http
        image.comment = ''; // clear the comment field
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
            //console.log('getComments result', result);
            // get the response into self.imagesArray
            for(let pic of self.imagesArray){
                if(pic.id === result.picture_id){
                    
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





