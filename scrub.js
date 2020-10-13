// document.addEventListener("DOMContentLoaded", start);

// async function start() {
//   let response = await fetch("/scrub-assets/background.svg");
//   let mySvgData = await response.text();
//   document.querySelector("#thesvg").innerHTML = mySvgData;
//   startTheSvgClick();
// }
// function startTheSvgClick() {
//   const shape = document.querySelector("#icons");
//   shape.childNodes.forEach((each) => {
//     each.addEventListener("click", clickedShape);
//   });

//   function clickedShape() {
//     this.setAttribute("fill", "red");
//   }
// }

"use strict";

window.addEventListener("load", start);

// Global variables
const rooms = document.querySelectorAll(".room-icon");

function start() {
  console.log("start");
  document.querySelector("svg").setAttribute("viewBox", `0 0 1920 1080`);

  rooms.forEach((room) => {
    room.addEventListener("click", openRoom);
  });
}

function openRoom(event) {
  console.log(event.currentTarget.dataset.room);
  let dataRoom = event.currentTarget.dataset.room;
  const fox = document.querySelector(".snif");

  fox.classList.add(`goto${dataRoom}`);

  setTimeout(() => {
    fox.classList.add("shrink");
    console.log(fox);
    renderBg(dataRoom);

    loadElementsSvg(dataRoom);
    rooms.forEach((room) => {
      console.log(room);
      room.style.display = "none";
      fox.setAttribute("x", "50px");
      fox.setAttribute("y", "50px");
      fox.classList.remove(`goto${dataRoom}`);
    });
  }, 3000);
}

var bridge = document.querySelector("#bridge"),
  bridgeCanvas = bridge.getContext("2d"),
  brushRadius = (bridge.width / 100) * 5,
  img = new Image();

if (brushRadius > 100) {
  brushRadius = 100;
}

img.onload = function () {
  bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
};

function renderBg(room) {
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
  use.setAttribute("href", "#domElements");
  const elements = document.querySelector("#thesvg");
  elements.appendChild(use);
  console.log(use);
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
