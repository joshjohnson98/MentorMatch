angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings)
  {

    /* Unique identifier for current user */
    $scope.jobOther;
    $scope.detailedInfo = {
      email: "",
      name: {
        value: "",
        score: 0
      },
      ethnicity: {
        value: "",
        score: 0
      },
      sexualOrientation: {
        value: "",
        score: 0
      },
      gender: {
        value: "",
        score: 0
      },
      industry: {
        value: "",
        score: 0
      },
      bio: "",
      isMentor: "",
      mentorStrength1: {
        value: "",
        score: 0
      },
      mentorStrength2: {
        value: "",
        score: 0
      },
      mentorStrength3: {
        value: "",
        score: 0
      },
      isMentee: "",
      menteeGoal1: {
        value: "",
        score: 0
      },
      menteeGoal2: {
        value: "",
        score: 0
      },
      menteeGoal3: {
        value: "",
        score: 0
      },
      language: {
        value: "",
        score: 0
      },
      location: {
        country: "",
        state: "",
        city: "",
        score: 0
      }


    };

    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function (response)
    {
      $scope.listings = response.data;
    }, function (error)
    {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.addListing = function (listing)
    {
      /* Save the article using the Listings factory */
      Listings.create(listing)
          .then(function (response)
          {
            location.reload();
          }, function (error)
          {
            $scope.error = 'Unable to add listing!' + error;
          });
      $scope.listings.push(listing);
    };


    $scope.updateListing = function ()
    {
      console.log($scope.detailedInfo);
      var id = 0;

      angular.forEach($scope.listings, function (value, key)
      {
        if (value.email == $scope.detailedInfo.email)
          id = value._id;
      });
      console.log(id);


      /* Create new date via update */
      Listings.create($scope.detailedInfo)
          .then(function (response)
          {
            console.log(response);
            //location.reload();
            /* Delete old data */
            Listings.delete(id)
                .then(function (response)
                {
                  location.reload();
                }, function (error)
                {
                  $scope.error = 'Unable to delete listing!' + error;
                });
          }, function (error)
          {
            $scope.error = 'Unable to add person listing!' + error;
          });
    };


    $scope.deleteListing = function (id)
    {
      Listings.delete(id)
          .then(function (response)
          {
            location.reload();
          }, function (error)
          {
            $scope.error = 'Unable to delete listing!' + error;
          });
    };

    $scope.login = function (emailParam, nameParam)
    {
      $scope.detailedInfo.email = emailParam; //Set currentUserEmail scope variable
      $scope.detailedInfo.name.value = nameParam;


      localStorage.setItem('useremail', emailParam);
      localStorage['useremail'] = emailParam;


      console.log("We are in angular login function now!");

      console.log("Email passed in: " + emailParam);
      console.log("Name passed in: " + nameParam);

      var emailAlreadyInDB = false;


      angular.forEach($scope.listings, function (value, key)
      {
        if (value.email == emailParam)
        {

          emailAlreadyInDB = true;
          console.log("User found. Email already in DB");
          //If email is already in database, show user information in profile form
          $scope.detailedInfo.ethnicity.value = value.ethnicity.value;
          $scope.detailedInfo.ethnicity.score = value.ethnicity.score;
          $scope.detailedInfo.sexualOrientation.value = value.sexualOrientation.value;
          $scope.detailedInfo.sexualOrientation.value = value.sexualOrientation.score;
          $scope.detailedInfo.gender.value = value.gender.value;
          $scope.detailedInfo.gender.score = value.gender.score;
          $scope.detailedInfo.industry.value = value.industry.value;
          $scope.detailedInfo.industry.score = value.industry.score;
          $scope.detailedInfo.bio = value.bio;
          $scope.detailedInfo.isMentor = value.isMentor;
          $scope.detailedInfo.isMentee = value.isMentee;
          $scope.detailedInfo.mentorStrength1.value = value.mentorStrength1.value;
          $scope.detailedInfo.mentorStrength1.score = value.mentorStrength1.score;
          $scope.detailedInfo.mentorStrength2.value = value.mentorStrength2.value;
          $scope.detailedInfo.mentorStrength2.score = value.mentorStrength2.score;
          $scope.detailedInfo.mentorStrength3.value = value.mentorStrength3.value;
          $scope.detailedInfo.mentorStrength3.score = value.mentorStrength3.score;
          $scope.detailedInfo.menteeGoal1.value = value.menteeGoal1.value;
          $scope.detailedInfo.menteeGoal1.score = value.menteeGoal1.score;
          $scope.detailedInfo.menteeGoal2.value = value.menteeGoal2.value;
          $scope.detailedInfo.menteeGoal2.score = value.menteeGoal2.score;
          $scope.detailedInfo.menteeGoal3.value = value.menteeGoal3.value;
          $scope.detailedInfo.menteeGoal3.score = value.menteeGoal3.score;
          $scope.detailedInfo.location.score = value.location.score;
          $scope.detailedInfo.location.city = value.location.city;
          $scope.detailedInfo.location.state = value.location.state;
          $scope.detailedInfo.location.country = value.location.country;
          $scope.detailedInfo.language.value = value.language.value;
        }
      })


      if (!emailAlreadyInDB)
      {
        console.log("Email not found in DB. Adding listing now...");
        var newListing = {
          email: emailParam,
          name: {
            value: nameParam,
            score: 0
          },
          ethnicity: {
            value: "",
            score: 0
          },
          sexualOrientation: {
            value: "",
            score: 0
          },
          gender: {
            value: "",
            score: 0
          },
          industry: {
            value: "",
            score: 0
          },
          bio: "",
          isMentor: "",
          mentorStrength1: {
            value: "",
            score: 0
          },
          mentorStrength2: {
            value: "",
            score: 0
          },
          mentorStrength3: {
            value: "",
            score: 0
          },
          isMentee: "",
          menteeGoal1: {
            value: "",
            score: 0
          },
          menteeGoal2: {
            value: "",
            score: 0
          },
          menteeGoal3: {
            value: "",
            score: 0
          },
          language: {
            value: "",
            score: 0
          },
          location: {
            country: "",
            state: "",
            city: "",
            score: 0
          }
        }
        $scope.addListing(newListing);
      }
    }


    $scope.sendEmail = function ()
    {
      // var linkto = "mailto:"
      //             +email
      //             + "&subject=Feedback!"
      //             + "&body=Mentor"
      // ;
      var linkto = 'mailto:' + email + '?subject=[MentorMatch] ' + nameUser +
          +'&body=Thank you for choosing MentorMatch!\nHere';

      $scope.sendEmail = function (emailSendTo)
      {

        var linkto = 'mailto:' + emailSendTo + '?subject=[MentorMatch]&body=Mentor/Mentee ' +
            'excelled at:%0A%0A%0AThere was room for improvement with:';
        window.open(linkto);
      }
    }
  }
]);


window.onload = function() {

  console.log("local storage has: " + localStorage.getItem('useremail'));

  //Assign local storage email content to scope variable
  angular.element($('#MainWrap')).scope().detailedInfo.email = localStorage.getItem('useremail');
};



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
                var email = googleUser.getBasicProfile().getEmail();  //Retrieve current user email
                var name = googleUser.getBasicProfile().getName();  //Retrieve current user email
                angular.element($('#MainWrap')).scope().login(email, name); //Pass email into angular function (login)
                

            }, function (error)
            {
                alert(JSON.stringify(error, undefined, 2));
            });
}

startApp();