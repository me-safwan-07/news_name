const express = require('express');

const app = express();
const PORT = 8000;

app.get('/', (req,res) => {
    res.send('Hello, World!');
})

app.get('/about', (req, res) => {
    res.send('This is the About Page');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})