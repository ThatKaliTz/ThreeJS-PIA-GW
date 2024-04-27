const io = require("socket.io")(3000, {
    cors: {
        origin: '*',
      }

});

io.on('connection', socket =>{
    // console.log(socket.id);
    socket.on('p1-enviar-x', (x) => {

        console.log(x);
        socket.broadcast.emit('p1-actualizar-x', x);
        // io.emit('enviar-cliente', datos);
    })
    socket.on('p1-enviar-z', (z) => {

        console.log(z);
        socket.broadcast.emit('p1-actualizar-z', z);

        // io.emit('enviar-cliente', datos);
    })




    
})