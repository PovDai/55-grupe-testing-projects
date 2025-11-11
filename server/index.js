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
  res.send('Hello World!')
})

app.post('/api/register', isPublic, postPublicRegister);
app.post('/api/login', isPublic, postPublicLogin);

app.get('/api/login', isAdmin, getLogin);


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