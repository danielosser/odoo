/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            actionReaction
        [Field/model]
            MessageActionListComponent
        [Model/traits]
            MessageActionListComponent/action
        [Element/isPresent]
            @record
            .{MessageActionListComponent/messageActionList}
            .{MessageActionList/message}
            .{Message/hasReactionIcon}
        [web.Element/class]
            fa-smile-o
        [web.Element/title]
            {Locale/text}
                Add a Reaction
        [Element/onClick]
            {MessageActionList/onClickReaction}
                [0]
                    @record
                    .{MessageActionListComponent/messageActionList}
                [1]
                    @ev
        [Element/slot]
            <Popover
                position="'top'"
                t-on-o-emoji-selection="${
                    Define`
                        {MessageActionList/onEmojiSelection}
                            [0]
                                @record
                                .{MessageActionListComponent/messageActionList}
                            [1]
                                @ev
                    `
                }"
                t-on-o-popover-closed="${
                    Define`
                        {MessageActionList/onReactionPopoverClosed}
                            [0]
                                @record
                                .{MessageActionListComponent/messageActionList}
                            [1]
                                @ev
                    `
                }"
                t-on-o-popover-opened="${
                    Define`
                        {MessageActionList/onReactionPopoverOpened}
                            [0]
                                @record
                                .{MessageActionListComponent/messageActionList}
                            [1]
                                @ev
                    `
                }"
            >
                <t t-set="opened">
                    <EmojisPopoverComponent/>
                </t>
            </Popover>
        [web.Element/style]
            [web.scss/display]
                inline
                {Dev/comment}
                    override block from popover div
`;
