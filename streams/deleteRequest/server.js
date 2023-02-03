const http = require('http');
const fs = require('fs');
const url = require('url');


const server = http.createServer();
const setStatusCode = (res, code, message) => {
    res.statusCode = code;
    res.end(message)
}
server.on('request', (req, res) => {
    try {
        if (req.method === 'DELETE') {
            const path = url.parse(req.url).pathname.slice(1);
            fs.unlinkSync(path, (error) => {
                if (error) throw error;
            }
            )
            setStatusCode(res, 200, 'All was ok');
        }
        res.end()
    } catch (error) {
        if (error.code === 'ENOENT') {
            setStatusCode(res, 404, 'file not found');
        } else {
            setStatusCode(res, 500, 'some troubles')
        }

    }

})

module.exports = server;