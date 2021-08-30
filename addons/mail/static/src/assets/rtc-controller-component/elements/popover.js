/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            popover
        [Element/model]
            RtcControllerComponent
        {Dev/comment}
            moreButton - button
                moreButtonIconWrapper - buttonIconWrapper
                    moreButtonIcon - buttonIcon
        [Element/slot]
            {qweb}
                ${
                    `
                        <Popover position="'top'">
                            <button class="o_RtcController_button"
                                aria-label="More"
                                title="More">
                                <div class="o_RtcController_button_iconWrapper">
                                    <i class="fa fa-ellipsis-h" t-att-class="{ 'fa-lg': ${
                                        Define`
                                            @record
                                            .{RtcControllerComponent/rtcController}
                                            .{RtcController/isSmall}
                                            .{isFalsy}
                                        `
                                    }"/>
                                </div>
                            </button>
                            <t t-set="opened">
                                <RtcOptionList rtcOptionList="${
                                    Define`
                                        @record
                                        .{RtcControllerComponent/rtcController}
                                        .{RtcController/rtcOptionList}
                                    `
                                }"/>
                            </t>
                        </Popover>
                    `
                }
`;
