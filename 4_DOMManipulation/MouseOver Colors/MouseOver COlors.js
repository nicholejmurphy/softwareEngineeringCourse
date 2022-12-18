// red value is associated to x axis
// y value is associated to y axis


document.addEventListener('mousemove', function(e){
    const r = Math.floor((e.pageX / window.innerWidth) * 255);
    const b = Math.floor((e.pageY / window.innerHeight) * 255);
    const color = `rgb(${r}, 0, ${b})`;
    document.body.style.backgroundColor = color;
    console.log(`rgb(${r}, 0, ${b})`);
})

// My attempt to generate a g color. Ratios are off.
// document.addEventListener('mousemove', function(e){
//     const r = Math.floor((e.pageX / window.innerWidth) * 255);
//     const a2 = Math.pow(window.innerWidth, 2); 
//     const b2 = Math.pow(window.innerHeight, 2);
//     const hypotenuse = Math.sqrt(a2 + b2);
//     const z = Math.sqrt(Math.pow(e.pageX, 2) + Math.pow(e.pageY, 2));
//     const g = Math.floor(z / hypotenuse * 255);
//     const b = Math.floor((e.pageY / window.innerHeight) * 255);
//     const color = `rgb(${r}, ${g}, ${b})`;
//     document.body.style.backgroundColor = color;
//     console.log(`rgb(${r}, ${g}, ${b})`);
// })




