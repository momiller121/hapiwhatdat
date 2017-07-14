'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Hapi = require('hapi');

const internals = {
    setupServer: function (callback) {

        const server = new Hapi.Server();
        server.connection();
        callback(server);
    }
};

describe('the plugin', () => {

    it('can be installed without options', (done) => {

        internals.setupServer((server) => {

            server.register({
                register: require('../')
            }, (err) => {

                expect(err).to.not.exist();
                done();
            });
        });
    });

    it('introduces a route for discovery data', (done) => {

        internals.setupServer((server) => {

            server.register({
                register: require('../')
            }, (err) => {

                expect(err).to.not.exist();
                server.inject({
                    url: '/hapiwhatdat'
                }, (resp) => {

                    expect(resp.statusCode).to.equal(200);
                    done();

                });
            });
        });
    });

    it('respects a custom value for the path', (done) => {

        internals.setupServer((server) => {

            server.register({
                register: require('../'),
                options: {
                    path: '/discover'
                }
            }, (err) => {

                expect(err).to.not.exist();
                server.inject({
                    url: '/discover'
                }, (resp) => {

                    expect(resp.statusCode).to.equal(200);
                    done();

                });
            });
        });
    });

    it('produces a plain text response by default', (done) => {

        internals.setupServer((server) => {

            server.register({
                register: require('../')
            }, (err) => {

                expect(err).to.not.exist();
                server.inject({
                    url: '/hapiwhatdat'
                }, (resp) => {

                    expect(resp.statusCode).to.equal(200);
                    expect(resp.headers['content-type']).to.equal('text/plain; charset=utf-8');
                    done();
                });
            });
        });
    });

    it('can produce a JSON response', (done) => {

        internals.setupServer((server) => {

            server.register({
                register: require('../')
            }, (err) => {

                expect(err).to.not.exist();
                server.inject({
                    url: '/hapiwhatdat',
                    headers: {
                        accept: 'application/json'
                    }
                }, (resp) => {

                    expect(resp.statusCode).to.equal(200);
                    expect(resp.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(JSON.parse(resp.payload)).to.be.an.object();
                    done();
                });
            });
        });
    });
});
