/**
 * @jest-environment node
 */

const request = require('supertest');
const express = require('express');

const Redirect = require('../../../server/api/controller/redirect');

const original_link = 'https://example.com'
const db = {
    model: (id) => {
        switch (id) {
        case 'Links':
            return {
                findOne: (query => {
                    switch (query.where.short_link) {
                    case '404':
                        return null;
                    case '500':
                        throw new Error('mock');
                    case 'noStat':
                        return {
                            original_link,
                            id: 'no-stat',
                        };
                    case 'stat':
                        return {
                            original_link,
                            id: 'stat',
                        };
                    case 'badStat':
                        return {
                            original_link,
                            id: '500',
                        }
                    }
                })
            }
        case 'Stats':
            return {
                findOne: (query => {
                    switch (query.where.link_id) {
                    case '500':
                        return {
                            save: async () => { throw new Error('mock') }
                        }
                    case 'no-stat':
                        return null;
                    case 'stat':
                        return {
                            save: async () => true,
                        };
                    }
                }),
                create: async () => true,
            }
        default:
            return {};
        }
    },
};

const app = express();
app.use('/', Redirect.route(db));
app.get('*', (req, res) => {
    res.status(404).json({});
});

describe('GET /{redirect_url}', () => {
    test('Should redirect if page existent, and able to create new stat', async () => {
        const { statusCode } = await request(app).get('/noStat');

        expect(statusCode).toEqual(302);
    });

    test('Should redirect if page existent, and able to append stat', async () => {
        const { statusCode } = await request(app).get('/stat');

        expect(statusCode).toEqual(302);
    });

    test('Should redirect if page existent, but unable to write stat', async () => {
        const { statusCode } = await request(app).get('/badStat');

        expect(statusCode).toEqual(302);
    });

    test('Should return 500 if db threw error', async () => {
        const { body, statusCode } = await request(app).get('/500');

        expect(statusCode).toEqual(500);
        expect(body.detail).toBeTruthy();
    });


    test('Should return 404 if url is not existent', async () => {
        const { statusCode } = await request(app).get('/404');

        expect(statusCode).toEqual(404);
    });
});
