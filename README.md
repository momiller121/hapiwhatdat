# hapiwhatdat
Hapi plugin adding a route for what dat hapi server got (pull based discovery).

---

Sometimes it's nice to know what a particular Hapi process is delivering. This
plugin adds a route that responds to a GET with enough information to let you
know what you are talking to.

## Quick start

```sh
npm install hapiwhatdat --save
```


```Javascript
'use strict';

const Hapi = require('hapi');
const Hapiwhatdat = require('hapiwhatdat');

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
```

And then you can:

```sh
curl --verbose localhost:3000/discover
```

And you will get a text/plain response of a JSON payload.

You can also ask for JSON and expect the right content-type headers on the response:

```sh
curl --verbose -H "Accept:application/json" localhost:3000/discover
```

---

### You get something like the following where:

- 'routes' is the output that [blipp](https://github.com/danielb2/blipp) produces from the hapi routing table.
- 'package' information is a reflection of the package.json from the main module
in the process.
- 'process' is a subset of the attributes available from the node process

```json
{
	"routes": [{
		"uri": "http://localhost:3000",
		"labels": [],
		"routes": [{
			"method": "GET",
			"path": "/discover",
			"description": "",
			"auth": false
		}]
	}],
	"package": {
		"name": "hapiwhatdat",
		"version": "0.0.3",
		"description": "Hapi plugin adding a route for what dat hapi server got (pull based discovery).",
		"main": "index.js",
		"engines": {
			"npm": "~5.2.0",
			"node": ">=6.11.1"
		},
		"scripts": {
			"test": "npx lab -r console -t 100 -a code -L",
			"test-cov-html": "npx lab -r html -o coverage.html -a code -L"
		},
		"repository": {
			"type": "git",
			"url": "git+https://github.com/momiller121/hapiwhatdat.git"
		},
		"keywords": ["hapi", "discovery"],
		"author": "momiller121",
		"license": "Apache-2.0",
		"bugs": {
			"url": "https://github.com/momiller121/hapiwhatdat/issues"
		},
		"homepage": "https://github.com/momiller121/hapiwhatdat#readme",
		"dependencies": {
			"blipp": "^2.3.0",
			"hoek": "^4.1.1",
			"joi": "^10.6.0"
		},
		"devDependencies": {
			"code": "^4.1.0",
			"eslint-config-hapi": "^10.0.0",
			"hapi": "^16.4.3",
			"lab": "^14.1.0",
			"shot": "^3.4.2"
		}
	},
	"process": {
		"title": "node",
		"version": "v6.11.1",
		"arch": "x64",
		"platform": "darwin",
		"release": {
			"name": "node",
			"lts": "Boron"
		},
		"argv": ["/usr/local/bin/node", "/Users/mamiller/hapiwhatdat/example.js"]
	}
}
```
