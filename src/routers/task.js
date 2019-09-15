const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)

    // task.save()
    //     .then((result) => res.status(201).send(result))
    //     .catch((error) => res.status(500).send(error))

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(500).send(error)
    }
    
})

// GET /tasks?isCompleted=true
// GET /tasks?limit=10&skip20
// GET /tasks?sortyBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    // Task.find({})
    //     .then((result) => res.send(result))
    //     .catch((error) => res.status(500).send(error))
    const { isCompleted, limit, skip } = req.query
    const match = {}
    const sort = {}

    if (req.query.isCompleted) {
        match.isCompleted = isCompleted === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    // Task.findById(req.params.id)
    //     .then((result) => !result ? res.status(404).send() : res.send(result))
    //     .catch((error) => res.status(500).send(error))
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'isCompleted']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        // const task = await Task.findById(req.params.id)

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

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

router.delete('/tasks/removeAll', auth, async (req, res) => {
    try {
        const tasks = await Task.deleteMany({ owner: req.user._id })
        res.send(tasks)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    // Task.findByIdAndDelete(req.params.id)
    //     .then((result) => !result ? res.status(404).send() : res.send(result))
    //     .catch((error) => res.status(500).send(error))

    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(error) {
        res.status(500).send(error)
    }
})

module.exports = router