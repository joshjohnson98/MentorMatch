angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings)
  {
    /* Unique identifier for current user */
    $scope.jobOtherFill="";
    $scope.strength1otherFill="";
    $scope.strength2otherFill="";
    $scope.strength3otherFill="";
    $scope.goal1otherFill="";
    $scope.goal2otherFill="";
    $scope.goal3otherFill="";
    $scope.genderOtherFill="";
    $scope.sexOtherFill="";
    $scope.ethnicityOtherFill="";
    $scope.langOtherFill="";

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
      $scope.checkOtherFill();
      /* Create new date via update */
      Listings.create($scope.detailedInfo)
          .then(function (response)
          {
            console.log(response);
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

    $scope.checkOtherFill = function(){
        if($scope.jobOtherFill!="" && $scope.detailedInfo.industry.value=="other"){
          $scope.detailedInfo.industry.value = $scope.jobOtherFill;
        }
        if($scope.sexOtherFill!="" && $scope.detailedInfo.sexualOrientation.value=="other"){
          $scope.detailedInfo.sexualOrientation.value = $scope.sexOtherFill;
        }
        if($scope.genderOtherFill!="" && $scope.detailedInfo.gender.value=="other"){
          $scope.detailedInfo.gender.value = $scope.genderOtherFill;
        }
        if($scope.strength1otherFill!="" && $scope.detailedInfo.mentorStrength1.value=="other"){
          $scope.detailedInfo.mentorStrength1.value = $scope.strength1otherFill;
        }
        if($scope.strength2otherFill!="" && $scope.detailedInfo.mentorStrength2.value=="other"){
          $scope.detailedInfo.mentorStrength2.value = $scope.strength2otherFill;
        }
        if($scope.strength3otherFill!="" && $scope.detailedInfo.mentorStrength3.value=="other"){
          $scope.detailedInfo.mentorStrength3.value = $scope.strength3otherFill;
        }
        if($scope.goal1otherFill!="" && $scope.detailedInfo.menteeGoal1.value=="other"){
          $scope.detailedInfo.menteeGoal1.value = $scope.goal1otherFill;
        }
        if($scope.goal2otherFill!="" && $scope.detailedInfo.menteeGoal2.value=="other"){
          $scope.detailedInfo.menteeGoal2.value = $scope.goal2otherFill;
        }
        if($scope.goal3otherFill!="" && $scope.detailedInfo.menteeGoal3.value=="other"){
          $scope.detailedInfo.menteeGoal3.value = $scope.goal3otherFill;
        }
        if($scope.langOtherFill!="" && $scope.detailedInfo.language.value=="other"){
          $scope.detailedInfo.language.value = $scope.langOtherFill;
        }
        if($scope.ethnicityOtherFill!="" && $scope.detailedInfo.ethnicity.value=="other"){
          $scope.detailedInfo.ethnicity.value = $scope.ethnicityOtherFill;
        }


    };

    $scope.fillOtherFill = function(){
      
      
      
      
      
      var exists =false;
        
      $('#JobSelect option').each(function(){
        if (this.value == $scope.detailedInfo.industry.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.industry.value != ""){
        $scope.jobOtherFill = $scope.detailedInfo.industry.value;
        $scope.detailedInfo.industry.value = "other";
      }
      exists = false;
      $('#SexSelect option').each(function(){
        if (this.value == $scope.detailedInfo.sexualOrientation.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.sexualOrientation.value != ""){
        $scope.sexOtherFill = $scope.detailedInfo.sexualOrientation.value;
        $scope.detailedInfo.sexualOrientation.value = "other";
      }
      exists = false;
      $('#GenderSelect option').each(function(){
        if (this.value == $scope.detailedInfo.gender.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.gender.value != ""){
        $scope.genderOtherFill = $scope.detailedInfo.gender.value;
        $scope.detailedInfo.gender.value = "other";
      }
      exists = false;

      $('#mentorStrength1check option').each(function(){
        if (this.value == $scope.detailedInfo.mentorStrength1.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.mentorStrength1.value != ""){
        $scope.strength1otherFill = $scope.detailedInfo.mentorStrength1.value;
        $scope.detailedInfo.mentorStrength1.value = "other";
      }
      exists = false;
      $('#mentorStrength2check option').each(function(){
        if (this.value == $scope.detailedInfo.mentorStrength2.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.mentorStrength2.value != ""){
        $scope.strength2otherFill = $scope.detailedInfo.mentorStrength2.value;
        $scope.detailedInfo.mentorStrength2.value = "other";
      }
      exists = false;
      $('#mentorStrength3check option').each(function(){
        if (this.value == $scope.detailedInfo.mentorStrength3.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.mentorStrength3.value != ""){
        $scope.strength3otherFill = $scope.detailedInfo.mentorStrength3.value;
        $scope.detailedInfo.mentorStrength3.value = "other";
      }
      exists = false;

      $('#menteeGoal1check option').each(function(){
        if (this.value == $scope.detailedInfo.menteeGoal1.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.menteeGoal1.value != ""){
        $scope.goal1otherFill = $scope.detailedInfo.menteeGoal1.value;
        $scope.detailedInfo.menteeGoal1.value = "other";
      }
      exists = false;
      $('#menteeGoal2check option').each(function(){
        if (this.value == $scope.detailedInfo.menteeGoal2.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.menteeGoal2.value != ""){
        $scope.goal2otherFill = $scope.detailedInfo.menteeGoal2.value;
        $scope.detailedInfo.menteeGoal2.value = "other";
      }
      exists = false;
      $('#menteeGoal3check option').each(function(){
        if (this.value == $scope.detailedInfo.menteeGoal3.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.menteeGoal3.value != ""){
        $scope.goal3otherFill = $scope.detailedInfo.menteeGoal3.value;
        $scope.detailedInfo.menteeGoal3.value = "other";
      }
      exists = false;
      $('#LanguageSelect option').each(function(){
        if (this.value == $scope.detailedInfo.language.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.language.value != ""){
        $scope.langOtherFill = $scope.detailedInfo.language.value;
        $scope.detailedInfo.language.value = "other";
      }
      exists = false;
      $('#EthnicitySelect option').each(function(){
        if (this.value == $scope.detailedInfo.ethnicity.value) {
            exists = true;
            return false;
        }
      });
      if(!exists && $scope.detailedInfo.ethnicity.value != ""){
        $scope.ethnicityOtherFill = $scope.detailedInfo.ethnicity.value;
        $scope.detailedInfo.ethnicity.value = "other";
      }
      
    }

    $scope.logout = function()
    {
      localStorage.clear();
      window.location.href = "index.html";
    }

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

          $scope.fillOtherFill();
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


    $scope.sendEmail = function (emailSendTo){
      var linkto = 'mailto:' + emailSendTo + '?subject=[MentorMatch] Feedback&body=Please provide feedback to your mentor/mentee. ' +
          '%0A My mentor/mentee excelled at:%0A%0A%0AWhat did you gain from this experience?%0A%0A%0A ' +
          'What could your mentor/mentee do to improve your experience next time?%0A%0A%0A' +
          'Thank you for using Mentor Match!';
      window.open(linkto);
    }

    $scope.contactEmail = function (email, yourName, theirName) {
      var linkto = 'mailto:' + email + '?subject=[MentorMatch] ' + yourName + ' would like to connect&body=Hello ' + theirName +
          ',%0AI saw your profile on Mentor Match and would like to connect! %0A%0ABest,%0A' + yourName;
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
        if(listing.language.value==""||listing.language.value=="--")
        {
          document.getElementById(list+""+index+"-language").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-language").style.display = "table-row";
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
        if(listing.language.value==""||listing.language.value=="--")
        {
          document.getElementById(list+""+index+"-language").style.display = "none";
        }
        else
        {
        document.getElementById(list+""+index+"-language").style.display = "table-row";
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
      if(mentor.location.city == "" && mentor.location.state == "" && mentor.location.country == "" &&
          mentee.location.city == "" && mentee.location.state == "" && mentee.location.country == ""){  //If info is not filled out for either user
        locationScore = 0;
      }else if(mentor.location.city.toLowerCase() == mentee.location.city.toLowerCase()){ //Same city
        locationScore = 1;
      }else if(mentor.location.state.toLowerCase() == mentee.location.state.toLowerCase()){ //Same state
        locationScore = 0.25;
      }else if(mentor.location.country.toLowerCase() == mentee.location.country.toLowerCase()){ //Same country
        locationScore = 0.05;
      }else{  //Not in same country
        locationScore = 0;
      }
      
      score += locationScore*$scope.detailedInfo.location.score; //Use current user attribute weight to update score

      //Language score
      if(mentor.language.value.toLowerCase() == mentee.language.value.toLowerCase()){
        score += $scope.detailedInfo.language.score; //Use current user attribute weight to update score
      }

      //Industry score
      if(mentor.industry.value.toLowerCase() == mentee.industry.value.toLowerCase()){
        score += $scope.detailedInfo.industry.score; //Use current user attribute weight to update score
      }

      //Gender score
      if(mentor.gender.value.toLowerCase() == mentee.gender.value.toLowerCase()){
        score += $scope.detailedInfo.gender.score; //Use current user attribute weight to update score
      }

      //Sexual Orientation score
      if(mentor.sexualOrientation.value.toLowerCase() == mentee.sexualOrientation.value.toLowerCase()){
        score += $scope.detailedInfo.sexualOrientation.score; //Use current user attribute weight to update score
      }

      //Ethnicity score
      if(mentor.ethnicity.value.toLowerCase() == mentee.ethnicity.value.toLowerCase()){
        score += $scope.detailedInfo.ethnicity.score; //Use current user attribute weight to update score
      }

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
          if(mentorStrengths[i].value == menteeGoals[j].value){  //Strength and goal match
            if(mentor.email == $scope.detailedInfo.email)
              score += mentorStrengths[i].score; //Use current user attribute weight to update score
            else if(mentee.email == $scope.detailedInfo.email)
              score += menteeGoals[j].score; //Use current user attribute weight to update score
          }
        }
      }

      var maxPossibleScore = 0;
      maxPossibleScore += $scope.detailedInfo.location.score;
      maxPossibleScore += $scope.detailedInfo.language.score;
      maxPossibleScore += $scope.detailedInfo.industry.score;
      maxPossibleScore += $scope.detailedInfo.gender.score;
      maxPossibleScore += $scope.detailedInfo.sexualOrientation.score;
      maxPossibleScore += $scope.detailedInfo.ethnicity.score;
      
      if(mentor.email == $scope.detailedInfo.email){  //Current user is the potential mentor
        maxPossibleScore += $scope.detailedInfo.mentorStrength1.score;
        maxPossibleScore += $scope.detailedInfo.mentorStrength2.score;
        maxPossibleScore += $scope.detailedInfo.mentorStrength3.score;
      }else if(mentee.email == $scope.detailedInfo.email){  //Current user is the potential mentee
        maxPossibleScore += $scope.detailedInfo.menteeGoal1.score;
        maxPossibleScore += $scope.detailedInfo.menteeGoal2.score;
        maxPossibleScore += $scope.detailedInfo.menteeGoal3.score;
      }

      return ((score/maxPossibleScore)*100).toFixed(0);
    };


    $scope.populateMatches = function() {

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

  angular.element($('#MainWrap')).scope().detailedInfo.email = localStorage.getItem('useremail');
  angular.element($('#MainWrap')).scope().detailedInfo.name.value = localStorage.getItem('username');
  setTimeout(function(){  //Half second delay to prevent duplicate entries
    if(localStorage.getItem('useremail')!=null){
      angular.element($('#MainWrap')).scope().$apply( angular.element($('#MainWrap')).scope().
      login(localStorage.getItem('useremail'), localStorage.getItem('username'))); //Pass email into angular function (login)
    }
    formCheck();
  }, 500);

};
function formCheck()//form Controller code
{
  // this will show the other fill in box if other is selected in dropdown
  $("#JobSelect").change(function() {
    if ($(this).val() == "other") {
      $('#jobOther').show();
  
    } else {
      $('#jobOther').hide();
  
    }
  });
  $("#JobSelect").trigger("change");
  
  // this will show the other fill in box if other is selected in dropdown
  $("#GenderSelect").change(function() {
    if ($(this).val() == "other") {
      $('#genderOther').show();
  
    } else {
      $('#genderOther').hide();
  
    }
  });
  $("#GenderSelect").trigger("change");
  // this will show the other fill in box if other is selected in dropdown
  $("#SexSelect").change(function() {
    if ($(this).val() == "other") {
      $('#sexOther').show();
  
    } else {
      $('#sexOther').hide();
  
    }
  });
  $("#SexSelect").trigger("change");
  
  
  
  $("#EthnicitySelect").change(function() {
    if ($(this).val() == "other") {
      $('#ethnicityOther').show();
  
    } else {
      $('#ethnicityOther').hide();
  
    }
  });
  $("#EthnicitySelect").trigger("change");
  
  
  
  $("#LanguageSelect").change(function() {
    if ($(this).val() == "other") {
      $('#langOther').show();
  
    } else {
      $('#langOther').hide();
  
    }
  });
  $("#LanguageSelect").trigger("change");
  
  
  // this section is showing mentor strength boxes if checked yes to mentor
  
  $("#mentorCheck").change(function() {
      if ($(this).val() == "yes") {
        $('#allStrength').show();
  
      } else {
        $('#allStrength').hide();
  
  
      }
    });
    $("#mentorCheck").trigger("change");
  
  //shows extra boxes only if the firsts are checked
    $("#mentorStrength1check").change(function() {
      if ($(this).val() == "Strength1empty") {
        $('#strength2').hide();
  
      } else {
        $('#strength2').show();
      }
  
      if ($(this).val() == "other") {
        $('#strength1other').show();
  
      } else {
        $('#strength1other').hide();
      }
  
    });
    $("#mentorStrength1check").trigger("change");
  
  
    $("#mentorStrength2check").change(function() {
      if ($(this).val() == "Strength2empty") {
        $('#mentorStrength3').hide();
  
      } else {
        $('#mentorStrength3').show();
  
      }
      if ($(this).val() == "other") {
        $('#strength2other').show();
  
      } else {
        $('#strength2other').hide();
      }
  
  
    });
    $("#mentorStrength2check").trigger("change");
  
  
  
    $("#mentorStrength3check").change(function() {
  
      if ($(this).val() == "other") {
        $('#strength3other').show();
  
      } else {
        $('#strength3other').hide();
      }
  
  
    });
    $("#mentorStrength3check").trigger("change");
  
  
  
    $("#menteeCheck").change(function() {
      if ($(this).val() == "yes") {
        $('#allGoal').show();
  
      } else {
        $('#allGoal').hide();
  
  
      }
    });
    $("#menteeCheck").trigger("change");
  
    $("#menteeGoal1check").change(function() {
      if ($(this).val() == "Goal1empty") {
        $('#goal2').hide();
  
      } else {
        $('#goal2').show();
      }
      if ($(this).val() == "other") {
        $('#goal1other').show();
  
      } else {
        $('#goal1other').hide();
      }
  
    });
    $("#menteeGoal1check").trigger("change");
  
  
    $("#menteeGoal2check").change(function() {
      if ($(this).val() == "Goal2empty") {
        $('#menteeGoal3').hide();
  
      } else {
        $('#menteeGoal3').show();
  
      }
      if ($(this).val() == "other") {
        $('#goal2other').show();
  
      } else {
        $('#goal2other').hide();
      }
  
  
    });
    $("#menteeGoal2check").trigger("change");
  
  
  
  
    $("#menteeGoal3check").change(function() {
  
      if ($(this).val() == "other") {
        $('#goal3other').show();
  
      } else {
        $('#goal3other').hide();
      }
  
  
    });
    $("#menteeGoal3check").trigger("change");
    }
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

