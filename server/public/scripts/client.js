const app = angular.module('myGallery', []);

const galleryController = app.controller('galleryController', ['$http', galleryCtl]);

function galleryCtl($http){
    let self = this;
    self.imagesArray = []; // This will hold the image objects that come back from the GET request in self.getImages

    self.imgClick = function (image) {
        if (image.clicked === false) {
            for (let pic of self.imagesArray) {
                pic.clicked = false;
            }
            image.clicked = true;
        } else {
            image.clicked = false;
        }
    }

    self.commentBtnClick = (image) => {
        if (image.commenting === false) {
            for (let pic of self.imagesArray) {
                pic.commenting = false;
            }
            image.commenting = true
        } else {
            image.commenting = false;
        }
    }

    self.getImages = function(){
        $http({
            method: 'GET',
            url: '/gallery',
        }).then(function(response){
            console.log(response.data);
            self.getComments();
            self.imagesArray = response.data
            for (let pic of self.imagesArray) {
                pic.clicked = false;
                pic.commenting = false;
                pic.comment = '';
            }
        }).catch(function(error){
            console.error(error);            
        }); // END $http
    }; // END self.getImages

    self.getComments = function(){
        $http({
            method: 'GET',
            url: '/gallery/comments'
        }).then(function(response){
            console.log(response);
            // get the response into self.imagesArray
        }).catch(function(error){
            console.error(error);
        })
    }

    
    self.likeClick = (image) => {
        image.up_votes++;
        $http({
            method: 'PUT',
            url: `/gallery/likes/${image.id}`,
            data: {likes: image.up_votes}
        }).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.error(error);   
            image.up_votes--;
        }); // END $http
    } // END self.likeClick

  
    self.submitComment = (image) => {
        $http({
            method: 'POST',
            url: '/gallery/comment',
            data: {comment: image.comment, id: image.id}
        }).then(function(response){
            self.getImages();
        }).catch(function(error){
            console.error(error);
        }); // END $http
        image.comment = ''; // clear the comment field
    } // END self.submitComment


    // ON LOAD
    self.getImages(); 

} // END galleryCtl