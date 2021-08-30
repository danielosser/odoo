/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            channelInvitationForm
        [Element/model]
            PopoverViewComponent
        [Field/target]
            ChannelInvitationFormComponent
        [Element/props]
            [ChannelInvitationFormComponent/channelInvitationForm]
                @record
                .{PopoverViewComponent/popoverView}
                .{PopoverView/channelInvitationForm}
        [web.Element/style]
            [web.scss/width]
                {web.scss/Min}
                    95vw
                    400px
            [web.scss/max-height]
                {web.scss/Min}
                    [0]
                        {web.scss/calc}
                            100vh
                            .{-}
                                140px
                    [1]
                        530px
`;
