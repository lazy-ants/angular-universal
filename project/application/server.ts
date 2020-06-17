import 'zone.js/dist/zone-node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

const isBot = require('isbot');
const domino = require('domino');

import * as express from 'express';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
    const server = express();
    const DIST_FOLDER = join(process.cwd(), 'dist/browser');
    const INDEX_HTML = existsSync(join(DIST_FOLDER, 'index.original.html')) ? 'index.original.html' : 'index.html';

    // Our index.html we'll use as our template
    const template = readFileSync(join(DIST_FOLDER, INDEX_HTML)).toString();
    const win = domino.createWindow(template);

    global['window'] = win;
    global['document'] = win.document;

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine(
        'html',
        ngExpressEngine({
            bootstrap: AppServerModule,
        }),
    );

    server.set('view engine', 'html');
    server.set('views', DIST_FOLDER);

    // Example Express Rest API endpoints
    // app.get('/api/**', (req, res) => {});

    // Serve static files from /browser
    server.get('*.*', express.static(DIST_FOLDER));

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        global['navigator'] = req['headers']['user-agent'];
        const userAgent = req['headers']['user-agent'];

        req['headers']['crawler'] = false;
        if (isBot(userAgent) === true) {
            req['headers']['crawler'] = true;
        }

        res.render(INDEX_HTML, {
            req,
            providers: [
                { provide: APP_BASE_HREF, useValue: req.baseUrl },
                { provide: REQUEST, useValue: req },
                { provide: RESPONSE, useValue: res },
            ],
        });
    });

    return server;
}

function run() {
    const PORT = process.env.PORT || 4000;

    // Start up the Node server
    const server = app();
    server.listen(PORT, () => {
        console.log(`Node Express server listening on http://localhost:${PORT}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
