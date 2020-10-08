'use strict'

window.addEventListener('load', start)

// Global variables
const rooms = document.querySelectorAll('.room-icon');

function start(){
console.log('start');
rooms.forEach(room => {
    room.addEventListener('click', openRoom);
});
}

function openRoom(event){
    console.log(event.currentTarget.dataset.room);
    let dataRoom = event.currentTarget.dataset.room
    const fox = document.querySelector(".snif");
    
    fox.classList.add(`goto${dataRoom}`)

    setTimeout(() => {
        
        fox.classList.add('shrink')
        console.log(fox);
        rooms.forEach(room => {
            room.style.display = "none"
            fox.style.display = "none"

            });
    }, 3000);
}


