let socket = require('socket.io');

module.exports.listen = function (server) {
    let io = socket.listen(server);

    // GESTION DU CHAT
    io.on('connection', function (socket) {
        socket.on('enregistrement', function (data) {
            data.id = socket.id;
            io.emit('nouvelUtilisateur', data);
        });

        socket.on('nouveauMessage', function(data){
            console.log(data.nom, data.message);
            socket.broadcast.emit('recevoirMessage', data);
        })
    });


    return io;
};