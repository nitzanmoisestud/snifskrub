"use strict";

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

let gobalPosX = width / 2;
let globlPosY = highet / 2;

let keyR = false;
let keyL = false;
let keyU = false;
let keyD = false;

function startScratch() {
  console.log("start");

  console.log(window.innerWidth);
  document
    .querySelector("svg")
    .setAttribute("viewBox", `0 0 ${width} ${highet}`);
  console.log(document.querySelector("svg"));
  // Setting up sizes and positions
  maskRing.setAttribute("cx", width / 2);
  maskRing.setAttribute("cy", highet / 2);
  maskRing.setAttribute("r", glassRadius);

  ring.setAttribute("cx", width / 2);
  ring.setAttribute("cy", highet / 2);
  ring.setAttribute("r", glassRadius);

  picture.setAttribute("width", width);
  picture.setAttribute("highet", highet);

  energyElements.setAttribute("width", width);
  energyElements.setAttribute("highet", highet);

  // drag and drop code

  ring.parentElement.addEventListener("mousedown", mouseDown);
  ring.parentElement.addEventListener("mouseup", mouseUp);

  // touch events

  ring.parentElement.addEventListener("touchstart", touchStart, false);
  ring.parentElement.addEventListener("touchend", touchEnd, false);
}

function touchStart() {
  console.log("in touch");
  ring.parentElement.removeEventListener("touchstart", touchStart);
  ring.parentElement.addEventListener("touchmove", handleTouchMove, false);
}
function handleTouchMove(event) {
  console.log(event);
  let touchPosX = (event.touches[0].clientX / window.innerWidth) * width;
  let touchPosY =
    (event.touches[0].clientY / window.innerHeight) *
    width *
    (window.innerHeight / window.innerWidth);
  moveGlass(touchPosX, touchPosY);
}

function touchEnd() {
  ring.parentElement.removeEventListener("touchmove", handleTouchMove);
  ring.parentElement.addEventListener("touchstart", touchStart, false);
}

function mouseDown() {
  ring.parentElement.removeEventListener("mousedown", mouseDown);
  ring.parentElement.addEventListener("mousemove", mouseMove);
}

function mouseMove(event) {
  let mousePosX = (event.pageX / window.innerWidth) * width;
  let mousePosY =
    (event.pageY / window.innerHeight) *
    width *
    (window.innerHeight / window.innerWidth);
  moveGlass(mousePosX, mousePosY);
}

function mouseUp() {
  ring.parentElement.removeEventListener("mousemove", mouseMove);
  ring.parentElement.addEventListener("mousedown", mouseDown);
}

// key down code

function moveGlass(posX, posY) {
  ring.setAttribute("cx", posX);
  ring.setAttribute("cy", posY);

  maskRing.setAttribute("cx", posX);
  maskRing.setAttribute("cy", posY);
}
