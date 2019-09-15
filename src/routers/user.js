const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(error) {
        res.status(400).send(error)
    }

    // user.save()
    //     .then((result) => res.status(201).send(result))
    //     .catch((error) => res.status(400).send(error))
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>token.token !== req.token)
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/users/me', auth, async (req, res) => {
    // User.find({})
    //     .then((result) => res.send(result))
    //     .catch((error) => res.status(500).send(error))

    res.send(req.user)
})

// router.get('/users/:id', (req, res) => {

//     User.findById(req.params.id)
//         .then((result) => !result ? res.status(404).send() : res.send(result))
//         .catch((error) => res.status(500).send(error))
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        // const user = await User.findById(req.params.id)

        // if (!user) {
        //     return res.status(404).send()
        // }

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(error) {
        res.status(500).send(error)
    }

    // User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    //     .then((result) => !result ? res.status(404).send : res.send(result))
    //     .catch((error) => res.status(500).send(error))
})

router.delete('/users/me', auth, async (req, res) => {

    // User.findByIdAndDelete(req.user._id)
    //     .then((result) => !result ? res.status(404).send() : res.send(result))
    //     .catch((error) => res.status(500).send(error))

    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()

        res.send(req.user)
    } catch(error) {
        res.status(500).send(error)
    }

})

module.exports = router