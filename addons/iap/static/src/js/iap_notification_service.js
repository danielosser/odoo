/** @odoo-module **/

import { registry } from "@web/core/registry";

export const iapNotificationService = {
    dependencies: ["notification"],

    start(env, { notification }) {
        env.bus.on("WEB_CLIENT_READY", null, async () => {
            const legacyEnv = owl.Component.env;
            legacyEnv.services.bus_service.onNotification(this, onNotification);
            legacyEnv.services.bus_service.startPolling();
        });

        /**
         * Displays the notification on user's screen
         */
        function displayIapNotification(notif) {
            if (notif.is_credit_error) {
                const message = `<a class='btn btn-link' href=${notif.url} target='_blank' ><i class='fa fa-arrow-right'></i> ${env._t("Buy more credits")}</a>`;
                notification.add(message, {
                    type : 'danger',
                    messageIsHtml: true,
                    title: notif.title
                });
            } else {
                notification.add(notif.title, {
                    type: 'success',
                });
            }
        }

        /**
         * bus's notification
         *
         * @param {Array} notifications: list of received notifications
         */
        function onNotification(notifications) {
            for (const { payload, type } of notifications) {
                if (type === 'iap_notification') {
                    displayIapNotification(payload);
                }
            }
        }
    },
};

registry.category("services").add("iapNotification", iapNotificationService);
