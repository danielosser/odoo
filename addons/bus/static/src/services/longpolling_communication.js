/** @odoo-module **/

/**
 * Low-level implementation of communication from the server with the use of
 * longpolling requests. Prefer using `bus.server_communication` instead because
 * browsers limit the number of requests that are allowed in parallel, so tricks
 * have been added in `bus.server_communication` to work with a single request
 * per browser and automatically sync other tabs.
 */
export class LongpollingCommunication {

    constructor(env) {
        this.env = env;
        /**
         * Determines whether this longpolling service is currently active.
         */
        this._isActive;
        /**
         * Reference to the current RPC promise (if any). Useful to be able to
         * cancel it if the longpolling is disabled or if any param has to be
         * updated.
         */
        this._currentRpcPromise;
        /**
         * Id of the last bus message that was fetched. Useful to only fetch new
         * bus messages.
         */
        this._lastBusMessageId;
        /**
         * Set of currently registered handlers.
         */
        this._handlers = new Set();
    }

    // -------------------------------------------------------------------------
    // Public
    // -------------------------------------------------------------------------

    /**
     * Registers a new handler.
     *
     * @param {function} handler will be called when a bus message is received
     *  from the server. It will be called with one param: the message that was
     *  received from the server.
     */
    registerHandler(handler) {
        this._handlers.add(handler);
    }

    /**
     * Starts polling. Has no effect if polling is already in progress.
     *
     * @param {integer} [lastBusMessageId=0] bus messages that have a smaller or
     *  equal id will be ignored.
     */
    start(lastBusMessageId = 0) {
        if (this._isActive) {
            return;
        }
        this._isActive = true;
        this._lastBusMessageId = lastBusMessageId;
        this._poll();
    }

    /**
     * Stops polling.
     */
    stop() {
        this._isActive = false;
        if (this._currentRpcPromise) {
            this._currentRpcPromise.abort();
        }
    }

    /**
     * Unregisters an existing handler.
     *
     * @param {function} handler to unregister
     */
    unregisterHandler(handler) {
        this._handlers.delete(handler);
    }

    // -------------------------------------------------------------------------
    // Private
    // -------------------------------------------------------------------------

    /**
     * @private
     */
    async _poll() {
        while (this._isActive) {
            // Isolate RPC result handling and error handling outside of its
            // try/catch/finally block to avoid incorrectly catching exceptions
            // that are not RPC related.
            let hasError;
            let busMessages;
            try {
                this._currentRpcPromise = this.env.services.rpc({
                    params: {
                        channels: [],
                        last_bus_message_id: this._lastBusMessageId,
                    },
                    route: '/longpolling/poll',
                }, {
                    shadow: true,
                    timeout: 60000,
                });
                busMessages = await this._currentRpcPromise;
            } catch (error) {
                if (error.message !== "XmlHttpRequestError abort") {
                    console.error(error);
                    hasError = true;
                }
            } finally {
                this._currentRpcPromise = undefined;
            }
            if (busMessages) {
                for (const busMessage of busMessages) {
                    this._lastBusMessageId = Math.max(busMessage.id, this._lastBusMessageId);
                    for (const handler of this._handlers) {
                        // Isolate each handler on its own stack to prevent any
                        // potential issue in one of them to influence any
                        // other. This also allows to restart the longpolling
                        // request as soon as possible, without having to wait
                        // for all handlers to terminate.
                        setTimeout(() => handler(busMessage));
                    }
                }
            }
            if (hasError) {
                // Randomize the retry delay between 10s and 30s to avoid
                // deny of service if there are many other clients that would
                // otherwise all retry at the same time.
                const delay = 10000 + Math.random() * 20000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

}

export const longpollingCommunicationService = {
    name: 'bus.longpolling_communication',
    dependencies: ['rpc'],
    deploy: env => new LongpollingCommunication(env),
};
