const app = angular.module('myGallery', []);

const galleryController = app.controller('galleryController', ['$http', galleryCtl]);

function galleryCtl($http){
    let self = this;

    self.blob = 'Hello World';



} // END galleryCtl