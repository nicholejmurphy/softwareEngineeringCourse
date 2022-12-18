// FOR EACH EXERCISE

function forEach (arr, callback){
    for(let i=0; i < arr.length; i++){
        callback(arr[i], i, arr);
    }
}

// MAP EXERCISE

function myMap(arr, callback){
    const mapArr = [];
    for(let i=0; i <arr.length; i++){
        mapArr.push(callback(arr[i]));
    }
    return mapArr;
}

// FILTER EXERCISE

function myFilter(arr, callback) {
    const filteredArr = [];
    for (let i = 0; i < arr.length; i++){
        if (callback(arr[i], i, arr)){
            filteredArr.push(arr[i]);
        }
    } 
    return filteredArr;
}

// SOME EXERCISE

function mySome(arr, callback) {
    for (let i = 0; i < arr.length; i++){
        if (callback(arr[i], i, arr)) return true;
    }
    return false;
}

// EVERY EXERCISE

function myEvery(arr, callback) {
    for (let i = 0; i < arr.length; i++){
        if (!callback(arr[i], i, arr)) return false;
    } 
    return true;
}

// FIND EXERCISE

function myFind(arr, callback){
    for (let i=0; i < arr.length; i++){
        if (callback(arr[i], i, arr) === true) return arr[i];
    }
}

// FIND INDEX EXERCISE

function myFindIndex(arr, callback){
    for (let i=0; i < arr.length; i++){
        if (callback(arr[i], i, arr) === true) return i;
    }
    return -1;
}