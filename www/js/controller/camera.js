angular.module('pandasNews.controllers')
  .controller('CameraCtrl', ['$scope', '$stateParams', '$cordovaCamera', '$cordovaCapture',
    function($scope, $stateParams, $cordovaCamera, $cordovaCapture) {


      $scope.captureAudio = function() {
        var options = { limit: 3, duration: 10 };

        $cordovaCapture.captureAudio(options).then(function(audioData) {
          // Success! Audio data is here
        }, function(err) {
          // An error occurred. Show a message to the user
        });
      };

      $scope.captureImage = function() {

        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };
        $cordovaCapture.captureImage(options).then(function(imageData) {
          function onPhotoURISuccess(imageURI) {
            window.resolveLocalFileSystemURI(imageURI, gotFileEntry, failSystem);
          }
          var gotFileEntry = function(fileEntry) {
            console.log("got image file entry: " +  fileEntry.fullPath);
            //convert all file to base64 formats
            fileEntry.file( function(file) {
              var reader = new FileReader();
              reader.onloadend = function(evt) {
                console.log("Read complete!");
                var image = document.getElementById('myImage');
                image.src = evt.target.result;
              };
              reader.readAsDataURL(file);
            }, failFile);
          };
          var failSystem=function(){
            console.log('failed');
          }
          var failFile=function(){
            console.log('failed');
            throw "toobig";
          };
          onPhotoURISuccess(imageData[0].fullPath)
          // Success! Image data is here
        }, function(err) {
          // An error occurred. Show a message to the user
        });
      };

    }
  ]);
