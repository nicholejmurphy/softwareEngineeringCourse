// TIMERS EXERCISE


// Initially, I wanted to write a loop and incorporte the timer afterwards. I checked out the solution and tried to break it down to understand it. Having a hard time explaining the "why" behind some of it. Need more practice!

// function countdown(num){
//     for (let i = num; i <= 0; i--){
//         if (i <= 0){
//             console.log("Done.");
//         }
//         else{
//             console.log(num)
//         }
//     }
// }

function countdown(num){
    console.log(num);
    let count = setInterval(function(){
        num--;
        if (num <= 0){
            console.log('Done!');
            clearInterval(count);
        }
        else {
            console.log(num);
        }
    }, 1000);
}

// I initially wrote this code with the counter++ nested in an else. I realized it the would not count the first try. So I just started the counter at 1 (there will always be at least one try). 

// I forgot that you can name a variable without assigning it a value. That got me in the beginnning. 

function randomGame(){
    let counter = 1;
    let num;
    let game = setInterval(function(){
        num = Math.random();
        if (num > 0.75){
            clearInterval(game);
            // console.log(num);
            console.log(`Game complete! It took ${counter} tries to pick a random number greater than 0.75. The winning number was ${num}.`)
        }
        else {
            counter++;
            // console.log(num);
        }
    }, 1000);
}
