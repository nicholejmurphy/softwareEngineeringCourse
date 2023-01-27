// An event listener to make sure stories are only created if all fields are completed properly.

const divContainer = document.getElementById("madLib-container");

divContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("generate-story-btn")) {
    generateBtn = e.target;
    $inputs = $(".prompt-input").get();
    for (let input of $inputs) {
      // Checks if 'yes_or_no' field is completed with only 'yes' or 'no'. Returns alert if invalid response.
      if (
        input.getAttribute("id") === "yes_or_no" &&
        input.value.toLowerCase() !== "yes" &&
        input.value.toLowerCase() !== "no"
      ) {
        e.preventDefault();
        console.log(typeof input.getAttribute("id"), input.getAttribute("id"));
        console.log(
          input.value.toLowerCase() === "yes" ||
            input.value.toLowerCase() === "no"
        );
        return alert("For your Yes or No input, you must type 'yes' or 'no'");
      }
    }

    // Checks that each field input value contains at least 2 characters. Returns alert if invalid response.
    if (input.value.length < 2) {
      e.preventDefault();
      return alert(
        `You must complete all input fields correctly to create a story! Check your ${input.parentElement.parentElement.firstElementChild.innerText} input. Make sure each word contains at least 2 characters!`
      );
    }
  }
});
