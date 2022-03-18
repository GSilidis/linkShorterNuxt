/**
 * @jest-environment node
 */

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { UniqueConstraintError } = require('sequelize');

const Manage = require('../../../server/api/controller/manage');

const mockStat = [{
    date: '2022-03-18',
    click_count: 1,
},{
    date: '2022-03-17',
    click_count: 2,
}]

let successCounter = 1;
const db = {
    model: (id) => {
        switch (id) {
        case 'Links':
            return {
                findOne: ((query) => {
                    switch (query.where.statistics_link) {
                    case '404':
                        return null;
                    case '500':
                        throw new Error('mock');
                    default:
                        return { mock: true };
                    }
                }),
                destroy: ((query) => {
                    switch (query.where.id) {
                    case '500':
                        throw new Error('mock');
                    default:
                        return true;
                    }
                }),
                create: ((item) => {
                    if (item.original_link === 'http://500.com')
                        throw new Error('mock')
                    else {
                        if (successCounter % 2 === 0) {
                            return item;
                        } else {
                            successCounter++;
                            throw new UniqueConstraintError({});
                        }
                    }
                })
            }
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
app.use(bodyParser.json());
app.use('/link', Manage.route(db));


describe('GET /api/link/fromStat', () => {
    test('Should return 200 when request is correct', async () => {
        const { body, statusCode } = await request(app).get('/link/fromStat/1');

        expect(statusCode).toEqual(200);
        expect(body).toEqual({ mock: true });
    });

    test('Should return 404 when id not found', async () => {
        const { body, statusCode } = await request(app).get('/link/fromStat/404');

        expect(statusCode).toEqual(404);
        expect(body.detail).toBeTruthy();
    });

    test('Should return 500 on db error', async () => {
        const { body, statusCode } = await request(app).get('/link/fromStat/500');

        expect(statusCode).toEqual(500);
        expect(body.detail).toBeTruthy();
    });
});

describe('POST /api/link/', () => {
    test('Should return 200 when request is correct', async () => {
        const mockUrl = 'https://example.com';
        const { body, statusCode } = await request(app)
            .post('/link/')
            .send({ url: mockUrl });

        expect(statusCode).toEqual(200);
        expect(body.short_link).toBeTruthy();
        expect(body.statistics_link).toBeTruthy();
        expect(body.original_link).toEqual(mockUrl);
    });

    test('Should return 400 when url not porvided', async () => {
        const { body, statusCode } = await request(app)
            .post('/link/');

        expect(statusCode).toEqual(400);
        expect(body.detail).toEqual('Error: Missing required param URL');
    });

    test('Should return 400 when url is malformed', async () => {
        const { body, statusCode } = await request(app)
            .post('/link/')
            .send({ url: 'junk' });

        expect(statusCode).toEqual(400);
        expect(body.detail).toEqual('Error: URL is malformed');
    });

    test('Should return 500 on db error', async () => {
        const { body, statusCode } = await request(app)
            .post('/link/')
            .send({ url: 'http://500.com' });

        expect(statusCode).toEqual(500);
        expect(body.detail).toBeTruthy();
    });
});

describe('DELETE /api/link/{id}', () => {
    test('Should return 200 when request is correct', async () => {
        const { body, statusCode } = await request(app).delete('/link/1');

        expect(statusCode).toEqual(200);
        expect(body).toEqual({ status: 'OK' });
    });

    test('Should return 400 when provided id is malformed', async () => {
        const { body, statusCode } = await request(app).delete('/link/qwerty');

        expect(statusCode).toEqual(400);
        expect(body.detail).toEqual('Error: ID should be integer');
    });

    test('Should return 500 on db error', async () => {
        const { body, statusCode } = await request(app).delete('/link/500');

        expect(statusCode).toEqual(500);
        expect(body.detail).toBeTruthy();
    });
});
