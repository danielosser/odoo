/* eslint-env worker */
/* eslint-disable no-restricted-globals */
/* global WebsocketBaseWorker */

importScripts('/bus/static/src/js/workers/websocket_base_worker.js');

class SimpleWebsocketWorker extends WebsocketBaseWorker {
    broadcast(type, data) {
        postMessage({type, data});
    }
}

const websocketWorker = new SimpleWebsocketWorker();
self.addEventListener('message', websocketWorker.onMessage);

