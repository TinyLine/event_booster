const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 1234;

// Настройка CORS
const corsOptions = {
    origin: 'http://localhost:1234',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const consumerKey = 'EGzZa0Jvwm4AMHpN1AZK1ThqRMyMAp80';
const consumerSecret = 'ZGaYZdP9PNrFnF6A';

app.post('/api/token', async (req, res) => {
    try {
        const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
        const response = await axios.post('https://developer.ticketmaster.com/oauth2/token', 'grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при получении токена:', error);
        res.status(500).send('Ошибка при получении токена');
    }
});

app.get('/api/events', async (req, res) => {
    const page = req.query.page || 0;
    try {
        const token = req.headers.authorization.split(' ')[1];
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при получении событий:', error);
        res.status(500).send('Ошибка при получении событий');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});


const credentials = Buffer.from('EGzZa0Jvwm4AMHpN1AZK1ThqRMyMAp80:ZGaYZdP9PNrFnF6A').toString('base64');
console.log(credentials);