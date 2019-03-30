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

    $scope.addListing = function() {
        /* Save the article using the Listings factory */
        Listings.create($scope.newListing)
                .then(function(response) {
                  location.reload();
                }, function(error) {
                  $scope.error = 'Unable to add listing!' + error;
                });
      $scope.listings.push($scope.newListing);
      $scope.newListing = {};
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

    $scope.login = function(email){
      //For use in other sections of the homepage
      currentUserEmail = email;

      console.log("We are in angular login function now!");
      console.log("Email passed in: " + email);

      //If email is already in database, show user information

      //ELSE, create new user
      //addListing()
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

                var email = googleUser.getBasicProfile().getEmail();

                angular.element($('#MainWrap')).scope().login(email);

            }, function (error)
            {
                alert(JSON.stringify(error, undefined, 2));
            });
}

startApp();