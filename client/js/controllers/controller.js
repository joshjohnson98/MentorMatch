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

      //If email is already in database, show user information

      //ELSE, create new user
      //addListing()
    }

  }


  
]);
