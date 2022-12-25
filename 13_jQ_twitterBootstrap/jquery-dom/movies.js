// Build an application that uses jQuery to do the following:

// When the form is submitted, capture the values for each of the inputs and append them to the DOM along with a button to remove each title and rating from the DOM.
// When the button to remove is clicked, remove each title and rating from the DOM.

movieList = [
  { id: 0, title: "Titanic", rating: 7 },
  { id: 1, title: "Marley and Me", rating: 3 },
  { id: 2, title: "Sing", rating: 8 },
  { id: 3, title: "Blues Brothers", rating: 6 },
  { id: 4, title: "Avatar", rating: 10 },
  { id: 5, title: "Princess Diaries", rating: 9 },
];

movieCount = 5;

// Receives input values from movie form submission
$("form").on("submit", function (event) {
  event.preventDefault();
  let title = $("#title-input").val();
  let rating = $("#rating-input").val();
  console.log(title, rating);
  if (title.length >= 2 && rating !== "") {
    movieCount++;
    movieList.push({ title: title, rating: rating, id: movieCount });
    createNewMovie(title, rating, movieCount);
  } else {
    alert("Movie must have a rating and contain more than 2 characters!");
  }
  $("#title-input").val("");
  $("#rating-input").val("");
});

// Removes movie from list if checkbox clicked
$("tbody").on("change", "input[type=checkbox]", function (event) {
  let movie = $(this).parent().prev().prev().text();
  for (let i = 0; i < movieList.length; i++) {
    if (movie.includes(movieList[i].title)) {
      movieList.splice(i, 1);
    }
  }
  $(this).parent().parent().remove();
});

// Creates HTML for new movie
const createNewMovie = function (title, rating, movieCount) {
  let newHTML = `
  <tr id="${movieCount}">
    <td class="title">${title}</td>
    <td class="rating">${rating}/10</td>
    <td class="remove"><input type="checkbox" class="remove" /></td>
  </tr>`;
  $("tbody").append(newHTML);
};

// Sort by movie title
const sortByTitle = function (e) {
  $("tbody").children().remove();
  const titlesArray = [];
  for (movie of movieList) {
    titlesArray.push(movie.title);
  }
  titlesArray.sort();

  // Create new HTML Elements of sorted HTML: compare titlesArray and movieList
  for (let title of titlesArray) {
    for (let i = 0; i < movieList.length; i++) {
      if (title.includes(movieList[i].title)) {
        createNewMovie(
          movieList[i].title,
          movieList[i].rating,
          movieList[i].id
        );
      }
    }
  }
};

// Sorts by movie rating
const sortByRating = function (e) {
  $("tbody").children().remove();
  let ratingFilter = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  for (let val of ratingFilter) {
    for (let i = 0; i < movieList.length; i++) {
      if (movieList[i].rating == val) {
        createNewMovie(
          movieList[i].title,
          movieList[i].rating,
          movieList[i].id
        );
      }
    }
  }
};

// Event Listeners for sort buttons
$("form").on("click", "#title-sort", sortByTitle);
$("form").on("click", "#rating-sort", sortByRating);
