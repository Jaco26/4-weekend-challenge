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
        for(let pic of self.imagesArray){
            pic.clicked = false;
        }
        image.clicked = true;
    }

    // ON LOAD
    self.getImages(); 

} // END galleryCtl