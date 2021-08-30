/** @odoo-module **/

import { Define } from '@mail/define';

'o-isClickable': ,

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            RtcCallParticipantCardComponent
        [web.Element/style]
            [web.scss/padding]
                {scss/map-get}
                    {scss/$spacers}
                    1
            [web.scss/display]
                flex
            [web.scss/position]
                relative
            [web.scss/border-radius]
                {scss/$o-mail-rounded-rectangle-border-radius-sm}
            {if}
                @record
                .{RtcCallParticipantCardComponnet/callParticipantCard}
                .{RtcCallParticipantCard/invitedGuest}
                .{|}
                    @record
                    .{RtcCallParticipantCardComponnet/callParticipantCard}
                    .{RtcCallParticipantCard/invitedPartner}
                .{|}
                    @record
                    .{RtcCallParticipantCardComponnet/callParticipantCard}
                    .{RtcCallParticipantCard/isMinimized}
                    .{isFalsy}
            .{then}
                [web.scss/cursor]
                    pointer
            {if}
                @record
                .{RtcCallParticipantCardComponent/callParticipantCard}
                .{RtcCallParticipantCard/isMinimized}
                .{isFalsy}
                .{&}
                    @record
                    .{RtcCallParticipantCardComponent/callParticipantCard}
                    .{RtcCallParticipantCard/isTalking}
            .{then}
                [web.scss/box-shadow]
                    inset
                    0
                    0
                    0
                    {scss/map-get}
                        {scss/$spacers}
                        1
                    {scss/darken}
                        {scss/$o-enterprise-primary-color}
                        5%
            {if}
                @record
                .{RtcCallParticipantCardComponent/callParticipantCard}
                .{RtcCallParticipantCard/isInvitation}
            .{then}
                [web.scss/opacity]
                    0.6
        [Element/onContextmenu]
            {RtcCallParticipantCardComponent/_onContextmenu}
                [0]
                    @record
                [1]
                    @ev
`;
