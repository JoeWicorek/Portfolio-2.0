const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Request received for: ${req.url}`);
    
    // Default to index.html
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    
    // Get the file extension
    const extname = path.extname(filePath);
    
    // Set content type based on file extension
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
    }[extname] || 'text/plain';

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            
            if (err.code === 'ENOENT') {
                console.log(`File not found: ${filePath}, serving index.html instead`);
                // Page not found, serve index.html
                fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
                    if (err) {
                        console.error('Error serving index.html:', err);
                        res.writeHead(500);
                        res.end('Server Error');
                        return;
                    }
                    res.writeHead(200, { 
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin': '*' // Add CORS header
                    });
                    res.end(content, 'utf8');
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            console.log(`Successfully serving: ${filePath}`);
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*' // Add CORS header
            });
            res.end(content, 'utf8');
        }
    });
});

const PORT = 3456;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
