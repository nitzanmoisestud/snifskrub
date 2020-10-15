"use strict";

window.addEventListener("load", start);
// Points arrays
let elArray = [];
let heatArray = [];
let lightArray = [];
let waterArray = [];

// Global variables
const rooms = document.querySelectorAll(".room-icon");
// const levels = document.querySelectorAll(".level");

const background = document.getElementById("bgImage");
const fox = document.querySelector(".snif");

// cliping

const picture = document.querySelector("#bgImage");
const energyElements = document.getElementById("elements");
const ring = document.getElementById("ring");
const maskRing = document.getElementById("mask-ring");

function start() {
  console.log("start");
  document.querySelector("svg").setAttribute("viewBox", `0 0 1920 1080`);
// levels.forEach(level => {
//   level.addEventListener('click', startGame)
// });
  rooms.forEach((room) => {
    room.addEventListener("click", openRoom);
  });
  const exitBtn = document.querySelector(".exit");
exitBtn.addEventListener('click',exitRoom)
}

// function startGame(event){
//   document.querySelector('.artboard').style.display = 'block';
//   document.querySelector('.levels').style.display = 'none';
//   document.querySelector('.snif-home').style.display = 'none';


// }

function openRoom(event) {
  let dataRoom = event.currentTarget.dataset.room;
 
  setRooms(event);
  fox.classList.add(`goto${dataRoom}`);
  console.log(dataRoom);
  setTimeout(() => {
    fox.classList.add("shrink");
    renderBg(dataRoom);
    
    startScratch();
    loadElementsSvg(dataRoom);
    rooms.forEach((room) => {
      room.style.display = "none";
      fox.setAttribute("x", "50px");
      fox.setAttribute("y", "50px");
      fox.classList.remove(`goto${dataRoom}`);
    });
  }, 3000);
}


function renderBg(room) {

  background.setAttribute("href", `assets/rooms/${room}.png`);
  background.style.display = 'block';
  ring.style.display = 'block';


}

async function loadElementsSvg(room) {
  let res = await fetch(`assets/rooms/elements_${room}.svg`);
  let mySvg = await res.text();

  let elementsWrapper = document.querySelector("#elements");

  elementsWrapper.innerHTML = mySvg;

  renderToSvgBox();
  startTheSvgClick();
}

// Collecting points by clicking
function startTheSvgClick() {
  const shape = document.querySelector("#icons");
shape.childNodes.forEach((each) => {
  each.addEventListener("click", clickedShape);
})
function clickedShape() {
this.classList.add("hidden");
const clicked = this.getAttribute("id");
console.log("clicked", clicked);
moveToArray(clicked);
}

function moveToArray(id) {
if (id === "el"){
elArray.push(this);
console.log("el", elArray.length);
document.querySelector("#e-points").textContent = elArray.length;
document.querySelector(".e-circle").classList.remove("hide");
if(elArray.length == 10){
  
  showAnimation();
  
}
} else if(id === "heat"){
heatArray.push(this);
console.log("heat", heatArray.length);
document.querySelector("#h-points").textContent = heatArray.length;
document.querySelector(".h-circle").classList.remove("hide");
if(heatArray.length == 10){
  
  showAnimation();
  
}
}else if(id === "light"){
lightArray.push(this);
console.log("light", lightArray.length);
document.querySelector("#l-points").textContent = lightArray.length;
document.querySelector(".l-circle").classList.remove("hide");
if(lightArray.length == 10){
  
  showAnimation();
  
}
}
else if(id === "water"){
waterArray.push(this);
console.log("water", waterArray.length);

document.querySelector("#w-points").textContent = waterArray.length;
document.querySelector(".w-circle").classList.remove("hide");
if(waterArray.length >= 10){
  
  showAnimation();
  
}
}
}


const thePopUp = document.querySelector("#theanimation");
const btn = document.querySelector("#btn");
function showAnimation(){
  
  thePopUp.style.display = "block";
  btn.style.display ="block";
  thePopUp.classList.add("makeMove");
  btn.classList.add("makeMove");
}

  
  btn.addEventListener("click", function(){
    thePopUp.style.display = "none";
    btn.style.display = "none";
  });

}

function renderToSvgBox() {
  let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#domElements");
  const elements = document.querySelector("#elements");
  elements.appendChild(use);
  console.log(use);
}

  

  
// Navigation

function setRooms(event){
  // arrows to change room
  let roomIndex = event.target.dataset.index;
 
  const prevArrow = document.querySelector('.prev-arrow');
  prevArrow.dataset.index = roomIndex;
  prevArrow.addEventListener('click',prevRoom)
  const nextArrow = document.querySelector('.next-arrow');

  nextArrow.dataset.index = roomIndex;
  console.log(nextArrow);
  nextArrow.addEventListener('click',nextRoom);
  
 }

function nextRoom(event){
  let index = event.target.dataset.index
  if (index<3) {
    
    event.target.dataset.index = parseInt(index)+1;
  }else{
    event.target.dataset.index = 0;

  }
  console.log(index);
  event.target.dataset.room = rooms[ event.target.dataset.index].dataset.room
  changeRoom(event)
}

function prevRoom(event){
  let index = event.target.dataset.index
    if (index>0) {
  
      event.target.dataset.index = parseInt(index)-1;
}else{
  event.target.dataset.index = 3;

}
  event.target.dataset.room = rooms[ event.target.dataset.index].dataset.room
  changeRoom(event)
}

function changeRoom(event){
  let dataRoom = event.currentTarget.dataset.room;
  const fox = document.querySelector(".snif");
 
    
    renderBg(dataRoom);
    startScratch();
    loadElementsSvg(dataRoom);

}

function exitRoom(event){
  document.querySelector("svg").setAttribute("viewBox", `0 0 1920 1080`);

background.style.display = 'none';
rooms.forEach((room) => {
  room.style.display = "block";
  ring.style.display = 'none';

});
}

