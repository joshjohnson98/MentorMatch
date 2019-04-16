angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings)
  {
    /* Unique identifier for current user */
    $scope.jobOther;
    $scope.menteeString = "mentee-";
    $scope.mentorString = "mentor-";
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
      localStorage.setItem('username', nameParam);
      localStorage['username'] = nameParam;

      var emailAlreadyInDB = false;


      angular.forEach($scope.listings, function(value,key){
        if(value.email == emailParam){

          emailAlreadyInDB = true;
          //If email is already in database, show user information in profile form
          $scope.detailedInfo.ethnicity.value = value.ethnicity.value;
          $scope.detailedInfo.ethnicity.score = value.ethnicity.score;
          $scope.detailedInfo.sexualOrientation.value = value.sexualOrientation.value;
          $scope.detailedInfo.sexualOrientation.score = value.sexualOrientation.score;
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


    $scope.sendEmail = function (emailSendTo)
    {

      var linkto = 'mailto:' + emailSendTo + '?subject=[MentorMatch] Feedback&body=Please provide feedback to your mentor/mentee. ' +
          '%0A My mentor/mentee excelled at:%0A%0A%0AWhat did you gain from this experience?%0A%0A%0A ' +
          'What could your mentor/mentee do to improve your experience next time?%0A%0A%0A' +
          'Thank you for using Mentor Match!';
      window.open(linkto);
    }
    
    $scope.displayProfile = function (index,listing,list){
      if(listing.industry.value==""||listing.industry.value=="--")
      {
        document.getElementById(list+""+index+"-job").style.display = "none";
      }
      else
      {
      document.getElementById(list+""+index+"-job").style.display = "table-row";
      }

      if(listing.ethnicity.value==""||listing.ethnicity.value=="--")
      {
        document.getElementById(list+""+index+"-ethnicity").style.display = "none";
      }
      else
      {
      document.getElementById(list+""+index+"-ethnicity").style.display = "table-row";
      }

      if(listing.sexualOrientation.value==""||listing.sexualOrientation.value=="--")
      {
        document.getElementById(list+""+index+"-sexualOrientation").style.display = "none";
      }
      else
      {
      document.getElementById(list+""+index+"-sexualOrientation").style.display = "table-row";
      }

      if(listing.gender.value==""||listing.gender.value=="--")
      {
        document.getElementById(list+""+index+"-gender").style.display = "none";
      }
      else
      {
      document.getElementById(list+""+index+"-gender").style.display = "table-row";
      }

      if(listing.bio==""||listing.bio.value=="--")
      {
        document.getElementById(list+""+index+"-bio").style.display = "none";
      }
      else
      {
      document.getElementById(list+""+index+"-bio").style.display = "table-row";
      }

      if(list==$scope.mentorString){
        if(listing.mentorStrength1.value==""||listing.mentorStrength1.value=="--")
        {
          document.getElementById(list+""+index+"-strength1").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-strength1").style.display = "table-row";
        }
        
        if(listing.mentorStrength2.value==""||listing.mentorStrength2.value=="--")
        {
          document.getElementById(list+""+index+"-strength2").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-strength2").style.display = "table-row";
        }

        if(listing.mentorStrength3.value==""||listing.mentorStrength3.value=="--")
        {
          document.getElementById(list+""+index+"-strength3").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-strength3").style.display = "table-row";
        }
      }
      //only displayed in potentail mentee
      if(list==$scope.menteeString){
        if(listing.menteeGoal1.value==""||listing.menteeGoal1.value=="--")
        {
          document.getElementById(list+""+index+"-goal1").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-goal1").style.display = "table-row";
        }
        if(listing.menteeGoal2.value==""||listing.menteeGoal2.value=="--")
        {
          document.getElementById(list+""+index+"-goal2").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-goal2").style.display = "table-row";
        }
        if(listing.menteeGoal3.value==""||listing.menteeGoal3.value=="--")
        {
          document.getElementById(list+""+index+"-goal3").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-goal3").style.display = "table-row";
        }
      }
      if(listing.location.city==""||listing.location.city=="--")
        {
          document.getElementById(list+""+index+"-city").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-city").style.display = "table-row";
        }
        


    }
  
  //Matching Algorithm Code

    $scope.calculateScore = function(mentor, mentee) {
      var score = 0;

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

          mentorMatchAndScoreArr.push(mentorMatchEntry);
          menteeMatchAndScoreArr.push(menteeMatchEntry);

        }
      });

      //Sort lists of matches by score (descending)
      mentorMatchAndScoreArr.sort(function(a,b){return b.score - a.score});
      menteeMatchAndScoreArr.sort(function(a,b){return b.score - a.score});

      //Save sorted lists of matches to scope variables
      $scope.mentorMatches = mentorMatchAndScoreArr;
      $scope.menteeMatches = menteeMatchAndScoreArr;
    };

  }
]);


window.onload = function() {
  angular.element($('#MainWrap')).scope().populateMatches();

  //Assign local storage email content to scope variable
 if(localStorage.getItem('useremail')!=null){
  angular.element($('#MainWrap')).scope().$apply( angular.element($('#MainWrap')).scope().login(localStorage.getItem('useremail'), localStorage.getItem('username'))); //Pass email into angular function (login)
 }
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
                angular.element($('#MainWrap')).scope().$apply( angular.element($('#MainWrap')).scope().login(email, name)); //Pass email into angular function (login)
                

            }, function (error)
            {
                alert(JSON.stringify(error, undefined, 2));
            });
};

function validForm() {
  var mtor, mtee, strn, goal;

  mtor = document.getElementById("mentorCheck").value;
  mtee = document.getElementById("menteeCheck").value;

  strn = document.getElementById("mentorStrength1check").value;
  goal = document.getElementById("menteeGoal1check").value;

   if (mtor == "no" && mtee == "no") {
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
}

startApp();
