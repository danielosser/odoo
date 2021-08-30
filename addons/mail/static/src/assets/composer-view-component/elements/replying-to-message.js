/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            replyingToMessage
        [Element/model]
            ComposerViewComponent
        [Element/isPresent]
            @record
            .{ComposerViewComponent/composerView}
            .{ComposerView/threadView}
            .{&}
                @record
                .{ComposerViewComponent/composerView}
                .{ComposerView/threadView}
                .{ThreadView/replyingToMessageView}
        [Element/slot]
            {qweb}
                ${
                    `
                        Replying to <b t-esc="${
                            Define`
                                @record
                                .{ComposerViewComponent/composerView}
                                .{ComposerView/threadView}
                                .{ThreadView/replyingToMessageView}
                                .{ReplyingToMessageView/message}
                                .{Message/authorName}
                            `
                        }"/>
                            <i t-if="${
                                Define`
                                    @record
                                    .{ComposerViewComponent/composerView}
                                    .{ComposerView/threadView}
                                    .{ThreadView/thread}
                                    .{!=}
                                        {Env/inbox}
                                `
                            }" class="o_Composer_cancelReply fa fa-lg fa-times-circle rounded-circle p-0 ml-1" title="${
                                Define`
                                    {Locale/text}
                                        Stop replying
                                `
                                // TODO: cursor: pointer style
                            }" t-on-click="${
                                Define`
                                    {ComposerView/onClickStopReplying}
                                        [0]
                                            @record
                                            .{ComposerViewComponent/composerView}
                                        [1]
                                            @ev
                                `
                            }"/>
                    `
                }
`;
