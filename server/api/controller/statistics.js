/**
 * Creates route for getting statistics
 * @param {Sequelize} db
 * @returns {express.Router} Express route
 */
module.exports.route = function (db) {
    const express = require('express');
    const Statistics = express.Router();
    const Stats = db.model('Stats');
    const { Op } = require('sequelize');
    const { BadRequestError, InternalServerError } = require('../../utils/error/errors');
    const ErrorHandler = require('../../utils/error/handler');


    Statistics.get('/:id', async (req, res, next) => {
        const dateFrom = Date.parse(req.query.dateFrom);
        const dateTo = Date.parse(req.query.dateTo);

        if (isNaN(dateFrom) || isNaN(dateTo)) {
            return next(new BadRequestError('dateFrom or dateTo arguments have wrong values'));
        }

        try {
            const link = await Stats.findAll({
                where: {
                    link_id: req.params.id,
                    date: {
                        [Op.between]: [new Date(dateFrom), new Date(dateTo)],
                    },
                },
                attributes: ['date', 'click_count'],
            });

            return res.json(link);
        } catch (error) {
            console.error(error);

            return next(new InternalServerError());
        }
    });

    // eslint-disable-next-line no-unused-vars
    Statistics.use((err, req, res, next) => {
        ErrorHandler(err, res);
    });

    return Statistics;
};
