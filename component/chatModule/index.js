let socket = require('socket.io');

module.exports.listen = function (server) {
    let io = socket.listen(server);
    io.membres = [];
    // GESTION DU CHAT
    io.on('connection', function (socket) {
        socket.on('enregistrement', function (data) {
            data.id = socket.id;
            socket.nom = data.nom;
            socket.broadcast.emit('nouvelUtilisateur', data);
        });

        socket.on('demanderNoms', function () {
            var tabNoms = [];
            Object.keys(io.sockets.connected).forEach(function (socketID) {
                var util = {}
                util.id = io.sockets.connected[socketID].id;
                util.nom = io.sockets.connected[socketID].nom;
                if (util) tabNoms.push(util);
            });

            socket.emit('recevoirListeNoms', tabNoms);
        });

        socket.on('nouveauMessage', function (data) {
            //console.log(data.nom, data.message);
            socket.broadcast.emit('recevoirMessage', data);
        });

        socket.on('disconnect', function (data) {
            //console.log(io.membres);
            socket.broadcast.emit('enleverUtil', socket.id);
        });
    });


    return io;
};