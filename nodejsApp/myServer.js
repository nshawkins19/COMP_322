const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Get the URL path
    let urlPath = req.url;
    
    // Remove any query parameters and convert to lowercase
    urlPath = urlPath.split('?')[0].toLowerCase();
    
    // Define file path based on URL
    let filePath;
    if (urlPath === '/' || urlPath === '/index') {
        filePath = path.join(__dirname, 'public', 'index.html');
    } else if (urlPath === '/introduction') {
        filePath = path.join(__dirname, 'public', 'introduction.html');
    } else if (urlPath.startsWith('/images/')) {
        // Handle requests for images
        filePath = path.join(__dirname, urlPath);
    } else {
        // Handle 404 for unknown routes
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404 Not Found');
        return;
    }

    // Get the file extension
    const ext = path.extname(filePath);
    
    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('404 Not Found');
            } else {
                // Server error
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('500 Server Error');
            }
        } else {
            // Set the correct content type based on file extension
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    //console.log(`Server running at http://localhost:${PORT}/`);
});