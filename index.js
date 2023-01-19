const express = require('express');
const morgan = require('morgan');

const app = express();

const PORT = 8088;

// function requestHandler(request, response) {
//   response.sendStatus(200);
// }

// app.use((req, res) => {
//   //   res.redirect('https://google.com');
//   //   res.json({ javascript: 'object' });
//   res.status(500).json({ javascript: 'object' });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(morgan('combined'));
app.use(morgan('tiny'));

// app.use((req, res, next) => {
//   console.log(`${req.method}, ${req.originalUrl}, ${new Date().toISOString()}`);
//   next();
// });

app.get('/home', (request, response) => {
  response.send('get request');
});

app.post('/home', (req, res) => {
  if (!req.body.goit) {
    return res.status(400).json({ status: 'goit parameter is required' });
  }

  res.send({ javascript: 'object - QWERTY', body: req.body });
});

app.delete('/home', (request, response) => {
  response.send('delete request');
});

function Server(error) {
  if (error) {
    console.log('Error at server lunch', error);
  }
  console.log(`Server starts at Port: ${PORT}`);
}

app.listen(PORT, Server);
