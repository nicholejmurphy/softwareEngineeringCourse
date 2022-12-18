// Write the code necessary to do the following:


// [1] Select the section with an id of container without using querySelector.
const container = document.getElementById("container");

// [2] Select the section with an id of container using querySelector.
const section = document.querySelector("#container");

// [3] Select all of the list items with a class of “second”.
const items = document.getElementsByClassName("second");

// [4] Select a list item with a class of third, but only the list item inside of the ol tag.
const olThird = document.querySelector("ol");
olThird.lastElementChild;

// [5] Give the section with an id of container the text “Hello!”.
const newText = document.querySelector("#container");
newText.innerText = "Hello!";

// [6] Add the class main to the div with a class of footer.
const secondDiv = document.querySelector(".footer");
secondDiv.classList.add("main");

// [7] Remove the class main on the div with a class of footer.
secondDiv.classList.remove("main");

// [8] Create a new li element.
const newLi = document.createElement("li");

// [9] Give the li the text “four”.
newLi.innerText = "four";

// [10] Append the li to the ul element.
const ul = document.querySelector("ul");
ul.append(newLi);

// [11] Loop over all of the lis inside the ol tag and give them a background color of “green”.

const lis = document.querySelectorAll('ol li');
for (let li of lis){
    li.style.backgroundColor = "green";
}

// [12] Remove the div with a class of footer
secondDiv.remove();