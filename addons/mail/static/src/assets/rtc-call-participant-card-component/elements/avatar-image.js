/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            avatarImage
        [Element/model]
            RtcCallParticipantCardComponent
        [web.Element/tag]
            img
        [web.Element/class]
            h-100
            rounded-circle
        [web.Element/src]
            @record
            .{RtcCallParticipantCardComponent/callParticipantCard}
            .{RtcCallParticipantCard/avatarUrl}
        [web.Element/draggable]
            false
        [web.Element/alt]
            {Locale/text}
                Avatar
        [web.Element/style]
            [web.scss/max-height]
                {web.scss/Min}
                    100%
                    100px
            [web.scss/max-width]
                {web.scss/Min}
                    100%
                    100px
            [web.scss/aspect-ratio]
                1
            [web.scss/object-fit]
                cover
            [web.scss/border]
                5px
                solid
                {scss/gray}
                    700
            {if}
                @record
                .{RtcCallParticipantCardComponent/callParticipantCard}
                .{RtcCallParticipantCard/isTalking}
            .{then}
                [web.scss/border]
                    5px
                    solid
                    {scss/darken}
                        {scss/$o-enterprise-primary-color}
                        5%
            {if}
                @record
                .{RtcCallParticipantCardComponent/callParticipantCard}
                .{RtcCallParticipantCard/isInvitation}
            .{then}
                {if}
                    @field
                    .{web.Element/isHover}
                .{then}
                    [web.scss/border]
                        5px
                        solid
                        {scss/theme-color}
                            danger
                .{else}
                    [web.scss/animation]
                        border-pulse
                        3s
                        linear
                        infinite
            {web.scss/keyframes}
                {web.scss/border-pulse}
                    [0%]
                        [web.scss/border]
                            5px
                            solid
                            white
                    [20%]
                        [web.scss/border]
                            5px
                            solid
                            {scss/gray}
                                600
                    [35%]
                        [web.scss/border]
                            5px
                            solid
                            {scss/gray}
                                100
                    [50%]
                        [web.scss/border]
                            5px
                            solid
                            {scss/gray}
                                600
                    [70%]
                        [web.scss/border]
                            5px
                            solid
                            {scss/gray}
                                100
                    [85%]
                        [web.scss/border]
                            5px
                            solid
                            {scss/gray}
                                700
`;
