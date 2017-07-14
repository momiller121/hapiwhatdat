'use strict';

const Path = require('path');
const Joi = require('joi');
const Hoek = require('hoek');


// load the package from the main module that we're plugged into
// When invoked by lab under test, this provides an empty package object

// Declare internals
const internals = {
    schema: {
        path: Joi.string().default('/hapiwhatdat')
    },
    default: {
        path: '/hapiwhatdat'
    },
    /* $lab:coverage:off$ */
    mainModulePackage: /node_modules.lab/.test(process.mainModule.filename) ? {
        testingMode: true
    } : require(Path.join(Path.dirname(process.mainModule.filename), 'package')),
    /* $lab:coverage:on$ */
    process: {
        title: process.title,
        version: process.version,
        arch: process.arch,
        platform: process.platform,
        release: {
            name: process.release.name,
            lts: process.release.lts
        },
        argv: process.argv
    }
};

exports.register = function (server, options, next) {


    const config = Hoek.applyToDefaults(internals.default, options);

    server.register({
        register: require('blipp'),
        options: {
            showStart: false,
            showAuth: true
        }
    }, (err) => {

        /* $lab:coverage:off$ */
        if (err) {
            console.error('Failed to load plugin:', err);
        }
        /* $lab:coverage:on$ */
    });

    server.route({
        method: 'GET',
        path: config.path,
        handler: function (request, reply) {

            const buf = {};
            buf.routes = server.plugins.blipp.info();
            buf.package = internals.mainModulePackage;
            buf.process = internals.process;

            if (request.headers.accept && request.headers.accept.indexOf('application/json') > -1) {
                // provide a json response
                reply(buf);
            }
            else {
                // default to text/plain
                reply(JSON.stringify(buf, null, 2)).type('text/plain');
            }
        }
    });
    next();
};


exports.register.attributes = {
    pkg: require(Path.join(__dirname, '..', 'package'))
};
