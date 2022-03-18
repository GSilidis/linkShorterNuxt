const express = require('express');
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');
const Redirect = require('./api/controller/redirect');
const Manage = require('./api/controller/manage');
const Statistics = require('./api/controller/statistics');

const app = express();

const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

process.send = process.send || function () {};

function initSequelize () {
    const Sequelize = require('sequelize');
    const sequelize_defaults = {
        define: {
            timestamps: false,
            freezeTableName: true,
        },
        logging: false,
    };

    const host = process.env.MARIADB_HOST || 'localhost:3306';
    const user = process.env.MARIADB_USER;
    const password = process.env.MARIADB_PASSWORD;

    const db = new Sequelize(`mariadb://${host}/links?user=${user}&password=${password}`, sequelize_defaults);

    require('./api/model/links')(db, Sequelize.DataTypes);
    require('./api/model/stats')(db, Sequelize.DataTypes);

    return db;
}

function initRoutes (db) {
    app.use(bodyParser.json());

    app.use('/', Redirect.route(db));
    app.use('/api/link', Manage.route(db));
    app.use('/api/stats', Statistics.route(db));
}

async function start () {
    const nuxt = new Nuxt(config);
    const { host, port } = nuxt.options.server;

    if (config.dev) {
        await new Builder(nuxt).build();
    } else {
        await nuxt.ready();
    }

    const db = initSequelize();

    initRoutes(db);

    app.use(nuxt.render);
    app.listen({ port, host }, function () {
        process.send('ready');
    });

    console.log(`Server listening on http://${host}:${port}`);
}

start();
