/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const $form = $("#tweet-form");

  $form.on("submit", function (event) {
    event.preventDefault();

    const serializedData = $(this).serialize();

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializedData,
    })

    .done(function (response) {
      console.log("Tweet submitted successfully:", response);

      loadTweets();
      $form[0].reset();
    })

    .fail(function (error) {
      console.error("Error submitting tweet:", error);
    })
  });
});