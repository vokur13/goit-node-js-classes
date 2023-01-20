import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from 'express';
const cors = require('cors');
import morgan from 'morgan';
import got from 'got';
const app = express();

const PORT = process.env.PORT || 8088;
const KEY = process.env.WEATHER_API_KEY;
const baseURL = 'http://api.weatherbit.io/v2.0/current';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());

app.get('/api/weather', async (req, res) => {
  try {
    // req.query.param
    // req.params
    // req.body
    // req.headers

    //    lat: '66.410025',
    //     lon: '112.360042',

    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ message: 'lat and lon params are mandatory' });
    }

    const response = await got(baseURL, {
      searchParams: {
        key: KEY,
        lang: 'en',
        units: 'M',
        lat: lat,
        lon: lon,
      },
      responseType: 'json',
    });
    const [weatherData] = response.body.data;

    if (!weatherData) {
      return res.status(400).json({ message: 'check lat&lon data' });
    }

    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData;
    res.json({ city_name, description, temp });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      code: 500,
      message: err.message,
      data: 'Internal Server Error',
    });
  }
});

function Server(error) {
  if (error) {
    console.log('Error at server lunch', error);
  }
  console.log(`Server starts at Port: ${PORT}`);
}

app.listen(PORT, Server);
