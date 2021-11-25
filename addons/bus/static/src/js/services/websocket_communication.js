/* bus_service must depend on this, but it seems that new services
cannot depend on old services, here is the new module version of this file:
https://bin.readthedocs.fr/rtorip.js */
odoo.define('bus.WebsocketCommunication', function (require) {
'use strict';

const AbstractService = require('web.AbstractService');
const core = require('web.core');
const {WebsocketSessionExpiredError, WebsocketInvalidRequestError} = require("@bus/js/websocket_errors");

const WebsocketCommunication = AbstractService.extend({
    _connectionLostNotification: null,
    CLOSE_CODES: Object.freeze({
        INVALID_DATABASE: 4001,
        SESSION_EXPIRED: 4002,
        INVALID_REQUEST: 4003,
    }),
    NOTIFICATION_TYPES: Object.freeze({
        CONNECT: 'CONNECT',
        CONNECTION_LOST: 'CONNECTION_LOST',
        CLOSE: 'CLOSE',
        MESSAGE: 'MESSAGE',
    }),

    init: function (env) {
        this.env = env;
        this._handlers = new Set();
        if ('SharedWorker' in window) {
            this.worker = new SharedWorker('bus/static/src/js/workers/websocket_shared_worker.js', {name: "odoo:websocket_shared_worker"});
            this.worker.port.start();
            this.worker.port.addEventListener('message', this._handleNotifications.bind(this));
        } else {
            // Fallback for browsers which does not support SharedWorker.
            this.worker = new Worker('bus/static/src/js/workers/websocket_simple_worker.js', {name: "odoo:websocket_worker"});
            this.worker.addEventListener('message', this._handleNotifications.bind(this));
            this.send = message => this.worker.postMessage(message);
        }
    },

   //--------------------------------------------------------------------------
   // PUBLIC
   //--------------------------------------------------------------------------

    /**
     * Send a message through the socket.
     *
     * @param {any} message
     */
    send: async function (message) {
        this.worker.port.postMessage(message);
    },
    /**
     * Register an handler to be called when a notification is received.
     *
     * @param {func} handler
     */
    registerHandler: function (handler) {
        this._handlers.add(handler);
    },

   //--------------------------------------------------------------------------
   // PRIVATE
   //--------------------------------------------------------------------------

    /**
     * Handle notification received from the shared worker.
     *
     * @param {MessageEvent} messageEv
     * @param {{type: NotificationType, data: any}[]}  messageEv.data
     */
    _handleNotifications: function (messageEv) {
        const {type, data} = messageEv.data;
        switch (type) {
            case this.NOTIFICATION_TYPES.MESSAGE:
                this._handlers.forEach(handler => setTimeout(() => handler(data)));
                break;
            case this.NOTIFICATION_TYPES.CONNECTION_LOST:
                if (!this._connectionLostNotification) {
                    this._connectionLostNotification = this.env.services.notification.notify({
                        title: this.env._t("Websocket connection lost. Trying to reconnect..."),
                        sticky: true,
                    });
                }
                break;
            case this.NOTIFICATION_TYPES.CONNECT:
                if (this._connectionLostNotification) {
                    this.env.services.notification.close(this._connectionLostNotification);
                    this._connectionLostNotification = null;
                }
                break;
            default:
                this._handleAbnormalClosure(data);
        }
    },
    /**
     * Called when the websocket was closed unexpectedly (ie. code is not 1000).
     *
     * @param {{code: number, reason: string}} data
     */
    _handleAbnormalClosure: function (data) {
        const {code, reason} = data;
        switch (code) {
            case this.CLOSE_CODES.SESSION_EXPIRED:
                throw new WebsocketSessionExpiredError();
            case this.CLOSE_CODES.INVALID_REQUEST:
                throw new WebsocketInvalidRequestError(reason);
            case this.CLOSE_CODES.INVALID_DATABASE:
                window.location.replace('/web/database/selector');
                break;
        }
    }
});

core.serviceRegistry.add('websocket_communication', WebsocketCommunication);
return WebsocketCommunication;

});
