let socket = require('socket.io');

module.exports.listen = function (server) {
    let io = socket.listen(server);

    // GESTION DU CHAT
    io.on('connection', function (socket) {
        socket.on('enregistrement', function (data) {
            data.id = socket.id;
            io.emit('nouvelUtilisateur', data);
        });
    });

    return io;
};