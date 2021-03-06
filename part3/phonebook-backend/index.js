require('dotenv').config()
var express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('reqBody', function getReqBody(req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        console.log('People', people)
        response.json(people)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        response.send(`
        <h4>Phonebook has info for ${people.length} people
        <br/>
        ${new Date()}
        </h4>
        `)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(
            result => {
                console.log('Resutl', result)
                response.status(204).end()
            }
        )
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'Bad Request' })
    }

    const person = new Person({
        name: body.name,
        phoneNo: body.number,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    console.log('Body', request.body, request.params.id)
    const body = request.body
    const person = {
        name: body.name,
        phoneNo: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(
            updatedPerson => response.json(updatedPerson)
        )
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)


    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} `)

})