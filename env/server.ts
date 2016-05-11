import * as path from 'path';
import 'angular2-universal/polyfills'; //replace zone
import 'reflect-metadata';
import * as express from 'express';
import {
    provide,
    expressEngine,
    ExpressEngineConfig,
    REQUEST_URL,
    ORIGIN_URL,
    BASE_URL,
    NODE_ROUTER_PROVIDERS,
    NODE_HTTP_PROVIDERS
} from 'angular2-universal';

let app = express();

import {AppComponent} from '../app/app.component';

app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

let baseUrl = '/';
let config: ExpressEngineConfig = {
    directives: [ AppComponent ],
    platformProviders: [
        provide(ORIGIN_URL, {useValue: 'http://localhost:3000'}),
        provide(BASE_URL, {useValue: baseUrl}),
    ],
    providers: [
        provide(REQUEST_URL, {useValue: baseUrl}),
        NODE_ROUTER_PROVIDERS,
        NODE_HTTP_PROVIDERS,
    ],
    async: true,
    preboot: false // { appRoot: 'app' } // your top level app component selector
};

// Serve static files
app.use(express.static(path.join(path.resolve(__dirname, 'dist')), 
    {index: false}));

app.use('/', function(req, res){
    config.providers = [
        provide(REQUEST_URL, {useValue: req.originalUrl || baseUrl}),
        NODE_ROUTER_PROVIDERS,
        NODE_HTTP_PROVIDERS,
    ];
    res.render('../../app/index', config);
});

app.listen(3000,() => {
    console.log('Listen on http://localhost:3000');
});

