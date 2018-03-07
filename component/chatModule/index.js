let socket = require('socket.io');

module.exports.listen = function (server) {
    let io = socket.listen(server);


    // GESTION DU CHAT
    io.on('connection', function (socket) {
        console.log("id:", socket.id);
        socket.on('enregistrement', function (data) {
            io.emit('nouvelUtilisateur', data);
        })
        // }); // une connexion socket
        // let message = "Chat socket"
        // res.render('vue_socket.ejs', {message : message})
    });

    return io;
};