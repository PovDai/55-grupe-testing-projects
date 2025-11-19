import express from 'express'
import cors from 'cors';
import helmet from "helmet";

import { PORT } from './src/env.js';
import { cookieParser } from './src/middleware/cookieParser.js';
import { userData } from './src/middleware/userData.js';
import { isPublic } from './src/middleware/isPublic.js';
import { isAdmin } from './src/middleware/isAdmin.js';
import { postPublicLogin } from './src/api/public/postLogin.js';
import { postPublicRegister } from './src/api/public/postRegister.js';
import { getLogin } from './src/api/public/getLogin.js';


const app = express()

app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5560',
}));
app.use(cookieParser);
app.use(userData);




app.get('/', (req, res) => {
  res.send('Hello World! Server is running on localhost:5559')
})

app.post('/api/register', isPublic, postPublicRegister);
app.post('/api/login', isPublic, postPublicLogin);

app.get('/api/login', isAdmin, getLogin);

const API_KEY = process.env.ALPHA_VANTAGE_KEY; 

const APICOUNTRIES_KEY = process.env.APICOUNTRIES_KEY;
const APOD_KEY = process.env.APOD_KEY;


app.get('/api/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Nepavyko gauti duomenų' });
  }
});

app.get('/api/advice', async (req, res) => {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nepavyko gauti patarimo' });
  }
});

app.get('/api/countries', async (req, res) => {
  const { name } = req.query;
  try {
    const url = `https://www.apicountries.com/countries?apikey=${APICOUNTRIES_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`APICountries error: ${text}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('APICountries negrąžino masyvo');
    }

    let filtered = data;
    if (name) {
      const search = name.toLowerCase();
      filtered = data.filter(country =>
        country.name?.toLowerCase().includes(search)
      );
    }

    res.json(filtered);
  } catch (error) {
    console.error('Backend /api/countries error:', error.message);
    res.status(500).json({ error: 'Nepavyko gauti šalių duomenų', details: error.message });
  }
});


app.get('/api/apod', async (req, res) => {
  const { date } = req.query; // optional
  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}${date ? `&date=${date}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`NASA API error: ${text}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Backend error:', err.message);
    res.status(500).json({ error: 'Nepavyko gauti duomenų iš NASA', details: err.message });
  }
});








app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send('Server error');
});



app.get('*error', (req, res) => {
    return res.json({
        status: 'error',
        message: 'No such route',
    });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`)
}) 