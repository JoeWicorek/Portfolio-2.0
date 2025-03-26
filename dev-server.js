const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        // Set proper content types for different file types
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
        }
        // Enable caching for static files
        res.setHeader('Cache-Control', 'public, max-age=31557600');
    }
}));

// For any route not found in static files, serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Serving files from: ${path.join(__dirname, 'public')}`);
});
