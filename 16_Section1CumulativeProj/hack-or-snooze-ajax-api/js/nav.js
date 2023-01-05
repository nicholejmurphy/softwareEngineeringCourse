"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  hidePageComponents();
  putStoriesOnPage();
}

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $("i").show();
}

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  $(".main-nav-links").show();
  $loginForm.hide();
  $signupForm.hide();
  $navLogin.hide();
  $userStoriesCtr.hide();
  $favStoriesCtr.hide();
  $navLogOut.show();
  $navMainLinks.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick() {
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

function navFavoritesClick() {
  hidePageComponents();
  putStoriesOnFavorites();
  $favStoriesCtr.show();
  $favStoriesList.show();
}

function navMyStoriesClick() {
  hidePageComponents();
  putUpMyStories();
  $userStoriesCtr.show();
  $userStoriesList.show();
}

function openProfile() {
  hidePageComponents();

  $("#user-name").val(currentUser.name);
  $("#user-username").val(currentUser.username);
  $("#user-password").val("");
  $userProfile.show();
}

function enableProfile() {
  $("#user-name").val("enter a new name");
  document.getElementById("user-name").removeAttribute("disabled");
  document.getElementById("update-password").removeAttribute("disabled");
  $updateProfileBtn.hide();
  $submitProfileBtn.show();
}

function submitProfileUpdate() {
  const userName = $("#user-name").val(currentUser.name);
  const username = $("#user-username").val(currentUser.username);
  const password = $("#user-password").val("");
  currentUser.updateUser(currentUser, userName, password, username);
  console.log("sent");
  $updateProfileBtn.show();
  $submitProfileBtn.hide();
  $("#user-name").val(currentUser.name);
  document.getElementById("user-name").attr("disabled");
  document.getElementById("update-password").attr("disabled");
}

$body.on("click", "#nav-all", navAllStories);
$navLogin.on("click", navLoginClick);
$navSubmit.on("click", navSubmitClick);
$navFavorites.on("click", navFavoritesClick);
$navMyStories.on("click", navMyStoriesClick);
$navUserProfile.on("click", openProfile);
$updateProfileBtn.on("click", enableProfile);
$submitProfileBtn.on("click", enableProfile);
