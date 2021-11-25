/* eslint-env worker */
/* eslint-disable no-restricted-globals */
/* global WebsocketBaseWorker */

importScripts('/bus/static/src/js/workers/websocket_base_worker.js');


const clients = new Set();
class SharedWebsocketWorker extends WebsocketBaseWorker {
    broadcast(type, data) {
        clients.forEach(c => c.postMessage({type, data}));
    }
}

const websocketWorker = new SharedWebsocketWorker();

/**
 * Called when a client connects to the shared worker.
 */
onconnect = function (e) {
    // Keep track of the connected clients.
    const currentClient = e.ports[0];
    clients.add(currentClient);
    currentClient.onmessage = websocketWorker.onMessage;
};


