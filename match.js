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
  
     setFurnitures();

  }


  // Definind furnitures energy classes
  function setFurnitures() {
    const lights = document.querySelector("#lys_group");
    lights.childNodes.forEach((each) => {
        each.classList.add('light');
  })
  const electricity = document.querySelector("#el_group");
  if (electricity) {
      
      electricity.childNodes.forEach((each) => {
        each.classList.add('el');
        })
        }
        const water = document.querySelector("#vand_group");
     if (water) {
         
         water.childNodes.forEach((each) => {
            each.classList.add('water');
            })
     }   
const warm = document.querySelector("#varm_group");
if (warm) {

    warm.childNodes.forEach((each) => {
        each.classList.add('heat');
    })
}   

}

 

async function loadElementsSvg(room) {
    let res = await fetch(`assets/match/elements_${room}.svg`);
    let mySvg = await res.text();
    
    let elementsWrapper = document.querySelector("#elements");

  elementsWrapper.innerHTML = mySvg;

  startTheElementsDrag();
}


// Activate dragging function by selecting group ids
function startTheElementsDrag() {
         
      const lights = document.querySelectorAll('#light');
      lights.forEach(icon => {
        dragElements(icon)
      });
      const els = document.querySelectorAll('#el');
      els.forEach(icon => {
        dragElements(icon)
      });
      const heats = document.querySelectorAll('#heat');
      heats.forEach(icon => {
        dragElements(icon)
      });
      const water = document.querySelectorAll('#water');
      water.forEach(icon => {
        dragElements(icon)
      });
      
    }

// Dragging icons and placing tham on furnitures bg with green sock.
// https://greensock.com/svg-drag/

  function dragElements(icon){
    const overlapThreshold = "100%"; 

      icon.classList.add('drag');
   console.log(icon.id);
Draggable.create(".drag", {
        bounds:"svg",
        onDrag: function() {
  if (this.target.id === 'light') {
    
    const lightsFurnitures = document.querySelectorAll('.light')
    let i = lightsFurnitures.length;
    while (--i >-1) {
      if (this.hitTest(lightsFurnitures[i]) ) {
        gsap.to(this.target, {duration: 3, opacity:0, scale:0, svgOrigin:"675 143"});
        // Adding to points arrays

        console.log(this);
        moveToArray(this.target.id)
        this.endDrag()
      }
    }
  }else if(this.target.id === 'water'){
    const waterFurnitures = document.querySelectorAll('.water')
    let i = waterFurnitures.length;
    
    while (--i >-1) {
      
      if (this.hitTest(waterFurnitures[i]) ) {
        gsap.to(this.target, {duration: 3, opacity:0, scale:0, svgOrigin:"675 143"});
        moveToArray(this.target.id)
        this.endDrag()

      }
    }
  }else if(this.target.id === 'el'){
    const elFurnitures = document.querySelectorAll('.el')
    let i = elFurnitures.length;
    
    while (--i >-1) {
      
      if (this.hitTest(elFurnitures[i]) ) {
        gsap.to(this.target, {duration: 3, opacity:0, scale:0, svgOrigin:"675 143"});
        moveToArray(this.target.id)
        this.endDrag()

      }
    }
  }else if(this.target.id === 'heat'){
    const heatFurnitures = document.querySelectorAll('.heat')
    let i = heatFurnitures.length;
    
    while (--i >-1) {
      
      if (this.hitTest(heatFurnitures[i]) ) {
        gsap.to(this.target, {duration: 3, opacity:0, scale:0, svgOrigin:"675 143"});
        moveToArray(this.target.id)
        this.endDrag()

      }
    }
  }
        }
        
      });


  




}

  function moveToArray(id) {
  if (id === "el"){
  elArray.push(this);
  console.log("el", elArray.length);
  document.querySelector("#e-points").textContent = elArray.length;
  document.querySelector(".e-circle").classList.remove("hide");
  } else if(id === "heat"){
  heatArray.push(this);
  console.log("heat", heatArray.length);
  document.querySelector("#h-points").textContent = heatArray.length;
  document.querySelector(".h-circle").classList.remove("hide");
  }else if(id === "light"){
  lightArray.push(this);
  console.log("light", lightArray.length);
  document.querySelector("#l-points").textContent = lightArray.length;
  document.querySelector(".l-circle").classList.remove("hide");
  }else if(id === "water"){
  waterArray.push(this);
  console.log("water", waterArray.length);
  document.querySelector("#w-points").textContent = waterArray.length;
  document.querySelector(".w-circle").classList.remove("hide");
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




