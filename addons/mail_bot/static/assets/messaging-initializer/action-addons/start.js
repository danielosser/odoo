/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            MessagingInitializer/start
        [ActionAddon/feature]
            mail_bot
        [ActionAddon/params]
            messagingInitializer
        [ActionAddon/behavior]
            {Record/doAsync}
                @messagingInitializer
                {func}
                    @original
            {if}
                {Env/isOdoobotInitialized}
                .{isFalsy}
            .{then}
                {MessagingInitializer/_initializeOdoobot}
`;
