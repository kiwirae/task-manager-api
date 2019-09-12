const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', (req, res) => {

    const task = new Task(req.body)

    task.save()
        .then((result) => res.status(201).send(result))
        .catch((error) => res.status(500).send(error))
})

router.get('/tasks', (req, res) => {
    Task.find({})
        .then((result) => res.send(result))
        .catch((error) => res.status(500).send(error))
})

router.get('/tasks/:id', (req, res) => {

    Task.findById(req.params.id)
        .then((result) => !result ? res.status(404).send() : res.send(result))
        .catch((error) => res.status(500).send(error))
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'isCompleted']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)

    } catch (error) {
        res.status(500).send(error)
    }

    // Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    //     .then((result) => !result ? res.status(404).send() : res.send(result))
    //     .catch((error) => res.status(500).send(error))
})

router.delete('/tasks/:id', (req, res) => {

    Task.findByIdAndDelete(req.params.id)
        .then((result) => !result ? res.status(404).send() : res.send(result))
        .catch((error) => res.status(500).send(error))
})

module.exports = router