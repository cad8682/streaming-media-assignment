const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);

    switch(request.url) {
        case '/party':
        case '/party.mp4':
            mediaHandler.getParty(request, response);
            break;
        case '/bling':
        case '/bling.mp3':
            mediaHandler.getBling(request, response);
            break;
        case '/bird':
        case '/bird.mp4':
            mediaHandler.getBird(request, response);
            break;
        case '/':
        default:
            htmlHandler.getIndex(request, response);
            break;
    }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});