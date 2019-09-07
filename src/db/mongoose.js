const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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