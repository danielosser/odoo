odoo.define('bus.Websocket', function (require) {
"use strict";

var Bus = require('web.Bus');
var ServicesMixin = require('web.ServicesMixin');

/**
 * Event Websocket bus used to bind events on websocket notifications
 *
 * trigger:
 * - window_focus : when the window focus change (true for focused, false for blur)
 * - notification : when a notification is received from the websocket
 *
 * @class WebsocketBus
 */
var WebsocketBus = Bus.extend(ServicesMixin, {
    // constants
    USER_PRESENCE_UPDATE_PERIOD: 30000, // don't update presence more than once every 30s
    // properties
    _channels: [],
    _hasSubcribed: null,
    _isOdooFocused: true,

    /**
     * @override
     */
    init: function (parent, params) {
        this._super.apply(this, arguments);
        this._id = _.uniqueId('bus');

        // bus presence
        this._lastPresenceTime = new Date().getTime();
        $(window).on("focus." + this._id, this._onFocusChange.bind(this, {focus: true}));
        $(window).on("blur." + this._id, this._onFocusChange.bind(this, {focus: false}));
        $(window).on("unload." + this._id, this._onFocusChange.bind(this, {focus: false}));

        $(window).on("click." + this._id, this._onPresence.bind(this));
        $(window).on("keydown." + this._id, this._onPresence.bind(this));
        $(window).on("keyup." + this._id, this._onPresence.bind(this));
        this.env.services['websocket_communication'].registerHandler(this._onMessage.bind(this));
        this._startUpdateUserPresenceLoop();
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
        this.env.services['websocket_communication'].send({path, data});
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

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
     * Triggers the 'notification' event
     *
     * @private
     * @param {{type, payload}[]} notifications coming from the bus
     * @returns {{type, payload}[]} the same notifications we received
     */
    _onMessage: function (notifications) {
        this.trigger("notification", notifications);
        return notifications;
    },
});

return WebsocketBus;

});
