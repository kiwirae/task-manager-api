const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const data = {
        name: "Kiwi",
        email: 'kiwi@example.com',
        password: 'mytestpass702'
    }
    const response = await request(app)
        .post('/users')
        .send(data)
        .expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about response
    expect(response.body).toMatchObject({
        user: {
            name: user.name,
            email: user.email,
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mytestpass702')
})

test('Should login existing user', async () => {
    const data = {
        email: userOne.email,
        password: userOne.password
    }
    const response = await request(app)
        .post('/users/login')
        .send(data)
        .expect(200)

    const user = await User.findById(userOneId)

    expect(response.body).toMatchObject({
        user: {
            name: user.name,
            email: user.email
        },
        token: user.tokens[1].token
    })
    expect(user.password).not.toBe(data.password)
})

test('Should not login nonexistent user', async () => {
    const data = {
        email: 'badEmail@example.com',
        password: 'badpass1234'
    }
    await request(app)
        .post('/users/login')
        .send(data)
        .expect(400)
})

test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user account', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

// test('Should not upload avatar image of unauthenticated user', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .attach('avatar', 'tests/fixtures/profile-pic.jpg')
//         .expect(401)
// })

test('Should update valid user fields', async () => {
    const data = {
        name: 'KiwiUpdatedTest'
    }

    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(data)
        .expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.name).toBe(data.name)
    expect(user.name).toBe(data.name)
})

test('Should not update invalid user fields', async () => {
    const data = {
        location: 'Philippines'
    }

    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(data)
        .expect(400)
})

// test('Should not update unauthenticated user', async () => {
//     const data = {
//         name: 'KiwiUpdatedTest'
//     }

//     await request(app)
//         .patch('/users/me')
//         .send(data)
//         .expect(401)
// })