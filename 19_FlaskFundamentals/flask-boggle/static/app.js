$guessedWord = $("#guess-word-input").get();
$gameForm = $("#game-form").get();
$submitBtn = $("#submit-btn").get();
$points = $("#points").get();
$timeLeft = $("#time-left").get();
$highScore = $("#high-score").get();
$inputDiv = $("#input-div").get();
$guessesList = $("#guesses-list").get();

// Handle guessed word on submit
async function handleWordSubmit(evt) {
  evt.preventDefault();
  const res = await axios({
    method: "POST",
    url: `/submit-word/${$($guessedWord).val()}`,
  });
  const results = res.data;
  submissionResponse(results, $guessedWord);
  $($guessedWord).val("");
}

// Update score & guess list if valid word, or alert invalid response
function submissionResponse(results, word) {
  if (results["result"] === "ok") {
    $($points).text(results["points"]);
    appendGuessList(word);
  } else {
    alert(results["result"]);
  }
}

function appendGuessList(word) {
  $($guessesList).append(
    `<li class="text-light" style="font-weight: 600;">${$(word)
      .val()
      .toUpperCase()}</li>`
  );
}

// Timer for game
let timer;
let count = 60;
$($timeLeft).text(count);

timer = setTimeout(updateTimer, 1000);

async function updateTimer() {
  if (count > 0) {
    $($timeLeft).text(--count);
    timer = setTimeout(updateTimer, 1000);
  } else if (count == 0) {
    clearInterval(timer);
    makeRestartBtn();
    if ((await newHighScore()) === true) {
      alert(
        `Time's up! Congrats, you have the new high score of ${$(
          $points
        ).text()}!`
      );
      $($highScore).text($($points).text());
    } else {
      alert(`Time's up! Your score is ${$($points).text()}`);
    }
  }
}

// Check if user beat high-score
async function newHighScore() {
  const res = await axios({
    method: "POST",
    url: `/game-over/${$($points).text()}`,
  });
  if (res.data["new-high-score"] === "True") {
    return true;
  } else {
    return false;
  }
}

function makeRestartBtn() {
  $($gameForm).remove();
  const html =
    '<a href="/" type="submit" class="btn btn-lg btn-warning w-75" id="restart-btn" style="max-width:430px;">Play Again</a>';
  $($inputDiv).append(html);
}

$($submitBtn).on("click", handleWordSubmit);
