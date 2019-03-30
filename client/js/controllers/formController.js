// https://www.solodev.com/blog/web-design/how-to-hide-form-fields-based-upon-user-selection.stml

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