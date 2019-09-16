const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const me = new User({
//     name: 'Kiwz',
//     email: 'reijimaigo8@gmail.com',
//     password: '123456password',
//     age: 29
// })

// me.save()
//     .then((result) => console.log(result))
//     .catch((error) => console.log('Error: ', error.message))

// const todo = new Task({
//     description: '       Play Monster Hunter      '
// })

// todo.save()
//     .then((result) => console.log(result))
//     .catch((error) => console.log('Error: ', error.message))