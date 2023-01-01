console.log("Let's get this party started!");

const imgContainer = document.getElementById("image-container");
const search = document.getElementById("search-btn");
const remove = document.getElementById("remove-btn");
const form = document.getElementById("input-form");

async function createImg() {
  const searchTerm = document.getElementById("search-input");
  const response = await axios.get(
    `http://api.giphy.com/v1/gifs/search?q=${searchTerm.value}&api_key=QgaTB36YBUVvbMoZDsJvn6HzgQL9EM8L`
  );
  const num = Math.floor(Math.random() * 50);
  appendImg(response.data.data[num].images.original.url);
  searchTerm.value = "";
}

function appendImg(source) {
  const newImg = document.createElement("img");
  newImg.src = source;
  newImg.style = "width: 200px; height: 200px;";
  newImg.classList.add("m-1", "shadow");
  imgContainer.append(newImg);
}

function removeImgs() {
  imgContainer.innerHTML = "";
}

search.addEventListener("click", createImg);
remove.addEventListener("click", removeImgs);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  createImg();
});
