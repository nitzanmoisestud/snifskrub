"use strict";
console.log('fuck');
window.addEventListener("load", start);
// Points arrays
let elArray = [];
let heatArray = [];
let lightArray = [];
let waterArray = [];

// Global variables
const rooms = document.querySelectorAll(".room-icon");

const background = document.getElementById("bgImage");
const fox = document.querySelector(".snif");

var bridge = document.querySelector("#bridge"),
  bridgeCanvas = bridge.getContext("2d"),
  brushRadius = (bridge.width / 100) * 5,
  img = new Image();

if (brushRadius > 100) {
  brushRadius = 100;
}

//start function to choose the rooms from index.html
function start() {
  console.log("start");
  document.querySelector("svg").setAttribute("viewBox", `0 0 1920 1080`);

  rooms.forEach((room) => {
    room.addEventListener("click", openRoom);
  });
  const exitBtn = document.querySelector(".exit");
  exitBtn.addEventListener("click", exitRoom);
}

function openRoom(event) {
  let dataRoom = event.currentTarget.dataset.room;
  const bridgeContainer = document.querySelector("#bridgeContainer");
  bridgeContainer.style.display = 'block'
  setRooms(event);
  fox.classList.add(`goto${dataRoom}`);
  console.log(dataRoom);
  setTimeout(() => {
    fox.classList.add("shrink");
    renderBg(dataRoom);

    loadElementsSvg(dataRoom);
    rooms.forEach((room) => {
      room.style.display = "none";
      fox.setAttribute("x", "50px");
      fox.setAttribute("y", "50px");
      fox.classList.remove(`goto${dataRoom}`);
    });
  }, 3000);
}

// Collecting points by clicking
function startTheSvgClick() {
  const shape = document.querySelector("#icons");
  shape.childNodes.forEach((each) => {
    each.addEventListener("click", clickedShape);
  });
  function clickedShape() {
    this.classList.add("move");
    const clicked = this.getAttribute("id");
    console.log("clicked", clicked);
    moveToArray(clicked);
  }

  function moveToArray(id) {
    if (id === "el") {
      elArray.push(this);
      console.log("el", elArray.length);
    } else if (id === "heat") {
      heatArray.push(this);
      console.log("heat", heatArray.length);
    } else if (id === "light") {
      lightArray.push(this);
      console.log("light", lightArray.length);
    } else if (id === "water") {
      waterArray.push(this);
      console.log("water", waterArray.length);
    }
  }
}


// Navigation

function setRooms(event) {
  // arrows to change room
  let roomIndex = event.target.dataset.index;

  const prevArrow = document.querySelector(".prev-arrow");
  prevArrow.dataset.index = roomIndex;
  prevArrow.addEventListener("click", prevRoom);
  const nextArrow = document.querySelector(".next-arrow");

  nextArrow.dataset.index = roomIndex;
  console.log(nextArrow);
  nextArrow.addEventListener("click", nextRoom);
}

function nextRoom(event) {
  let index = event.target.dataset.index;
  if (index < 3) {
    event.target.dataset.index = parseInt(index) + 1;
  } else {
    event.target.dataset.index = 0;
  }
  console.log(index);
  event.target.dataset.room = rooms[event.target.dataset.index].dataset.room;
  changeRoom(event);
}

function prevRoom(event) {
  let index = event.target.dataset.index;
  if (index > 0) {
    event.target.dataset.index = parseInt(index) - 1;
  } else {
    event.target.dataset.index = 3;
  }
  event.target.dataset.room = rooms[event.target.dataset.index].dataset.room;
  changeRoom(event);
}

function changeRoom(event) {
  let dataRoom = event.currentTarget.dataset.room;
  const fox = document.querySelector(".snif");

  renderBg(dataRoom);

  loadElementsSvg(dataRoom);
}

function exitRoom(event) {
  document.querySelector("svg").setAttribute("viewBox", `0 0 1920 1080`);
  const svgArtboard = document.querySelector(".artboard");
  const bridgeContainer = document.querySelector("#bridgeContainer");
  bridgeContainer.style.display = 'none'

  svgArtboard.style.display = 'block'

  // img.style.display = "none";
  rooms.forEach((room) => {
    room.style.display = "block";
    // ring.style.display = "none";
  });
}

img.onload = function () {
  bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
};

function renderBg(room) {
  console.log(room,'in renderbg');
  img.src = `scrub-assets/${room}.png`;
}
img.src;

async function loadElementsSvg(room) {
  let res = await fetch(`scrub-assets/${room}.svg`);
  let mySvg = await res.text();

  let elementsWrapper = document.querySelector("#thesvg");

  elementsWrapper.innerHTML = mySvg;

  renderToSvgBox();
  startTheSvgClick();
}
function startTheSvgClick() {
  const theFillRed = document.querySelector("#icons");
  theFillRed.childNodes.forEach((e) => {
    e.addEventListener("click", theFill);
  });
  function theFill() {
    this.setAttribute("fill", "red");
    this.classList.add("makeMove");
  }
}

function renderToSvgBox() {
  let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#thesvg");
  const canvasInSvg = document.querySelector("#skrubCanvas");
  canvasInSvg.appendChild(use);
  const svgArtboard = document.querySelector(".artboard");
  svgArtboard.style.display = 'none'

}


// img.filename = "/scrub-assets/foreground.png";

// img.src = img.filename;

function detectLeftButton(event) {
  return true;
}

function getBrushPos(xRef, yRef) {
  var bridgeRect = bridge.getBoundingClientRect();
  return {
    x: Math.floor(
      ((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left)) *
        bridge.width
    ),
    y: Math.floor(
      ((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top)) *
        bridge.height
    ),
  };
}

function drawDot(mouseX, mouseY) {
  bridgeCanvas.beginPath();
  bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
  bridgeCanvas.fillStyle = "#000";
  bridgeCanvas.globalCompositeOperation = "destination-out";
  bridgeCanvas.fill();
}

bridge.parentElement.addEventListener(
  "mousemove",
  function (e) {
    var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
      drawDot(brushPos.x, brushPos.y);
    }
  },
  false
);

bridge.parentElement.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
      var brushPos = getBrushPos(touch.pageX, touch.pageY);
      drawDot(brushPos.x, brushPos.y);
    }
  },
  false
);
