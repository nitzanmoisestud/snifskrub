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

function start() {
  console.log("start");
  document.querySelector("svg").setAttribute("viewBox", `0 0 1920 1080`);

  rooms.forEach((room) => {
    room.addEventListener("click", openRoom);
  });
  const exitBtn = document.querySelector(".exit");
exitBtn.addEventListener('click',exitRoom)
}




function openRoom(event) {
  let dataRoom = event.currentTarget.dataset.room;
 
  setRooms(event);
  fox.classList.add(`goto${dataRoom}`);
  console.log(dataRoom);
  setTimeout(() => {
    document.querySelector("#elements").style.display = 'block';
    background.style.display = 'block';
    fox.classList.add("shrink");
    renderBg(dataRoom);
    
    // startScratch();
    loadElementsSvg(dataRoom);
    rooms.forEach((room) => {
      room.style.display = "none";
      fox.setAttribute("x", "50px");
      fox.setAttribute("y", "50px");
      fox.classList.remove(`goto${dataRoom}`);
    });
  }, 3000);
}


async function renderBg(room) {
    let res = await fetch(`assets/match/${room}.svg`);
    let mySvg = await res.text();
  
    let bgWrapper = document.querySelector("#bgImage");
  
    bgWrapper.innerHTML = mySvg;
  
     startTheFurnituresClick();

  }

  function startTheFurnituresClick() {
    const lights = document.querySelector("#lys_group");
    lights.childNodes.forEach((each) => {
        each.classList.add('light');
        // esch.dataset.energy= 'light';
    each.addEventListener("click", clickLight);
  })
  const electricity = document.querySelector("#el_group");
  if (electricity) {
      
      electricity.childNodes.forEach((each) => {
        each.classList.add('el');
        // esch.dataset.energy= 'el'
          each.addEventListener("click", clickLight);
        })
        }
        const water = document.querySelector("#vand_group");
     if (water) {
         
         water.childNodes.forEach((each) => {
            each.classList.add('water');
            // esch.dataset.energy= 'water'
             each.addEventListener("click", clickLight);
            })
     }   
const warm = document.querySelector("#varm_group");
if (warm) {

    warm.childNodes.forEach((each) => {
        each.classList.add('warm');
        // esch.dataset.energy= 'warm'
    each.addEventListener("click", clickLight);
    })
}   

}

  function clickLight(event){
      console.log(event.currentTarget,'in light click');
  }

async function loadElementsSvg(room) {
    let res = await fetch(`assets/match/elements_${room}.svg`);
    let mySvg = await res.text();
    
    let elementsWrapper = document.querySelector("#elements");

  elementsWrapper.innerHTML = mySvg;

  startTheElementsClick();
}


// Collecting points by clicking
function startTheElementsClick() {
    
    const shapes = document.querySelector("#icons");
    shapes.childNodes.forEach((each) => {
        each.addEventListener("click", clickedShape);
    })
    const elIcons = document.querySelector('#icons');
    console.log(elIcons);
    elIcons.childNodes.forEach(icon => {
        console.log(icon,'in startTheElementsClick');

    mixElements(icon)

});
}
function mixElements(element){
    const x = Math.random() * 1000;
    const y = Math.random() * 1000;
  
    element.classList.add('drag');
    Draggable.create(".drag", {
        bounds:"svg",
        onDrag: function() {
        
        const lights = document.querySelectorAll('.light')
        let i = lights.length;
        while (--i >-1) {
            
            if (this.hitTest(lights[i])) {
              gsap.to(this.target, {duration: 0.6, opacity:0, scale:0, svgOrigin:"675 143"});
            }
        }
        }
      });


    console.log(element, 'in mix');
  

        // element.setAttribute('x', '300px');
        // element.setAttribute('y', y);



}
function clickedShape() {
this.classList.add("move");
const clicked = this.getAttribute("id");
console.log("clicked", clicked);
moveToArray(clicked);
// gsap.to(".drag", {rotation: 27, x: 100, duration: 1});
}

function moveToArray(id) {
if (id === "el"){
elArray.push(this);
console.log("el", elArray.length);
} else if(id === "heat"){
heatArray.push(this);
console.log("heat", heatArray.length);
}else if(id === "light"){
lightArray.push(this);
console.log("light", lightArray.length);
}else if(id === "water"){
waterArray.push(this);
console.log("water", waterArray.length);
}
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
  let elementsWrapper = document.querySelector("#elements");
    elementsWrapper.innerHTML = '';
    
    renderBg(dataRoom);
    loadElementsSvg(dataRoom);

}

function exitRoom(event){
  document.querySelector("svg").setAttribute("viewBox", `0 0 1920 1080`);
  document.querySelector("#elements").style.display = 'none';
background.style.display = 'none';
rooms.forEach((room) => {
  room.style.display = "block";

});
}




