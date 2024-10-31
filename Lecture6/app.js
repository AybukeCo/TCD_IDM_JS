const http = require("http");
const fs = require("fs");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    fs.readFile(__dirname + "/index.html", function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;
        console.log(content);
    })
 };

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});