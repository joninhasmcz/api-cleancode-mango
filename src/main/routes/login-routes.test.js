const request = require('supertest');
const app = require('../config/app')
const bcrypt = require('bcrypt')
const MongoHelper = require('../../infra/helpers/mongo-helper')
const test = require("node:test");
let userModel

describe('Login Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGODB_URI)
        userModel = await MongoHelper.getCollection('users')
    })

    beforeEach(async () => {
        await userModel.deleteMany()
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    test('Should return 200 when valid credentials are provided', async () => {
        await userModel.insertOne({
            email: 'valid_email.com',
            password: await bcrypt.hash('hashed_password', 10)
        })
        console.log(bcrypt.hashSync('hashed_password', 10))
        await request(app)
            .post('/api/login')
            .send({
                email: 'valid_email.com',
                password: 'hashed_password'
            })
            .expect(200)
    })
    test('Should return 401 when invalid credentials are provided', async () => {
        await request(app)
            .post('/api/login')
            .send({
                email: 'invalid_email.com',
                password: 'hashed_password'
            })
            .expect(401)
    })


})