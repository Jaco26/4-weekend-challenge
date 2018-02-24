const app = angular.module('myGallery', []);

const galleryController = app.controller('galleryController', ['$http', galleryCtl]);

function galleryCtl($http){
    let self = this;

    self.user = '';
    
     // // // // // // // // // // // 
    // LOGIN FUNCTIONALITY // // // // 
     // // // // // // // // // // // 
    self.newUsername = '';
    self.submitUsername = (username) => {

    }

    

     // // // // // // // // // // // //
    // ON PAGE FUNCTIONALITY // // // // 
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
            data: { newComment: image.newComment, id: image.id }
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
            console.log('getComments result', result);
            
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
    self.getImages(); 

} // END galleryCtl