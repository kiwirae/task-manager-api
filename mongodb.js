// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Kiwz',
    //     age: 29
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Hazel',
    //         age: 26
    //     }, {
    //         name: 'test',
    //         age: 3
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Feed Bruno',
    //         isCompleted: false
    //     }, {
    //         description: 'Cook Rice',
    //         isCompleted: true
    //     }, {
    //         description: 'Buy Cigarettes',
    //         isCompleted: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({ name: 'Kiwi'}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch user')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').findOne({ _id: new ObjectID('5d70cb04903ad0456ce9c93c') }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch user')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ name: 'Kiwi' }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5d70cccc189f273f30933e4b')
    // }, {
    //     $set: {
    //         name: 'Rae'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


})