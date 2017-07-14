'use strict';

const Hapi = require('hapi');
const Hapiwhatdat = require('./');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

const options = {
    path: '/discover'
};

server.register({
    register: Hapiwhatdat,
    options
}, (err) => {

    if (err) {
        console.error(err);
    }
    server.start((err) => {

        if (err) {
            console.log(err);
        }
        else {
            console.log('Server running at:', server.info.uri);
        }
    });
});
