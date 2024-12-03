const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from current directory
app.use(express.static('.'));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Grade routes
app.get('/grade', (req, res) => {
    res.send('Received GET request at /grade');
});

app.post('/grade', (req, res) => {
    res.send('Received POST request at /grade');
});

app.put('/grade', (req, res) => {
    res.send('Received PUT request at /grade');
});

app.delete('/grade', (req, res) => {
    res.send('Received DELETE request at /grade');
});

//Check for where server is running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});