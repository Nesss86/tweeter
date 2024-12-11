/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense, donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  // Function to create a tweet element
  const createTweetElement = function (tweet) {
    const escape = function (str) {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="tweet-user">
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
          <div class="tweet-actions">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  // Function to apply timeago formatting to existing tweets
  const applyTimeagoToExistingTweets = function () {
    $(".timestamp").each(function () {
      const time = $(this).attr("data-time"); // Retrieve timestamp from data attribute
      if (time) {
        $(this).text(timeago.format(time)); // Format and update the timestamp
      }
    });
  };

  // Function to render tweets without clearing the container
  const renderTweets = function (tweets) {
    const $tweetContainer = $("#tweets-container");

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet); // Append to the container without clearing
    }
  };

  // Ensure all hardcoded tweets have data-time for timestamps
  const prepareHardcodedTimestamps = function () {
    $("#tweets-container .timestamp").each(function () {
      const staticTime = $(this).text(); // Assume this contains a static value
      $(this).attr("data-time", staticTime || Date.now()); // Add a data-time attribute
    });
  };

  // Prepare and apply timeago to hardcoded tweets
  prepareHardcodedTimestamps();
  applyTimeagoToExistingTweets();

  // Render the test data alongside existing tweets
  renderTweets(data);
});


