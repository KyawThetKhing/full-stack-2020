const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument:node mongo.js <password>')
    process.exit()

}
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.riyhh.mongodb.net/phone-book-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const peopleSchema = new mongoose.Schema({
    name: String,
    phoneNo: String,
    date: Date,
    important: Boolean
})

const People = mongoose.model('People', peopleSchema)

if (process.argv.length === 5) {
    const poeple = new People({
        name: process.argv[3],
        phoneNo: process.argv[4],
        date: new Date(),
        important: true
    })

    poeple.save().then(result => {
        console.log('result', result)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    People.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })

        mongoose.connection.close()
    })
}