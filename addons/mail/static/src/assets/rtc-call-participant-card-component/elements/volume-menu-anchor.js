/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            volumeMenuAnchor
        [Element/model]
            RtcCallParticipantCardComponent
        [Element/isPresent]
            @record
            .{RtcCallParticipantCardComponent/callParticipantCard}
            .{RtcCallParticipantCard/rtcSession}
            .{RtcSession/isOwnSession}
            .{isFalsy}
        [Element/slot]
            {qweb}
                ${
                    `
                        <Popover>
                            <i class="o-RtcCallParticipantCardComponent-volumeMenuAnchor" t-on-click="${
                                Define`
                                    {RtcCallParticipantCard/onClickVolumeAnchor}
                                        [0]
                                            @record
                                            .{RtcCallParticipantCardComponent/callParticipantCard}
                                        [1]
                                            @ev
                                `
                            }" t-ref="volumeMenuAnchor"/>
                            <t t-set="opened">
                                <input type="range" min="0.0" max="1" step="0.01" t-att-value="${
                                    Define`
                                        @record
                                        .{RtcCallParticipantCardComponent/callParticipantCard}
                                        .{RtcCallParticipantCard/rtcSession}
                                        .{RtcSession/volume}
                                    `
                                }" t-on-change="${
                                    Define`
                                        {RtcCallParticipantCard/onChangeVolume}
                                            [0]
                                                @record
                                                .{RtcCallParticipantCardComponent/callParticipantCard}
                                            [1]
                                                @ev
                                    `
                                }"/>
                            </t>
                        </Popover>
                    `
                }
        [web.Element/style]
            [web.scss/position]
                absolute
            [web.scss/bottom]
                0
            [web.scss/left]
                50%
`;
