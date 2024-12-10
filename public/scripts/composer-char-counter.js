$(document).ready(function() {
  console.log("composer-char-counter.js is loaded!");

  $(".new-tweet #tweet-text").on("input", function() {
    
    const $textarea = $(this); 
    const maxLength = 140; 
    const textLength = $textarea.val().length; 
    const remaining = maxLength - textLength; 

    console.log(remaining); 
  
    const $counter = $textarea.closest("form").find(".counter");

    $counter.text(remaining);

    
    if (remaining < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }
  });
});
