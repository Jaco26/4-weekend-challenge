const app = angular.module('myGallery', []);

const galleryController = app.controller('galleryController', ['$http', galleryCtl]);

function galleryCtl($http){
    let self = this;

    self.imagesArray = [];

    self.getImages = function(){
        $http({
            method: 'GET',
            url: '/gallery',
        }).then(function(response){
            console.log(response.data);
            self.imagesArray = response.data
            for (let pic of self.imagesArray) {
                pic.clicked = false;
            }
        }).catch(function(error){
            console.log(error);            
        }); // END $http
    }; // END self.getImages

    self.clickclick = function(image){
        if(image.clicked === false){
            for (let pic of self.imagesArray) {
                pic.clicked = false;
            }
            image.clicked = true;
        } else {
            image.clicked = false;
        }
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
            console.log(error);   
            image.up_votes--;
        });
    } // END self.likeClick

    // ON LOAD
    self.getImages(); 

} // END galleryCtl