angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {

    /* Unique identifier for current user */
    $scope.currentUserEmail = undefined;

    $scope.detailedInfo = undefined;

    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.addListing = function(listing) {
        /* Save the article using the Listings factory */
        Listings.create(listing)
                .then(function(response) {
                  location.reload();
                }, function(error) {
                  $scope.error = 'Unable to add listing!' + error;
                });
      $scope.listings.push(listing);
    };

    $scope.deleteListing = function(id) {
      Listings.delete(id)
      .then(function(response) {
        location.reload();
      }, function(error) {
        $scope.error = 'Unable to delete listing!' + error;
      });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };

    $scope.login = function(emailParam){
      $scope.currentUserEmail = emailParam; //Set currentUserEmail scope variable

      console.log("We are in angular login function now!");
      console.log("Email passed in: " + emailParam);

      var emailAlreadyInDB = false;  //CHANGE LATER (to be based upon if email is in database)

      //If email is already in database, show user information
      if(emailAlreadyInDB){

      }else{  //ELSE, create new user
        var listing = {
          email: emailParam
        };

        $scope.addListing(listing);

      }
    }

  }


  
]);



var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '94097431082-u080o437bpmes48td7lh5ojcungl8hsn.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
        });
        attachSignin(document.getElementById('customBtn'));
    });
};


function attachSignin(element)
{
    auth2.attachClickHandler(element, {},
            function (googleUser)
            {
                console.log("Button clicked!\n Email: " + googleUser.getBasicProfile().getEmail());
                var email = googleUser.getBasicProfile().getEmail();  //Retrieve current user email
                angular.element($('#MainWrap')).scope().login(email); //Pass email into angular function (login)

            }, function (error)
            {
                alert(JSON.stringify(error, undefined, 2));
            });
}

startApp();