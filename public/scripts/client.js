/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Function to fetch tweets from the server
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json", // Expect JSON data from the server
    })
      .done(function (tweets) {
        console.log("Fetched tweets:", tweets); // Debugging log
        renderTweets(tweets); // Render tweets dynamically
      })
      .fail(function (error) {
        console.error("Error fetching tweets:", error);
      });
  };

  // Function to render tweets
  const renderTweets = function (tweets) {
    const $tweetContainer = $("#tweets-container");
    $tweetContainer.empty(); // Clear the container before rendering
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet); // Prepend to show most recent tweets first
    }
  };

  // Function to create a tweet element
  const createTweetElement = function (tweet) {
    return $(
      `
      <article class="tweet">
        <header>
          <div class="user-info">
            <img class="tweet-avatar" src="${escape(tweet.user.avatars)}" alt="User Avatar">
            <span class="name">${escape(tweet.user.name)}</span>
          </div>
          <span class="handle">${escape(tweet.user.handle)}</span>
        </header>
        <div class="tweet-content">
          <p>${escape(tweet.content.text)}</p>
        </div>
        <footer>
          <span class="timestamp">${timeago.format(tweet.created_at)}</span>
          <div class="actions">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `
    );
  };

  // Escape function for XSS prevention
  const escape = function (str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Form submission handler with validation
  const $form = $("#tweet-form");
  $form.on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
  
    const $tweetText = $("#tweet-text");
    const tweetContent = $tweetText.val().trim(); // Get and trim tweet content
    const $errorMessage = $(".error-message"); // Select the error message element
  
    // Clear and hide the error message before validation
    $errorMessage.slideUp().find(".error-text").text("");
  
    // Validation checks
    if (!tweetContent) {
      $errorMessage
        .find(".error-text")
        .text("Error: Tweet content cannot be empty.");
      $errorMessage.slideDown(); // Show the error message with animation
      return; // Stop further execution
    }
  
    if (tweetContent.length > 140) {
      $errorMessage
        .find(".error-text")
        .text("Error: Tweet content exceeds the 140 character limit.");
      $errorMessage.slideDown(); // Show the error message with animation
      return; // Stop further execution
    }
  
    // Serialize form data and send to the server
    const serializedData = $(this).serialize();
  
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializedData,
    })
      .done(function () {
        loadTweets(); // Reload tweets dynamically
        $form[0].reset(); // Clear the form
        $(".counter").text(140); // Reset the character counter
        $errorMessage.slideUp(); // Hide the error message after successful submission
      })
      .fail(function (error) {
        console.error("Error submitting tweet:", error);
      });
  });
  

  // Character counter logic
  $(".new-tweet #tweet-text").on("input", function () {
    const $textarea = $(this);
    const maxLength = 140;
    const textLength = $textarea.val().length;
    const remaining = maxLength - textLength;

    const $counter = $textarea.closest("form").find(".counter");

    $counter.text(remaining);

    if (remaining < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }
  });

  // Call loadTweets on page load to fetch and display tweets
  loadTweets();
});
