/** @odoo-module **/

import BusService from 'bus.BusService';
import Widget from 'web.Widget';
import testUtils from 'web.test_utils';
import { browser } from "@web/core/browser/browser";
import { patchWithCleanup } from "@web/../tests/helpers/utils";

class WebSocketMock extends EventTarget {
    constructor(url, params) {
        super();
        this.readyState = 0;
        this.url = url;
        params = params || {};
        this.onopen = params.onopen || null;
        this.onclose = params.onclose || null;
        this.onmessage = params.onmessage || null;
        this.onerror = params.onerror || null;

        if (params.send) {
            this.send = (data) => {
                this._send(data);
                params.send.call(this, data);
            };
        }
        if (params.close) {
            this.close = (ev) => {
                this._close(ev);
                params.close.call(this, ev);
            };
        }

        setTimeout(() => {
            this.readyState = 1;
            const openEv = new Event('open');
            this.dispatchEvent(openEv);
            if (this.onopen) {
                this.onopen(openEv);
            }
        });
    }

    send(data) {
        this._send(data);
    }

    close(code, reason) {
        this._close(code, reason);
    }

    _close(code, reason) {
        this.readyState = 3;
        const closeEv = new CloseEvent('close', {
            code,
            reason,
            wasClean: code === 1000,
        });
        this.dispatchEvent(closeEv);
        if (this.onclose) {
            this.onclose(closeEv);
        }
    }

    _send(data) {
        if (this.readyState !== 1) {
            const errorEv = new Event('error');
            this.dispatchEvent(errorEv);
            if (this.onerror) {
                this.onerror(errorEv);
            }
            throw new DOMException("Failed to execute 'send' on 'WebSocket': State is not OPEN");
        }
    }
}

function patchWebsocketWithCleanup(params) {
    patchWithCleanup(browser, {
        WebSocket: function (url) {
            return new WebSocketMock(url, params);
        },
    }, { pure: true });
}

async function getWebsocketPatchedWidget(params, services) {
    services = services || {};
    patchWebsocketWithCleanup(params);
    const widget = new Widget();
    await testUtils.mock.addMockEnvironment(widget, {
        services: { bus_service: BusService, ...services },
        browser,
    });
    await widget.appendTo($('#qunit-fixture'));
    return widget;
}


export {
    getWebsocketPatchedWidget,
    patchWebsocketWithCleanup,
};
