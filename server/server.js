import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import newsRoutes from './routes/newsRoutes.js';
import { demodata } from './controllers/demo.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors({ 
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    optionsSuccessStatus: 200 
}));

// Basic Routes
app.get('/', (req, res) => res.send('Hello, World!'));
app.get('/about', (req, res) => res.send('This is the About Page'));

// Use Routes
app.use('/api/news', newsRoutes);
app.use('/api/demo', demodata);

// MongoDB Connection
mongoose
    .connect('mongodb+srv://mesafwan07:Muha_2005@cluster0.uvnxh.mongodb.net/news-website?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected...'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: err.message || 'Something went wrong',
    });
});

// Server Listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
