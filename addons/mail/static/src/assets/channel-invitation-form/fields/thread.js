/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the thread on which this list operates (if any).
    {Field}
        [Field/name]
            thread
        [Field/model]
            ChannelInvitationForm
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
        [Field/compute]
            {if}
                @record
                .{ChannelInvitationForm/threadView}
                .{&}
                    @record
                    .{ChannelInvitationForm/threadView}
                    .{ThreadView/thread}
            .{then}
                @record
                .{ChannelInvitationForm/threadView}
                .{ThreadView/thread}
            .{elif}
                @record
                .{ChannelInvitationForm/chatWindow}
                .{&}
                    @record
                    .{ChannelInvitationForm/chatWindow}
                    .{ChatWindow/thread}
            .{then}
                @record
                .{ChannelInvitationForm/chatWindow}
                .{ChatWindow/thread}
            .{else}
                {Record/empty}
`;