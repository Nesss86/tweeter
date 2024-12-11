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

  // Function to create a tweet element (no changes needed if already implemented)
  const createTweetElement = function (tweet) {
    return $(`
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
    `);
  };

  // Escape function for XSS prevention
  const escape = function (str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Call loadTweets on page load to fetch and display tweets
  loadTweets();
});
