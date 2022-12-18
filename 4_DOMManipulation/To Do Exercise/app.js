
// ***************************************************
//                  PART ONE BELOW
// ***************************************************
// realized I incorrectly saved items to local storage, see part 2 below to view next attempt.

// const form = document.querySelector("form");
// const ul = document.querySelector("ul");
// const newItem = document.querySelector("input");

// // To add a new list item
// form.addEventListener("submit", function(e){
//     e.preventDefault(e);

//     // Create a new List Item
//     const newLi = document.createElement("li");
//     newLi.innerText = newItem.value;
//     const newCheckbox = (document.createElement("input"));
//     newCheckbox.setAttribute('type', 'checkbox');
//     newLi.append(newCheckbox);
//     console.log(newLi);
//     ul.prepend(newLi); 
//     form.reset();

//     // Save to localStorage
//     let item = newLi.innerText;
//     let condition = newLi.classList.contains('completed');
//     localStorage.setItem(item, condition);
// })

// // To update/remove list items
// ul.addEventListener('click', function(e){
//     e.preventDefault(e);

//     if (e.target.tagName === "INPUT"){

//         // Remove from localStorageO
//         localStorage.removeItem(e.target.parentElement.innerText);
//         console.log(e.target.parentElement.innerText);

//         // Remove from list
//         e.target.parentElement.remove();
//     }
//     else if (e.target.tagName === "LI"){

//         // Update CSS for li
//         e.target.classList.toggle('completed');

//         // Update localStorage
//         let item = e.target.innerText;
//         let condition = e.target.classList.contains('completed');
//         localStorage.setItem(item, condition);
//     }
// })

// ***************************************************
//                  PART TWO BELOW
// ***************************************************

// Successfully saved to localStorage. Need to loop through itetrable from local storage to update list items.
// What if something is added to the list, saved to localStorage, and the page is refereshed? Should that item no longer be in localStorage?

const form = document.querySelector("form");
const ul = document.querySelector("ul");
const textEntry = document.querySelector("input");

//check localStorage
const savedToDos = (JSON.parse(localStorage.getItem('task'))) || [];

// If savedToDos is not empty, update list
if (savedToDos.length !== 0){
    for (let i=0; i < savedToDos.length; i++){
        const oldToDo = document.createElement('li');
        oldToDo.innerText = savedToDos[i].task;
        if (savedToDos[i].isCompleted){
            oldToDo.classList.add('completed');
        }
        const newCheckbox = (document.createElement("input"));
        newCheckbox.setAttribute('type', 'checkbox');
        oldToDo.append(newCheckbox);
        ul.prepend(oldToDo);
    }
}

// To add a new list item
form.addEventListener("submit", function(e){
    e.preventDefault(e);

    // Create a new List Item
    const newLi = document.createElement("li");
    newLi.innerText = textEntry.value;
    const newCheckbox = (document.createElement("input"));
    newCheckbox.setAttribute('type', 'checkbox');
    newLi.append(newCheckbox);
    ul.prepend(newLi); 
    form.reset();

    // Save to localStorage
    let item = newLi.innerText;
    let condition = false;
    const saveToLocalStorage = {task: item, isCompleted: condition};
    savedToDos.push(saveToLocalStorage);
    localStorage.setItem('task', JSON.stringify(savedToDos));
})

// To update/remove list items
ul.addEventListener('click', function(e){
    e.preventDefault(e);

    // Remove from localStorage & list
    if (e.target.tagName === "INPUT"){
              
        // Loop over array and if list item text = text of element > delete
        for (let i=0; i < savedToDos.length; i++){
            // console.log(savedToDos[i].task);
            // console.log(e.target.parentElement.innerText);
            // console.log(savedToDos.indexOf(savedToDos[i]));

            if (savedToDos[i].task === e.target.parentElement.innerText){
                savedToDos.splice(savedToDos.indexOf(savedToDos[i]), 1);
                localStorage.setItem('task', JSON.stringify(savedToDos));
                // console.log(savedToDos);
            }
        }

        // Remove from list item
        e.target.parentElement.remove();
        // console.log(savedToDos)
    }

    else if (e.target.tagName === "LI"){

        // Update CSS for li

         // Loop over array and update isCompleted in index
         for (let i=0; i < savedToDos.length; i++){
            // console.log(savedToDos[i].task);
            // console.log(e.target.parentElement.innerText);
            // console.log(savedToDos.indexOf(savedToDos[i]));

            if (savedToDos[i].task === e.target.innerText){
                if (savedToDos[i].isCompleted === true){
                    savedToDos[i].isCompleted = false;
                }
                else if (savedToDos[i].isCompleted === false){
                    savedToDos[i].isCompleted = true;
                }
                // console.log(savedToDos);
                
                //update localStorage
                localStorage.setItem('task', JSON.stringify(savedToDos));
            }
        }
        e.target.classList.toggle('completed');

        // // Update localStorage
        // let item = e.target.innerText;
        // let condition = e.target.classList.contains('completed');
        // const saveToLocalStorage = {task: item, isCompleted: condition};
        // savedToDos.push(saveToLocalStorage);
        // localStorage.setItem('task', JSON.stringify(savedToDos));
    }
});

