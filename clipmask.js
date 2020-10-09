'use strict'

// init

// const picture = document.getElementById("domBgImage");
const picture = document.querySelector("#bgImage");

console.log(picture);
const energyElements = document.getElementById("elements");
console.log(energyElements);

const ring = document.getElementById("ring");
const maskRing = document.getElementById("mask-ring");


// init sizes

const width = 256;
const highet = 160;
const glassRadius = 5;

// key down

let gobalPosX =width/2;
let globlPosY = highet/2;

let keyR = false;
let keyL = false;
let keyU = false;
let keyD = false;

function startScratch(){
    console.log('start');
  
    console.log(window.innerWidth);
    document.querySelector("svg").setAttribute("viewBox", `0 0 ${width} ${highet}`);
console.log(document.querySelector("svg"));
    // Setting up sizes and positions
    maskRing.setAttribute("cx", width/2)
    maskRing.setAttribute("cy", highet/2)
    maskRing.setAttribute("r", glassRadius)

    ring.setAttribute("cx", width/2)
    ring.setAttribute("cy", highet/2)
    ring.setAttribute("r", glassRadius)
    
    
    picture.setAttribute("width", width)
    picture.setAttribute("highet", highet)


    energyElements.setAttribute("width", width)
    energyElements.setAttribute("highet", highet)

    // drag and drop code

    ring.addEventListener("mousedown", mouseDown);
    ring.addEventListener("mouseup", mouseUp);

   

    // touch events

    ring.addEventListener("touchstart", touchStart,false);
    ring.addEventListener("touchend", touchEnd,false);


}


function touchStart(){
    console.log('in touch');
    ring.removeEventListener("touchstart", touchStart);
    ring.addEventListener("touchmove", handleTouchMove, false);



}
function handleTouchMove(event){
    console.log(event);
    let touchPosX = event.touches[0].clientX /window.innerWidth *width;
    let touchPosY =event.touches[0].clientY /window.innerHeight *width*(window.innerHeight/window.innerWidth);  
    moveGlass(touchPosX,touchPosY);
    
    }

    function touchEnd(){
        ring.removeEventListener("touchmove", handleTouchMove);
        ring.addEventListener("touchstart", touchStart,false);
    
    }


function mouseDown(){
    ring.removeEventListener("mousedown", mouseDown);
    ring.addEventListener("mousemove", mouseMove);


}

function mouseMove(event){
let mousePosX = event.pageX /window.innerWidth *width;
let mousePosY = event.pageY /window.innerHeight *width*(window.innerHeight/window.innerWidth);  
moveGlass(mousePosX,mousePosY);

}

function mouseUp(){
    ring.removeEventListener("mousemove", mouseMove);
    ring.addEventListener("mousedown", mouseDown);

}

// key down code



function moveGlass(posX,posY){
    ring.setAttribute("cx", posX);
    ring.setAttribute("cy", posY);

    maskRing.setAttribute("cx", posX);
    maskRing.setAttribute("cy", posY);

  

}