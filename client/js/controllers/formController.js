// https://www.solodev.com/blog/web-design/how-to-hide-form-fields-based-upon-user-selection.stml

$("#mentorCheck").change(function() {
    if ($(this).val() == "yes") {
      $('#mentorStrength').show();
      
    } else {
      $('#mentorStrength').hide();
      
    }
  });
  $("#mentorCheck").trigger("change");


  $("#mentorStrength1check").change(function() {
    if ($(this).val() == "Strength1empty") {
      $('#mentorStrength2').hide();
      
    } else {
      $('#mentorStrength2').show();
      
    }
  });
  $("#mentorStrength1check").trigger("change");