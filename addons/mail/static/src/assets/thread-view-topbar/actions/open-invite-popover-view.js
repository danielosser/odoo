/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Open the invite popover view in this thread view topbar.
    {Action}
        [Action/name]
            ThreadViewTopbar/openInvitePopoverView
        [Action/params]
            record
                [type]
                    ThreadViewTopbar
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                    .{ThreadViewTopbar/threadView}
                [1]
                    [ThreadView/channelInvitationForm]
                        {Record/insert}
                            [Record/traits]
                                ChannelInvitationForm
            {Record/update}
                [0]
                    @record
                [1]
                    [ThreadViewTopbar/invitePopoverView]
                        {Record/insert}
                            [Record/traits]
                                PopoverView
                            [PopoverView/channelInvitationForm]
                                @record
                                .{ThreadViewTopbar/threadView}
                                .{ThreadView/channelInvitationForm}
            {if}
                {Env/isCurrentUserGuest}
            .{then}
                {break}
            {Record/update}
                [0]
                    @record
                    .{ThreadViewTopbar/threadView}
                    .{ThreadView/channelInvitationForm}
                [1]
                    [ChannelInvitationForm/doFocusOnSearchInput]
                        true
            {ChannelInvitationForm/searchPartnersToInvite}
                @record
                .{ThreadViewTopbar/threadView}
                .{ThreadView/channelInvitationForm}
`;