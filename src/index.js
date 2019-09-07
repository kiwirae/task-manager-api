const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {

    const user = new User(req.body)

    user.save()
        .then((result) => {
            res.status(201).send(result)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

app.get('/users', (req, res) => {
    User.find({})
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id)
        .then((result) => {
            if (!result) {
                return res.status(404).send()
            }
            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

app.post('/tasks', (req, res) => {

    const task = new Task(req.body)

    task.save()
        .then((result) => {
            res.status(201).send(result)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id)
        .then((result) => {
            if (!result) {
                return res.status(404).send()
            }

            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})