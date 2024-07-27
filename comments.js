// Create web server
// 1. Create web server
// 2. Read the comments from the file
// 3. Send comments to the client
// 4. Add new comments
// 5. Save comments to the file
// 6. Send comments to the client
// 7. Listen to the port

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');

const commentsPath = path.join(__dirname, 'comments.json');

function readComments(callback) {
    fs.readFile(commentsPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return callback(null, []);
            }
            return callback(err);
        }
        try {
            const comments = JSON.parse(data);
            callback(null, comments);
        } catch (err) {
            callback(err);
        }
    });
}

function writeComments(comments, callback) {
    fs.writeFile(commentsPath, JSON.stringify(comments), callback);
}

function handleRequest(req, res) {
    if (req.method === 'GET') {
        readComments((err, comments) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(
                comments
            ))
            
        });
    }