const dropZone = document.getElementById('drop-zone');
const imgURL = document.getElementById('url');
const topText = document.getElementById('top-text');
const bottomText = document.getElementById('bottom-text');
const createBtn = document.querySelector('button');
const form = document.querySelector('form');


// Generate Meme
createBtn.addEventListener('click', function(e){
    e.preventDefault();

    // Create new container element & add class
    const memeContainer = document.createElement('div');
    memeContainer.classList.add('meme-container');

    // Create image element & add image
    const img = document.createElement('img');
    img.setAttribute('src', imgURL.value);
    img.setAttribute('id', 'meme-image');

    // Create two Divs for top & bottom text
    let firstLine = document.createElement('div');
    firstLine.classList.add('meme-text');
    firstLine.classList.add('top');
    firstLine.textContent = topText.value;
    let secondLine = document.createElement('div');
    secondLine.classList.add('meme-text');
    secondLine.classList.add('bottom');
    secondLine.textContent = bottomText.value;

    // Create a div with id of overlay
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerText = 'DELETE'

    // Add text and image to memeContainer
    memeContainer.append(overlay, img, firstLine, secondLine)

    // Add meme to dropZone
    dropZone.append(memeContainer);

    // clear the form
    form.reset();
})

let mouseOn = false;
let mouseoff = true;

// To toggle delete-overlay
dropZone.addEventListener('mouseover', addDelete);
dropZone.addEventListener('mouseout', removeDelete);

function addDelete(e){
    if (e.target.parentElement.classList.contains('meme-container')){
        e.target.parentElement.firstElementChild.classList.add('delete');
    }
};

function removeDelete(e){
    if (e.target.parentElement.classList.contains('meme-container')){
        e.target.parentElement.firstElementChild.classList.remove('delete');
        console.log('we tried to delete')
    }
};

// To remove memes
dropZone.addEventListener('click', function(e){
    if (e.target.parentElement.classList.contains('meme-container')){
        e.target.parentElement.remove();
    }
    console.log(e.target.parentElement.classList.contains('meme-container'));
});


