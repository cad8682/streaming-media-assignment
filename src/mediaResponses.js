const fs = require('fs');
const path = require('path');

/*
const getParty = (request, response) => {
    const file = path.resolve(__dirname, '../client/party.mp4');

    fs.stat(file, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                response.writeHead(404);
            }
            return response.end(err);
        }

        let { range } = request.headers;

        if (!range) {
            range = 'bytes=0-';
        }

        const positions = range.replace(/bytes=/, '').split('-');

        let start= parseInt(positions[0], 10);

        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

        if (start > end) {
            start = end - 1;
        }

        const chunksize = (end - start) + 1;

        response.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        });

        const stream = fs.createReadStream(file, { start, end });

        stream.on('open', () => {
            stream.pipe(response);
        });

        stream.on('error', (streamErr) => {
            response.end(streamErr);
        });

        return stream;
    });
};*/

/*
Listening on 127.0.0.1:3000
/
/party.mp4
node:_http_outgoing:875
    throw new ERR_INVALID_ARG_TYPE(
    ^

TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. Received an instance of Error
    at new NodeError (node:internal/errors:405:5)
    at write_ (node:_http_outgoing:875:11)
    at ServerResponse.end (node:_http_outgoing:1026:5)
    at C:\Users\starf\source\repos\IGME 430\Streaming Media Assignment\streaming-media-assignment\src\mediaResponses.js:74:29
    at FSReqCallback.oncomplete (node:fs:202:21) {
  code: 'ERR_INVALID_ARG_TYPE'
}
*/

const getParty = (request, response) => {
    loadFile(request, response, '../cient/party.mp4', 'video/mp4');
};
const getBling = (request, response) => {
    loadFile(request, response, '../cient/bling.mp3', 'audio/mpeg');
};
const getBird = (request, response) => {
    loadFile(request, response, '../cient/bird.mp4', 'video/mp4');
};

const loadFile = (request, response, mediaPath, contentType) => {
    const file = path.resolve(__dirname, mediaPath);

    fs.stat(file, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                response.writeHead(404);
            }
            return response.end(err);
        }

        let { range } = request.headers;

        if (!range) {
            range = 'bytes=0-';
        }

        const positions = range.replace(/bytes=/, '').split('-');

        let start= parseInt(positions[0], 10);

        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

        if (start > end) {
            start = end - 1;
        }

        const chunksize = (end - start) + 1;

        response.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': contentType,
        });

        const stream = fs.createReadStream(file, { start, end });

        stream.on('open', () => {
            stream.pipe(response);
        });

        stream.on('error', (streamErr) => {
            response.end(streamErr);
        });

        return stream;
    });
};

module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;