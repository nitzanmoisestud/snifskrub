'use strict'

window.addEventListener('load', start)

// Global variables
const rooms = document.querySelectorAll('.room');

function start(){
console.log('start');
rooms.forEach(room => {
    room.addEventListener('click', openRoom);
});
}

function openRoom(event){
    console.log(event.currentTarget.dataset.room);
    rooms.forEach(room => {
        room.style.display = "none"
        });
}


