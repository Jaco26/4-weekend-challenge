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
    self.serverCheckUser = {};

    self.getCurrentUser = () => {
        $http({
            method: 'GET',
            url: '/login/current-user'
        }).then(function(response){
            self.serverCheckUser = response.data;
            console.log(self.serverCheckUser);
            console.log(self.currentUser);
            self.checkLogin();
        }).catch(function(error){
            console.log(error);            
        }); // END $http
    } // END self.getCurrentUser

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
            console.log(self.usersArray);
            
        }).catch(function (error) {
            console.log(error);
        }); // END $http
    } // END self.getUsers

    self.login = (currentUser) => {
        console.log(currentUser);
        $http({
            method: 'POST',
            url: '/login/current-user',
            data: {currentUser: currentUser}
        }).then(function(response){
            console.log(self.currentUser);
            console.log('getting current user');
            self.getCurrentUser();
        }).catch(function(error){
            console.error(error);
        }); // END $http
    } // END self.login

    self.checkLogin = () => {
        if (self.serverCheckUser.username) {
            self.loggedIn = true;
        } else {
            self.loggedIn = false;
        }
    }

    self.logout = () => {
        $http({
            method: 'PUT',
            url: '/login/current-user'
        }).then(function(response) {
            self.getCurrentUser()
            self.checkLogin();
        }).catch(function(error){
            console.log(error); 
        }); // END $http
    } // END self.logout

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
            image.viewCount++;
            $http({
                method: 'PUT',
                url: `gallery/view-count/${image.id}`,
                data: {viewCount: image.viewCount}
            }).then(function(response){
            }).catch(function(error){
                console.log(error);
                image.viewCount--;
            }); // END $http
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
                pic.viewCount = 0;
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
    self.getCurrentUser();
    self.getImages(); 
   
    
     
} // END galleryCtl





