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
        }).catch(function(error){
            console.log(error);            
        }); // END $http
    }; // END self.getImages


    // ON LOAD
    self.getImages(); 

} // END galleryCtl