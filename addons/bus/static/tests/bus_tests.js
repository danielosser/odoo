odoo.define('web.bus_tests', function (require) {
"use strict";

const AbstractStorageService = require('web.AbstractStorageService');
const RamStorage = require('web.RamStorage');
const { browser } = require("@web/core/browser/browser");
const { getWebsocketPatchedWidget } = require('@web/../tests/helpers/mock_websocket');
const { nextTick } = require('web.test_utils');
const { patchWithCleanup } = require('@web/../tests/helpers/utils');

var LocalStorageServiceMock;

QUnit.module('Bus', {
    beforeEach: function () {
        LocalStorageServiceMock = AbstractStorageService.extend({storage: new RamStorage()});
        patchWithCleanup(browser, {
            setTimeout: fn => fn(),
        });
    },
}, function () {
    QUnit.test('notifications received from websocket after channel subscription', async function (assert) {
        assert.expect(4);

        const notifications = [
            [{
                message: 'beta',
            }], [{
                message: 'epsilon',
            }]
        ];

        const widget = await getWebsocketPatchedWidget({
            send: function (message) {
                const { path, data } = JSON.parse(message);
                if (path === '/subscribe') {
                    assert.step(path + ' - ' + data.channels.join(','));
                    notifications.forEach(notif => {
                        this.dispatchEvent(new MessageEvent('message', {
                            data: JSON.stringify(notif),
                        }));
                    });
                }
            },
        }, { local_storage: LocalStorageServiceMock });

        widget.call('bus_service', 'onNotification', this, function (notifications) {
            assert.step('notification - ' + notifications.toString());
        });
        widget.call('bus_service', 'addChannel', 'lambda');

        await nextTick();

        assert.verifySteps([
            '/subscribe - lambda',
            'notification - beta',
            'notification - epsilon',
        ]);

        widget.destroy();
    });

    QUnit.test('WebSocket reconnects after connection is lost', async function (assert) {
        assert.expect(4);

        let connectionCount = 0;
        const widget = await getWebsocketPatchedWidget({
            onopen: function () {
                assert.step(`websocket connected ${connectionCount++}`);
                if (connectionCount === 1) {
                    // 1006 means the connection has been closed unexpectedly
                    // Thus, the bus should try to reconnect.
                    this.close(1006);
                } else {
                    assert.equal(connectionCount, 2, "Should not be called after clean closure");
                    // 1000 means the connection has been closed cleanly
                    // Thus, the bus should not try to reconnect.
                    this.close(1000);
                }
            },
        }, { local_storage: LocalStorageServiceMock });
        // Trigger websocket connection
        widget.call('bus_service', 'startBus');
        // Give websocket bus a tick to try reconnecting
        await nextTick();

        assert.verifySteps([
            'websocket connected 0',
            'websocket connected 1',
        ]);

        widget.destroy();
    });

    QUnit.test('provide notification ID of 0 by default', async function (assert) {
        // This test is important in order to ensure that we provide the correct
        // sentinel value 0 when we are not aware of the last notification ID
        // that we have received. We cannot provide an ID of -1, otherwise it
        // may likely be handled incorrectly (before this test was written,
        // it was providing -1 to the server, which in return sent every stored
        // notifications related to this user).
        assert.expect(3);

        // Simulate no ID of last notification in the local storage
        patchWithCleanup(LocalStorageServiceMock, {
            getItem: function (key) {
                if (key === 'last_ts') {
                    return 0;
                }
                return this._super.apply(this, arguments);
            },
        });

        const widget = await getWebsocketPatchedWidget({
            send: function(message) {
                const { path, data } = JSON.parse(message);
                if (path === '/subscribe') {
                    assert.step(path);
                    assert.strictEqual(data.last, 0,
                        "provided last notification ID should be 0");
                }
            }
        }, { local_storage: LocalStorageServiceMock });

        // trigger websocket subscribe
        widget.call('bus_service', 'startBus');
        assert.verifySteps(['/subscribe']);
        widget.destroy();
    });

});

});
