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
      console.log("detailedInfo.email: " + $scope.detailedInfo.email);
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

      $scope.populateMatches(); //Populate matches scope variables
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


      $scope.populateMatches(); //Populate matches scope variables
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
  
  
  //Matching Algorithm Code

    $scope.calculateScore = function(mentor, mentee) {
      var score = 0;

      console.log("Calculating score...");

      //Quick filter based on boolean attributes
      if(mentor.isMentor == "no" || mentee.isMentee == "no" ||
        mentor.isMentor == "" || mentee.isMentee == "")  //If either user doesn't fit the role being tested for in this calculation
        return 0;

      //Location score
      var locationScore = 0;
      if(mentor.location.city.toLowerCase() == mentee.location.city.toLowerCase()){ //Same city
        locationScore = 1;
      }else if(mentor.location.state.toLowerCase() == mentee.location.state.toLowerCase()){ //Same state
        locationScore = 0.25;
      }else if(mentor.location.country.toLowerCase() == mentee.location.country.toLowerCase()){ //Same country
        locationScore = 0.05;
      }else{  //Not in same country
        locationScore = 0;
      }
      
      score += locationScore*(mentor.location.score + mentee.location.score)/1; //Use mentor and mentee attribute weights to update score

      //Language score
      if(mentor.language.value.toLowerCase() == mentee.language.value.toLowerCase())
        score += (mentor.language.score + mentee.language.score)/2; //Use mentor and mentee attribute weights to update score

      //Industry score
      if(mentor.industry.value.toLowerCase() == mentee.industry.value.toLowerCase())
        score += (mentor.industry.score + mentee.industry.score)/2; //Use mentor and mentee attribute weights to update score

      //Gender score
      if(mentor.gender.value.toLowerCase() == mentee.gender.value.toLowerCase())
        score += (mentor.gender.score + mentee.gender.score)/2; //Use mentor and mentee attribute weights to update score

      //Sexual Orientation score
      if(mentor.sexualOrientation.value.toLowerCase() == mentee.sexualOrientation.value.toLowerCase())
        score += (mentor.sexualOrientation.score + mentee.sexualOrientation.score)/2; //Use mentor and mentee attribute weights to update score

      //Ethnicity score
      if(mentor.ethnicity.value.toLowerCase() == mentee.ethnicity.value.toLowerCase())
        score += (mentor.ethnicity.score + mentee.ethnicity.score)/2; //Use mentor and mentee attribute weights to update score

      //Mentor strengths and mentee goals score
      var mentorStrengths = new Array();
      var menteeGoals = new Array();

      mentorStrengths.push(mentor.mentorStrength1);
      mentorStrengths.push(mentor.mentorStrength2);
      mentorStrengths.push(mentor.mentorStrength3);

      menteeGoals.push(mentee.menteeGoal1);
      menteeGoals.push(mentee.menteeGoal2);
      menteeGoals.push(mentee.menteeGoal3);

      var numOptions = 3; //Adjustable. Preset to 3 for our implementation
      for(var i=0; i<numOptions; i++){
        for(var j=0; j<numOptions; j++){
          if(mentorStrengths[i] == menteeGoals[j])  //Strength and goal match
            score += (mentorStrengths[i].score + menteeGoals[j].score)/2; //Use mentor and mentee attribute weights to update score
        }
      }


      return score;
    };


    $scope.populateMatches = function() {

      //Do some check to make sure user is logged in first?



      console.log("Populating matches...");

      var mentorMatchAndScoreArr = new Array();
      var menteeMatchAndScoreArr = new Array();
      var mentorMatchScore, menteeMatchScore;

      angular.forEach($scope.listings, function (value, key){
        if(value.email != $scope.detailedInfo.email){ //If profile in DB is not that of current user

          //Calculate match scores
          mentorMatchScore = $scope.calculateScore(value, $scope.detailedInfo); //Param 1: mentor //Param 2: mentee
          menteeMatchScore = $scope.calculateScore($scope.detailedInfo, value); //Param 1: mentor //Param 2: mentee

          var mentorMatchEntry = {
            profile: value,
            score: mentorMatchScore
          };

          var menteeMatchEntry = {
            profile: value,
            score: menteeMatchScore
          };
          
          console.log("MentorMatchEntry:");
          console.log(mentorMatchEntry);

          mentorMatchAndScoreArr.push(mentorMatchEntry);
          menteeMatchAndScoreArr.push(menteeMatchEntry);

          console.log("Done pushing");
        }
      });

      console.log("sorting...");
      //Sort lists of matches by score (descending)
      mentorMatchAndScoreArr.sort(function(a,b){return b.score - a.score});
      menteeMatchAndScoreArr.sort(function(a,b){return b.score - a.score});

      console.log("saving to scope variables...");
      //Save sorted lists of matches to scope variables
      $scope.mentorMatches = mentorMatchAndScoreArr;
      $scope.menteeMatches = menteeMatchAndScoreArr;

      console.log("$scope.mentorMatches:");
      console.log($scope.mentorMatches);
    };

  }
]);


window.onload = function() {
  angular.element($('#MainWrap')).scope().populateMatches();

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
};

startApp();
