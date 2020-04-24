//----------- FUNCTION THAT IMPLEMENTS THE CHARACTER COUNTER TO DISPLAY THE USERS REMAINING CHARACTERS ----------
$(document).ready(function() {
    
  $("textarea#tweet-text").keyup(function(event) {
    const MAX_LENGTH = 140;
    const currentLength = this.value.length;
    const counter = $(this).siblings('output.counter');
        
    if (currentLength > MAX_LENGTH) {
      counter.addClass("red");
       
    } else {
      counter.removeClass("red");
    }
    counter.val(MAX_LENGTH - currentLength);
  });
});