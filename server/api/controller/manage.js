const { UniqueConstraintError } = require('sequelize');
const shorthash = require('shorthash');
const hash = shorthash.unique;

const SHORT_URL_SALT = 'short';
const SHORT_URL_PREF = 'h';
const STAT_URL_SALT = 'stats';
const STAT_URL_PREF = 't';

async function createURL (db, original_url, Links) {
    try {
        const shortUrl = SHORT_URL_PREF + hash(original_url + new Date().toUTCString() + SHORT_URL_SALT);
        const statisticsUrl = STAT_URL_PREF + hash(original_url + new Date().toUTCString() + STAT_URL_SALT);

        return await Links.create({
            short_link: shortUrl,
            original_link: original_url,
            statistics_link: statisticsUrl,
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return await createURL(db, original_url, Links); // If we got hash collision - try again
        } else {
            throw error;
        }
    }
}

/**
 * Creates route for managing URLs (CRD operations)
 * @param {Sequelize} db
 * @returns {express.Router} Express route
 */
module.exports.route = function (db) {
    const express = require('express');
    const ErrorHandler = require('../../utils/error/handler');
    const { BadRequestError, NotFoundError, InternalServerError } = require('../../utils/error/errors');
    const Manage = express.Router();
    const Links = db.model('Links');

    Manage.get('/fromStat/:stat_id', async (req, res, next) => {
        try {
            const link = await Links.findOne({
                where: {
                    statistics_link: req.params.stat_id,
                },
            });

            if (link) {
                return res.json(link);
            } else {
                return next(new NotFoundError('Provided ID not found'));
            }
        } catch (error) {
            console.error(error);

            return next(new InternalServerError());
        }
    });

    Manage.post('/', async (req, res, next) => {
        if (!req.body.url) {
            return next(new BadRequestError('Missing required param URL'));
        }

        try {
            new URL(req.body.url);
        } catch (error) {
            return next(new BadRequestError('URL is malformed'));
        }

        try {
            const link = await createURL(db, req.body.url, Links);

            return res.json(link);
        } catch (error) {
            console.error(error);

            return next(new InternalServerError());
        }
    });

    Manage.delete('/:id', async (req, res, next) => {
        if (!req.params.id) {
            return next(new BadRequestError('Missing required param ID'));
        }

        if (isNaN(req.params.id)) {
            return next(new BadRequestError('ID should be integer'));
        }

        try {
            await Links.destroy({
                where: {
                    id: req.params.id,
                },
            });

            return res.json({
                status: 'OK',
            });
        } catch (error) {
            console.error(error);

            return next(new InternalServerError());
        }
    });

    // eslint-disable-next-line no-unused-vars
    Manage.use((err, req, res, next) => {
        ErrorHandler(err, res);
    });

    return Manage;
};
