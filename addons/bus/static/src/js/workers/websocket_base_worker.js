/**
 * Notification types used to communicate between the worker and the service
 * that uses it.
 *
 * @typedef {'CONNECT' | 'CONNECTION_LOST' | 'CLOSE' | 'MESSAGE'} NotificationType
 */

/**
 * This class regroup the logic necessary in order for the SharedWorker/Worker to work.
 * Indeed, Safari and some minor browsers does not support SharedWorker. In order to
 * solve this issue, a Worker is used in this case. The logic is almost the same than
 * the one used for SharedWorker and this class implements it.
 */
class WebsocketBaseWorker {
    static NOTIFICATION_TYPES = Object.freeze({
        CONNECT: 'CONNECT',
        CONNECTION_LOST: 'CONNECTION_LOST',
        CLOSE: 'CLOSE',
        MESSAGE: 'MESSAGE',
    });

    constructor() {
        this.connectRetryDelay = 1000;
        this.connectTimeout = null;
        this.message_wait_queue = [];
        this.lastNotificationID = 0;
        this.start = this.start.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onWebsocketClose = this.onWebsocketClose.bind(this);
        this.onWebsocketError = this.onWebsocketError.bind(this);
        this.onWebsocketMessage = this.onWebsocketMessage.bind(this);
        this.start();
    }

    start() {
        return new Promise(resolve => {
            this.removeWebsocketListeners();
            this.websocket = new WebSocket(`${self.location.protocol === 'https:' ? 'wss' : 'ws'}://${self.location.host}/websocket`);
            this.websocket.addEventListener('open', () => {
                clearTimeout(this.connectTimeout);
                this.message_wait_queue.forEach(msg => this.websocket.send(msg));
                this.message_wait_queue = [];
                this.connectRetryDelay = 1000;
                this.broadcast(WebsocketBaseWorker.NOTIFICATION_TYPES.CONNECT);
                resolve();
            });
            this.websocket.addEventListener('error', this.onWebsocketError);
            this.websocket.addEventListener('message', this.onWebsocketMessage);
            this.websocket.addEventListener('close', this.onWebsocketClose);
        });
    }

    /**
     * Called when a message it posted to the worker. This message is
     * sent through the socket.
     *
     * @param {MessageEvent} messageEv
     */
    onMessage(messageEv) {
        const {path, data} = messageEv.data;
        if (path === '/subscribe') {
            // lastNotificationID is hold by the worker, let's add it to the subscription.
            data['last'] = this.lastNotificationID;
        }
        if (!this.websocket || this.websocket.readyState !== 1) {
            this.message_wait_queue.push(JSON.stringify({path, data}));
        } else {
            this.websocket.send(JSON.stringify({path, data}));
        }
    }

    /**
    * When notifications are retreived from the bus, extract them from the event, only keep the
    * message and keep track of the last notification id we received. Finally, send them to the
    * clients.
    *
    * @param {MessageEvent} messageEv
    */
    onWebsocketMessage(messageEv) {
        const notifs = JSON.parse(messageEv.data).map(n => {
            if (n.id > this.lastNotificationID) {
                this.lastNotificationID = n.id;
            }
            return n.message;
        });
        this.broadcast(WebsocketBaseWorker.NOTIFICATION_TYPES.MESSAGE, notifs);
    }

    /**
     * Triggered when a connection was established then closed. If closure was not clean (ie. code
     * !== 1000), try to reconnect after indicating to the clients that the connection was closed.
     *
     * @param {CloseEvent} ev
     */
    onWebsocketClose(ev) {
        // 1000 means the connection has been closed cleanly. We only trigger the
        // reconnect attempts if the connection has been closed abruptly.
        if (ev.code !== 1000) {
            this.start();
            this.broadcast(WebsocketBaseWorker.NOTIFICATION_TYPES.CLOSE, {code: ev.code, reason: ev.reason});
        }
    }

    /**
     * Triggered when a connection could not be established. Apply an exponential backoff to the
     * reconnect attempts.
     */
    onWebsocketError() {
        // Prevent the close event to be triggered in this case (both close and error events are
        // triggered but only the error event makes sense).
        this.websocket.removeEventListener('close', this.onWebsocketClose);
        this.connectRetryDelay = this.connectRetryDelay * 1.5 + 500 * Math.random();
        this.connectTimeout = setTimeout(this.start, this.connectRetryDelay);
        this.broadcast(WebsocketBaseWorker.NOTIFICATION_TYPES.CONNECTION_LOST);
    }

    removeWebsocketListeners() {
        if (this.websocket) {
            this.websocket.removeEventListener('message', this.onWebsocketMessage);
            this.websocket.removeEventListener('close', this.onWebsocketClose);
            this.websocket.removeEventListener('error', this.onWebsocketError);
        }
    }

    /**
     * Send the message to all the clients that are connected to the worker.
     *
     * @param {NotificationType} type
     * @param {any} data
     */
    broadcast(type, data) {
        // To be implemented by workers.
    }

}
