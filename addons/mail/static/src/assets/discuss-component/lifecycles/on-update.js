/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            DiscussComponent
        [Lifecycle/behavior]
            {Record/update}
                [0]
                    @record
                    .{DiscussComponent/discuss}
                [1]
                    [Discuss/isOpen]
                        true
            {if}
                {Discuss/thread}
            .{then}
                {Component/trigger}
                    @record
                    o-push-state-action-manager
            .{elif}
                {Messaging/isInitialized}
            .{then}
                {Discuss/openInitThread}
            {DiscussComponent/_updateLocalStoreProps}
                @record
`;
