require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

morgan.token('requestData', (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :requestData'
  )
);

app.get('/version', (req, res) => {
  res.send('v0.0.4');
});

app.get('/health', (req, res) => {
  res.send('ok');
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => next(error));
});

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(
        `<p>Phonebook has info for ${count} people</p><br />${new Date()}`
      );
    })
    .catch((error) => next(error));
});

app.post('/api/persons/', (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing'); // eslint-disable-line
  app.use('/api/testing', testingRouter);
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'ValidationError') {
    res.status(400).send({ error: error.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
