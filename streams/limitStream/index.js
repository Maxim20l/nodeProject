const LimitSizeStream = require('./LimitSizeStream');
const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.listen(3000, () => {
    console.log('server listen');
})

const limitedStream = new LimitSizeStream({ limit: 8 }); // 8 байт
const outStream = fs.createWriteStream('out.txt');

limitedStream.pipe(outStream);

limitedStream.write('hello'); // 'hello' - это 5 байт, поэтому эта строчка целиком записана в файл

setTimeout(() => {
    limitedStream.write('world'); // ошибка LimitExceeded! в файле осталось только hello
}, 2000);