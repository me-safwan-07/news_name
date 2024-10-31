import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import newsRoutes from './routes/newsRoutes.js';
import { demodata } from './controllers/demo.js';

const app = express();
const PORT = 8000;

app.get('/', (req,res) => {
    res.send('Hello, World!');
})

app.get('/about', (req, res) => {
    res.send('This is the About Page');
})


mongoose
    .connect('mongodb+srv://mesafwan07:Muha_2005@cluster0.uvnxh.mongodb.net/news-website')
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

app.use(express.json());

const corsConfig = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use("", cors(corsConfig));
app.use(cors(corsConfig));
app.use('/api/news', newsRoutes);
app.use('/demo', demodata);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});