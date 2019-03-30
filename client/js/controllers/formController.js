// https://www.solodev.com/blog/web-design/how-to-hide-form-fields-based-upon-user-selection.stml


$("#JobSelect").change(function() {
  if ($(this).val() == "other") {
    $('#jobOther').show();
    
  } else {
    $('#jobOther').hide();
    
  }
});
$("#JobSelect").trigger("change");


$("#mentorCheck").change(function() {
    if ($(this).val() == "yes") {
      $('#allStrength').show();
      
    } else {
      $('#allStrength').hide();

      
    }
  });
  $("#mentorCheck").trigger("change");


  $("#mentorStrength1check").change(function() {
    if ($(this).val() == "Strength1empty") {
      $('#strength2').hide();
      
    } else {
      $('#strength2').show();
    }
  });
  $("#mentorStrength1check").trigger("change");


  $("#mentorStrength2check").change(function() {
    if ($(this).val() == "Strength2empty") {
      $('#mentorStrength3').hide();
      
    } else {
      $('#mentorStrength3').show();
      
    }
  });
  $("#mentorStrength2check").trigger("change");

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
  });
  $("#menteeGoal1check").trigger("change");


  $("#menteeGoal2check").change(function() {
    if ($(this).val() == "Goal2empty") {
      $('#menteeGoal3').hide();
      
    } else {
      $('#menteeGoal3').show();
      
    }
  });
  $("#menteeGoal2check").trigger("change");