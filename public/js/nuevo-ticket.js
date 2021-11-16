//referencias html
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', ( ultimo ) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
})

socket.emit('tickets-pendientes', ( tickets ) => {
    lblNuevoTicket.innerHTML = tickets
})

btnCrear.addEventListener( 'click', () => {
    socket.emit('siguiente-ticket', null, ( ticket ) => {
        const audio = new Audio('../audio/new-ticket.mp3');
        audio.play()
        lblNuevoTicket.innerText = ticket;
    })
});