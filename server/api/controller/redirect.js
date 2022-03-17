/**
 * Creates route for redirecting user from short link to full link
 * @param {Sequelize} db
 * @returns {express.Router} Express route
 */
module.exports.route = function (db) {
    const express = require('express');
    const Redirect = express.Router();
    const Links = db.model('Links');
    const Stats = db.model('Stats');
    const { InternalServerError } = require('../../utils/error/errors');
    const ErrorHandler = require('../../utils/error/handler');

    Redirect.get('/:short', async (req, res, next) => {
        let link;
        try {
            link = await Links.findOne({
                where: {
                    short_link: req.params.short,
                },
            });
        } catch (error) {
            console.error(error);

            return next(InternalServerError);
        }

        if (link) {
            // First we redirect user to his page
            res.redirect(link.original_link);

            // And then we are trying to record event
            const record = await Stats.findOne({
                where: {
                    link_id: link.id,
                    date: new Date(),
                },
            });

            try {
                if (record) {
                    record.click_count++;
                    await record.save();
                } else {
                    await Stats.create({
                        link_id: link.id,
                        date: new Date(),
                    });
                }
            } catch (error) {
                console.error('Unable to record stat:', error);
            }
        } else {
            return next();
        }
    });

    // eslint-disable-next-line no-unused-vars
    Redirect.use((err, req, res, next) => {
        ErrorHandler(err, res);
    });

    return Redirect;
};
