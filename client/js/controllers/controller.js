angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {

    /* Unique identifier for current user */
    $scope.jobOther;
    $scope.detailedInfo = {
      email:"",
      name:{
        value:"",
        score:0
      },
      ethnicity:{
        value:"",
        score:0
      },
      sexualOrientation:{
        value:"",
        score:0
      },
      gender:{
        value:"",
        score:0
      },
      industry:{
        value:"",
        score:0
      },
      bio:"",
      isMentor:"",
      mentorStrength1:{
        value:"",
        score:0
      },
      mentorStrength2:{
        value:"",
        score:0
      },
      mentorStrength3:{
        value:"",
        score:0
      },
      isMentee:"",
      menteeGoal1:{
        value:"",
        score:0
      },
      menteeGoal2:{
        value:"",
        score:0
      },
      menteeGoal3:{
        value:"",
        score:0
      },
      language:{
        value:"",
        score:0
      },
      location:{
        country:"",
        state:"",
        city:"",
        score:0
      }


    };

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



    $scope.updateListing = function() {
      console.log($scope.detailedInfo);
      var id = 0;


      /* we will want to update by email once thats in the schema
      just change the value.name to value.email*/
      angular.forEach($scope.listings, function(value, key){
        if(value.email == $scope.detailedInfo.email)
          id = value._id;
        });
        console.log(id);


      /* Create new date via update */
      Listings.create($scope.detailedInfo)
              .then(function(response) {
                console.log(response);
                //location.reload();
                /* Delete old data */
                Listings.delete(id)
                        .then(function(response) {
                          location.reload();
                        }, function(error) {
                          $scope.error = 'Unable to delete listing!' + error;
                        });
              }, function(error) {
                $scope.error = 'Unable to add lyour person isting!' + error;
              });



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
      $scope.detailedInfo.email = emailParam; //Set currentUserEmail scope variable

      console.log("We are in angular login function now!");
      console.log("Email passed in: " + emailParam);

      var emailAlreadyInDB = false;


      angular.forEach($scope.listings, function(value,key){
        if(value.email == emailParam){

          emailAlreadyInDB = true;
          console.log("Found email in database!");
        }
      })

      //If email is already in database, show user information
      if(emailAlreadyInDB){
        console.log("Email already in DB");

        //*****TODO******


      }else{  //ELSE, create new user
        console.log("Email not found in DB. Adding listing now...");
        var listing = {
          email: emailParam //Initialize email attribute
                 //All other attributes are left undefined
        };
        $scope.addListing($scope.detailedInfo);
      }
    }


    $scope.sendEmail = function(emailSendTo){

        var linkto = 'mailto:' + emailSendTo + '?subject=[MentorMatch] Feedback&body=Please provide feedback to your mentor/mentee. ' +
            '%0A My mentor/mentee excelled at:%0A%0A%0AWhat did you gain from this experience?%0A%0A%0A ' +
            'What could your mentor/mentee do to improve your experience next time?%0A%0A%0A' +
            'Thank you for using Mentor Match!';
        window.open(linkto);
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
                //var nameuser = googleUser.getBasicProfile().getName();  //Retrieve current user email
                angular.element($('#MainWrap')).scope().login(email); //Pass email into angular function (login)


            }, function (error)
            {
                alert(JSON.stringify(error, undefined, 2));
            });
}

function validForm() {
  var mtor, mtee, strn, goal;

  mtor = document.getElementById("mentorCheck").value;
  mtee = document.getElementById("menteeCheck").value;

  strn = document.getElementById("mentorStrength1check").value;
  goal = document.getElementById("menteeGoal1check").value;

   if (mtor == "no" && mtee == "no") {
     text = "Input not valid";
     document.getElementById("submit").disabled = true;
     document.getElementById("submitErr").style.display = "block";
     document.getElementById("submitErr2").style.display = "none";
   }
   else if(strn == "Strength1empty" || goal == "Goal1empty") {
     document.getElementById("submit").disabled = true;
     document.getElementById("submitErr2").style.display = "block";
     document.getElementById("submitErr").style.display = "none";
   }
   else {
     document.getElementById("submit").disabled = false;
     document.getElementById("submitErr").style.display = "none";
     document.getElementById("submitErr2").style.display = "none";
   }
  console.log(text);

}

startApp();
