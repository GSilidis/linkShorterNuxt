/**
 * @jest-environment node
 */

const request = require('supertest');
const express = require('express');

const Statistics = require('../../../server/api/controller/statistics');

const mockStat = [{
        date: '2022-03-18',
        click_count: 1,
    },{
        date: '2022-03-17',
        click_count: 2,
}]

const db = {
    model: (id) => {
        switch (id) {
        case 'Stats':
            return {
                findAll: ((query) => {
                    if (query.where.link_id === '500')
                        throw new Error('mock');
                    else
                        return mockStat;
                }),
            }
        default:
            return {};
        }
    },
};

const app = express();
app.use('/statistics', Statistics.route(db));


describe('GET /api/statistics', () => {
    test('Should return 200 when request is correct', async () => {
        const { body, statusCode } = await request(app).get('/statistics/1?dateFrom=2022-03-18&dateTo=2022-03-30');

        expect(statusCode).toEqual(200);
        expect(body).toEqual(mockStat);
    });

    test('Should return 500 on db error', async () => {
        const { body, statusCode } = await request(app).get('/statistics/500?dateFrom=2022-03-18&dateTo=2022-03-30');

        expect(statusCode).toEqual(500);
        expect(body.detail).toBeTruthy();
    });

    test('Should 400 when missing dateFrom', async () => {
        const { body, statusCode } = await request(app).get('/statistics/1?dateTo=2022-03-18');

        expect(statusCode).toEqual(400);
        expect(body.detail).toEqual('Error: dateFrom or dateTo arguments have wrong values');
    });

    test('Should return 400 on missing dateTo', async () => {
        const { body, statusCode } = await request(app).get('/statistics/1?dateFrom=2022-03-18');

        expect(statusCode).toEqual(400);
        expect(body.detail).toEqual('Error: dateFrom or dateTo arguments have wrong values');
    });
});
