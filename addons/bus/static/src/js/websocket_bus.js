odoo.define('bus.Websocket', function (require) {
"use strict";

var Bus = require('web.Bus');
var ServicesMixin = require('web.ServicesMixin');
const { browser } = require("@web/core/browser/browser");
const { WebsocketSessionExpiredError,
        WebsocketInvalidRequestError } = require("@bus/js/services/websocket_errors");

/**
 * Event Websocket bus used to bind events on websocket notifications
 *
 * trigger:
 * - window_focus : when the window focus change (true for focused, false for blur)
 * - notification : when a notification is received from the websocket
 * - open : when the connection through the socket is established
 *
 * @class WebsocketBus
 */
var WebsocketBus = Bus.extend(ServicesMixin, {
    // constants
    USER_PRESENCE_UPDATE_PERIOD: 30000, // don't update presence more than once every 30s
    WS_ROUTE: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/websocket`,
    CLOSE_CODES: Object.freeze({
        CLEAN: 1000,
        ACCESS_DENIED: 4000,
        INVALID_DATABASE: 4001,
        SESSION_EXPIRED: 4002,
        INVALID_REQUEST: 4003,
    }),

    // properties
    _channels: [],
    _hasSubcribed: null,
    _reconnectNotification: null,
    _connectRetryDelay: 1000,
    _isOdooFocused: true,

    /**
     * @override
     */
    init: function (parent, params) {
        this._super.apply(this, arguments);
        this._id = _.uniqueId('bus');
        if (this._callLocalStorage('getItem', 'last_ts', 0) + 50000 < new Date().getTime()) {
                this._callLocalStorage('removeItem', 'last');
        }
        this._lastNotificationID = this._callLocalStorage('getItem', 'last', 0);

        // bus presence
        this._lastPresenceTime = new Date().getTime();
        $(window).on("focus." + this._id, this._onFocusChange.bind(this, {focus: true}));
        $(window).on("blur." + this._id, this._onFocusChange.bind(this, {focus: false}));
        $(window).on("unload." + this._id, this._onFocusChange.bind(this, {focus: false}));

        $(window).on("click." + this._id, this._onPresence.bind(this));
        $(window).on("keydown." + this._id, this._onPresence.bind(this));
        $(window).on("keyup." + this._id, this._onPresence.bind(this));

        this._websocketConnect();
    },
    /**
     * @override
     */
    destroy: function () {
        this.stopBus();
        $(window).off("focus." + this._id);
        $(window).off("blur." + this._id);
        $(window).off("unload." + this._id);
        $(window).off("click." + this._id);
        $(window).off("keydown." + this._id);
        $(window).off("keyup." + this._id);
        this._super();
    },

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
    * Register a new channel to listen to bus notifications (ignore if already
    * listening on this channel).
    *
    * @param {string} channel
    */
    addChannel: function (channel) {
        if (this._channels.indexOf(channel) === -1) {
            this._channels.push(channel);
            this.updateChannels();
        }
    },
    /**
     * Unregister a channel from bus notifications.
     *
     * @param {string} channel
     */
    deleteChannel: function (channel) {
        var index = this._channels.indexOf(channel);
        if (index !== -1) {
            this._channels.splice(index, 1);
            this.updateChannels();
        }
    },
    /**
     * Tell whether odoo is focused or not
     *
     * @returns {boolean}
     */
    isOdooFocused: function () {
        return this._isOdooFocused;
    },
    /**
     * Start the bus by subscribing to this._channels. Usually, the bus starts
     * when a channel is added. Some modules add their channels server side
     * which mean they need to start the bus manually.
     */
    startBus: function () {
        if (!this._hasSubcribed) {
            this.updateChannels();
        }
    },
    /**
     * Stop the bus by clearing all handlers/channels and closing the websocket
     * connection.
     */
    stopBus: function () {
        this._cleanupWebsocket();
        if (this._isWebSocketOpen()) {
            this._websocket.close(1000);
        }
        this._channels = [];
        this.off('open');
    },
    /**
     * @private
     */
    updateChannels: function () {
        this.send('/subscribe', {
            channels: this._channels,
            last: this._lastNotificationID,
        });
        this._hasSubcribed = true;
    },
    /**
     * Send a message through the socket.
     *
     * @param {string} path The route to target on the server
     * @param {any} data Data to pass to the route
     */
    send: function (path, data) {
        const sendMessage = () => this._websocket.send(JSON.stringify({path, data}));
        if (this._isWebSocketOpen()) {
            sendMessage();
        } else {
            this.once('open', this, sendMessage);
        }
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @private
     * @returns {boolean} Whether the websocket is opened or not
     */
    _isWebSocketOpen: function () {
        return this._websocket && this._websocket.readyState === 1;
    },
    /**
     * @private
     */
    _websocketConnect: function () {
        this._websocket = new browser.WebSocket(this.WS_ROUTE);
        $(this._websocket).on('open', () => {
            this._startUpdateUserPresenceLoop();
            this.trigger('open');
        });
        $(this._websocket).on('close', this._onWebSocketClose.bind(this));
        $(this._websocket).on('error', this._onWebsocketError.bind(this));
        $(this._websocket).on('message', this._onWebSocketMessage.bind(this));
    },
    /**
     * Clean old websocket subscriptions, try reconnecting to the server.
     * Try are delayed  exponentially.
     *
     * @private
     */
    _websocketReconnect: function () {
        this._cleanupWebsocket();
        this._connectRetryDelay = this._connectRetryDelay * 1.5 + 500 * Math.random();
        this._connectRetryTimeout = browser.setTimeout(this._websocketConnect.bind(this), this._connectRetryDelay);
    },
    /**
     * Update user presence every this.USER_PRESENCE_UPDATE_PERIOD seconds.
     *
     * @private
     */
    _startUpdateUserPresenceLoop: function () {
        this._lastPresenceTime = new Date().getTime();
        const updateUserPresence = () => {
            const now = new Date().getTime();
            this.send("/update_presence", {
                inactivity_period: now - this._lastPresenceTime
            });
        };
        updateUserPresence();
        this._userPresenceInterval = setInterval(
            updateUserPresence,
            this.USER_PRESENCE_UPDATE_PERIOD
        );
    },
    /**
     * Remove websocket listeners/stop user presence interval and
     * reset this._hasSubcribed.
     *
     * @private
     */
    _cleanupWebsocket: function () {
        clearInterval(this._userPresenceInterval);
        clearTimeout(this._connectRetryTimeout);
        this._hasSubcribed = false;
        if (this._websocket) {
            $(this._websocket).off('error');
            $(this._websocket).off('close');
            $(this._websocket).off('open');
            $(this._websocket).off('message');
        }
    },

    /**
     * Call local_storage service
     *
     * @private
     * @param {string} method (getItem, setItem, removeItem, on)
     * @param {string} key
     * @param {any} param
     * @returns service information
     */
    _callLocalStorage: function (method, key, param) {
        return this.call('local_storage', method, this._generateKey(key), param);
    },
    /**
     * Generates localStorage keys prefixed by bus id in order to avoid
     * conflicts between several bus instances.
     *
     * @private
     * @param {string} key
     * @returns key prefixed with the bus id
     */
    _generateKey: function (key) {
        return `${this._id}.${key}`;
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * Handler when the focus of the window change.
     * Trigger the 'window_focus' event.
     *
     * @private
     * @param {Object} params
     * @param {Boolean} params.focus
     */
    _onFocusChange: function (params) {
        this._isOdooFocused = params.focus;
        if (params.focus) {
            this._lastPresenceTime = new Date().getTime();
            this.trigger('window_focus', this._isOdooFocused);
        }
    },
    /**
     * Handler when there is an activity on the window (click, keydown, keyup)
     * Update the last presence date.
     *
     * @private
     */
    _onPresence: function () {
        this._lastPresenceTime = new Date().getTime();
    },
    /**
     * Triggers the 'notification' event with a list [channel, message] from
     * notifications.
     *
     * @private
     * @param {jQueryEvent} ev jQuery event wrapping a MessageEvent
     * @returns {Array[]} Output arrays have notification's channel and message
     */
    _onWebSocketMessage: function (ev) {
        const notifs = JSON.parse(ev.originalEvent.data).map(notif => {
            if (notif.id > this._lastNotificationID) {
                this._lastNotificationID = notif.id;
            }
            return notif.message;
        });
        this._callLocalStorage('setItem', 'last_ts', new Date().getTime());
        this._callLocalStorage('setItem', 'last', this._lastNotificationID);
        this.trigger("notification", notifs);
        return notifs;
    },
    /**
     * If connection closure was unexpected (ie. close code was not 1000),
     * let's try to reconnect.
     *
     * @private
     * @param {jQueryEvent} ev jQuery event wrapping a CloseEvent
     */
    _onWebSocketClose: function (ev) {
        this._cleanupWebsocket();
        const {code, reason} = ev.originalEvent;
        if (code !== this.CLOSE_CODES.CLEAN) {
            switch(code) {
                case this.CLOSE_CODES.SESSION_EXPIRED:
                    throw new WebsocketSessionExpiredError();
                case this.CLOSE_CODES.INVALID_REQUEST:
                    throw new WebsocketInvalidRequestError(reason);
                case this.CLOSE_CODES.INVALID_DATABASE:
                    window.location.replace('/web/database/selector');
                    break;
                default:
                    this._websocketReconnect();
                    this.once('open', this, this.updateChannels);
            }
        }
    },
    /**
     * Triggered when the websocket connection failed. Open a notification
     * indicating that the connection is lost, register an handler to remove
     * it when the connection is restored. Finally, start trying to reconnect.
     */
    _onWebsocketError: function () {
        this._cleanupWebsocket();
        if (!this._reconnectNotification) {
            this._reconnectNotification = this.env.services.notification.notify({
                title: this.env._t("Websocket connection lost. Trying to reconnect..."),
                sticky: true,
            });
            this.once('open', this, () => {
                this.env.services.notification.close(this._reconnectNotification);
                this._reconnectNotification = null;
                this._connectRetryDelay = 1000;
            });
        }
        this._websocketReconnect();
    },
});

return WebsocketBus;

});
