const WebSocket = require('ws');

const ws1 = new WebSocket('ws:localhost:1596');
const ws2 = new WebSocket('ws:localhost:1595');

const list = [ws1];

list.forEach(element => {
    element.on('message', function incoming(data) {
        console.log(data);
    });
});
