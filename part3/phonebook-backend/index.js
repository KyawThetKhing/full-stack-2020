var express = require('express');
var morgan = require('morgan')
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

morgan.token('reqBody', function getReqBody(req) {
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))
const PORT = process.env.PORT || 3001;

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    response.send(`
    <h4>Phonebook has info for ${persons.length} people
    <br/>
    ${new Date()}
    </h4>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id === id);

    response.status(204).end();
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1001);

    return id;
}

app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log(body);
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    // morgan(':status :req[content-length]')

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Bad Request'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name already existed'
        })
    }

    persons = persons.concat(person);
    response.json(person)
})
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} `);

})