angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.typedName = ""; //Don't let it be undefined


    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function() {
      //Add listing to listings container with data from form
      console.log("Calling addListing");

      $scope.listings.push({
        "code": $scope.newCode, 
        "name": $scope.newName, 
        "coordinates": {
          "latitude": $scope.newLat, 
          "longitude": $scope.newLong
        }, 
        "address": $scope.newAddress
        }
      );

      //Flush values
      $scope.newCode = "";
      $scope.newName = "";
      $scope.newLat = "";
      $scope.newLong = "";
      $scope.newAddress = "";
    };


    $scope.deleteListing = function(index) {
      //Remove specific listing from listings container
      console.log("Calling deleteListing for " + index);
      //Use code as index
      
      angular.forEach($scope.listings, function(value,key){
        if(value.code == index){
          console.log("Found " + value.code + "!!!");
          console.log("Here it is...");
          console.log(value);

          console.log("Deleting now...");
          delete $scope.listings[key];
        }
      });
    };


    $scope.showDetails = function(index) {
      //Show details for specific listing
      console.log("Calling showDetails for " + index);
      //Use code as index

      //Fill $scope.detailedInfo with relevant info
      angular.forEach($scope.listings, function(value,key){
        if(value.code == index){
          console.log("Found " + value.code + "!!!");
          console.log("Here it is...");
          console.log(value);

          console.log("Adding info to $scope.detailedInfo...");
          $scope.detailedInfo = {
            "code": value.code, 
            "name": value.name, 
            "coordinates": {
              "latitude": undefined, 
              "longitude": undefined
            }, 
            "address": undefined
          }
          
          if(value.address != undefined)
            $scope.detailedInfo.address = value.address;

          if(value.coordinates != undefined){
            $scope.detailedInfo.coordinates.latitude = value.coordinates.latitude;
            $scope.detailedInfo.coordinates.longitude = value.coordinates.longitude;
          }
        }
      });
    };
  }
]);