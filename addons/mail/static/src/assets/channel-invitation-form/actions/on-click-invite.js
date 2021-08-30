/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ChannelInvitationForm/onClickInvite
        [Action/params]
            record
                [type]
                    ChannelInvitationForm
        [Action/behavior]
            {if}
                @record
                .{ChannelInvitationForm/thread}
                .{Thread/channelType}
                .{=}
                    chat
            .{then}
                :partners_to
                    {Record/insert}
                        [Record/traits]
                            Collection
                        [0]
                            {Env/currentPartner}
                            .{Partner/id}
                        [1]
                            @record
                            .{ChannelInvitationForm/thread}
                            .{Thread/members}
                            .{Collection/map}
                                {func}
                                    [in]
                                        item
                                    [out]
                                        @item
                                        .{Partner/id}
                        [2]
                            @record
                            .{ChannelInvitationForm/selectedPartners}
                            .{Collection/map}
                                {func}
                                    [in]
                                        item
                                    [out]
                                        @item
                                        .{Partner/id}
                    .{Collection/flatten}
                    .{Collection/unique}
                :channel
                    {Thread/createGroupChat}
                        [partners_to]
                            @partners_to
                {if}
                    @record
                    .{ChannelInvitationForm/thread}
                    .{Thread/rtc}
                .{then}
                    {Dev/comment}
                        if we were in a RTC call on the current thread,
                        we move to the new group chat.
                        A smoother transfer would be moving the RTC
                        sessions from one channel to the other
                        (server-side too), but it would be considerably
                        more complex.
                    {Record/doAsync}
                        [0]
                            @record
                        [1]
                            {Thread/toggleCall}
                                [0]
                                    @channel
                                [1]
                                    [startWithVideo]
                                        @record
                                        .{ChannelInvitationForm/thread}
                                        .{Thread/rtc}
                                        .{Rtc/videoTrack}
                                        .{isTruthy}
                                    [videoType]
                                        {if}
                                            @record
                                            .{ChannelInvitationForm/thread}
                                            .{Thread/rtc}
                                            .{Rtc/sendUserVideo}
                                        .{then}
                                            user-video
                                        .{else}
                                            display
                {Thread/open}
                    @channel
            .{else}
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    services
                .{Dict/get}
                    rpc
                .{Function/call}
                    [model]
                        mail.channel
                    [method]
                        add_members
                    [args]
                        {Record/insert}
                            [Record/traits]
                                Collection
                            {Record/insert}
                                [Record/traits]
                                    Collection
                                @record
                                .{ChannelInvitationForm/thread}
                                .{Thread/id}
                    [kwargs]
                        [partner_ids]
                            @record
                            .{ChannelInvitationForm/selectedPartners}
                            .{Collection/map}
                                {func}
                                    [in]
                                        item
                                    [out]
                                        @item
                                        .{Partner/id}
                        [invite_to_rtc_call]
                            @record
                            .{ChannelInvitationForm/thread}
                            .{Thread/rtc}
            {Record/update}
                [0]
                    @record
                [1]
                    [ChannelInvitationForm/searchTerm]
                        {Record/empty}
                    [ChannelInvitationForm/selectedPartners]
                        {Record/empty}
            {Record/delete}
                @record
`;
