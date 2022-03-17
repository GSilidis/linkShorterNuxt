const express = require('express');
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');
const Redirect = require('./api/controller/redirect');
const Manage = require('./api/controller/manage');
const Statistics = require('./api/controller/statistics');

const app = express();

const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

function initSequelize () {
    const Sequelize = require('sequelize');
    const sequelize_defaults = {
        define: {
            timestamps: false,
            freezeTableName: true,
        },
        logging: false,
    };

    const db = new Sequelize('mariadb://localhost:3306/links?user=node&password=password', sequelize_defaults);

    require('./api/model/links')(db, Sequelize.DataTypes);
    require('./api/model/stats')(db, Sequelize.DataTypes);

    return db;
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

    app.use(bodyParser.json());

    app.use('/', Redirect.route(db));
    app.use('/api/link', Manage.route(db));
    app.use('/api/stats', Statistics.route(db));

    app.use(nuxt.render);
    app.listen({ port, host }, function () {
        process.send('ready');
    });

    console.log(`Server listening on http://${host}:${port}`);
}

start();
