const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('Connnecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(
        result => {
            console.log('Connected to MongoDB')
        }
    )
    .catch((error) => {
        console.log('Error connecting to mongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    phoneNo: String,
    date: Date,
    important: Boolean
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Person', personSchema)