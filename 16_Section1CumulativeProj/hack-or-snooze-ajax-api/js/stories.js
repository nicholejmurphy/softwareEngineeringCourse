"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/** Returns the markup for the story */

function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span class="star"><i class="far fa-star"></i></span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  if (!currentUser) {
    $("i").hide();
  }

  $allStoriesList.show();
  $favStoriesList.hide();
  $userStoriesList.hide();
}

/* Create new story and add to page */
function createNewStory(evt) {
  evt.preventDefault();
  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();

  storyList.addStory(currentUser, { title, author, url });
  putStoriesOnPage();

  $("#story-author").val("");
  $("#story-title").val("");
  $("#story-url").val("");
}

function putStoriesOnFavorites() {
  $favStoriesList.empty();

  if (currentUser.favorites.length === 0) {
    $favStoriesList.append("<h5>No favorites yet</h5>");
  } else {
    // loop through all of user favorite stories and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      const $star = $story.closest("li").children("span").children("i");
      $star.removeClass("far").addClass("fas");
      $favStoriesList.append($story);
    }
  }

  $favStoriesList.show();
}

function toggleFavorite(evt) {
  const $target = $(evt.target);
  const $closestLi = $(evt.target).closest("li");
  const storyId = $($closestLi).attr("id");
  const story = storyList.stories.find((s) => s.storyId === storyId);

  if ($target.hasClass("far")) {
    // Selecting Favorite
    $($target).removeClass("far").addClass("fas");
    currentUser.addFavorite(story);
  } else {
    // Removing Favorite
    $($target).removeClass("fas").addClass("far");
    currentUser.removeFavorite(story);
    navFavoritesClick();
  }
}

function putUpMyStories() {
  $userStoriesList.empty();

  if (currentUser.ownStories.length === 0) {
    $userStoriesList.append("<h5>No submissions</h5>");
  } else {
    // loop through all of user favorite stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story);
      const $span = $story.closest("li").children("span");
      const $star = $span.children("i");
      $span.removeClass("star").addClass("remove");
      $star.removeClass("far fa-star").addClass("fas fa-solid fa-trash");
      $story.prepend('<span class="update"><i class="fas fa-pen"></i></span>');
      $userStoriesList.append($story);
    }
  }

  $userStoriesList.show();
}

function removeMyStory(evt) {
  const $target = $(evt.target);
  const $closestLi = $target.closest("li");
  const storyId = $closestLi.attr("id");
  const story = currentUser.ownStories.find((s) => s.storyId === storyId);

  storyList.deleteStory(currentUser, story);
  $closestLi.remove();
  putUpMyStories();
}

function updateMyStory(evt) {
  const $target = $(evt.target);
  const $closestLi = $target.closest("li");
  const $storyId = $closestLi.attr("id");
  const story = currentUser.ownStories.find((s) => s.storyId === $storyId);

  $("#update-storyId").val($storyId);
  $("#update-author").val(story.author);
  $("#update-title").val(story.title);
  $("#update-url").val(story.url);

  $updateForm.show();
}

function submitUpdatedStory() {
  $userStoriesList.hide();

  const $storyId = $("#update-storyId").val();
  const $author = $("#update-author").val();
  const $title = $("#update-title").val();
  const $url = $("#update-url").val();

  const story = currentUser.ownStories.find((s) => s.storyId === $storyId);
  story.author = $author;
  story.title = $title;
  story.url = $url;

  storyList.sendUpdatedStory(currentUser, story);

  putUpMyStories();
  $userStoriesList.show();
  $updateForm.hide();
}

// function highlight(evt) {
//   $(evt.target)
//     .removeClass("fas fa-solid fa-trash")
//     .addClass("fas fa-solid fa-trash-xmark");
//   console.log(evt.target);
// }

$submitForm.on("submit", createNewStory);
$storiesList.on("click", ".fa-star", toggleFavorite);
$storiesList.on("click", ".fa-trash", removeMyStory);
$storiesList.on("click", ".fa-pen", updateMyStory);
$updateForm.on("submit", submitUpdatedStory);
// $storiesList.on("mouseover", ".fa-trash", highlight);
