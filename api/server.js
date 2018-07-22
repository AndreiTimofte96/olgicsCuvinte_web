const express = require('express');


const chalk = require('chalk'); // pt colorare mesaje
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // afiseaza ce req sunt facute
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 2225;
const { algorithmRoutes } = require('./algorithmRoutes');
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', function (req, res) {
  res.send('Olgics CUVINTE');
});

app.get('/getWords', algorithmRoutes);

app.listen(PORT, '0.0.0.0', () => {
  debug(`listening at port ${chalk.green(PORT)}`);
});
