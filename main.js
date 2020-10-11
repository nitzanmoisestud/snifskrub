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
    startScratch();
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

function renderBg(room) {
  const background = document.getElementById("bgImage");
  background.setAttribute("href", `assets/${room}.png`);
}

async function loadElementsSvg(room) {
  let res = await fetch(`assets/elements_${room}.svg`);
  let mySvg = await res.text();

  let elementsWrapper = document.querySelector("#elements");

  elementsWrapper.innerHTML = mySvg;

  renderToSvgBox();
  startTheSvgClick();
}
function startTheSvgClick() {
  const setStrokeBlack = document.querySelectorAll("path");
  setStrokeBlack.forEach((e) => {
    // e.setAttribute("stroke", "red");
    e.addEventListener("click", theStroke);
  });
  function theStroke() {
    this.setAttribute("fill", "red");
  }
}

function renderToSvgBox() {
  let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#domElements");
  const elements = document.querySelector("#elements");
  elements.appendChild(use);
  console.log(use);
}

  

  


