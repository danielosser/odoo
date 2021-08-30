/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonEmojisPopover
        [Element/model]
            ComposerViewComponent
        [Field/target]
            Popover
        [Element/props]
            [Popover/position]
                top
        [Element/slot]
            {Dev/comment}
                TODO FIXME o-isOpen not possible to code due to https://github.com/odoo/owl/issues/693
            {qweb}
                ${
                    `
                        <button
                            class="
                                o-ComposerViewComponent-buttonEmojis
                                o-ComposerViewComponent-button
                                o-ComposerViewComponent-toolButton
                                btn btn-light
                            "
                            t-att-class="{
                                'o-isOpen': false and state.displayed,
                            }"
                            t-on-keydown="${
                                Define`
                                    {if}
                                        @ev
                                        .{web.KeyboardEvent/key}
                                        .{=}
                                            Escape
                                    .{then}
                                        {break}
                                    {if}
                                        @record
                                        .{ComposerViewComponent/emojisPopover}
                                    .{then}
                                        {EmojisPopoverComponent/close}
                                            @record
                                            .{ComposerViewComponent/emojisPopover}
                                        {Record/update}
                                            [0]
                                                @record
                                                .{ComposerViewComponent/composerView}
                                            [1]
                                                [ComposerView/doFocus]
                                                    true
                                        {Event/markHandled}
                                            @ev
                                            Composer.closeEmojisPopover
                                `
                            }"
                        >
                            <i class="fa fa-smile-o"/>
                        </button>
                        <t t-set="opened">
                            ${
                                Define`
                                    {Element}
                                        [Element/name]
                                            emojisPopover
                                        [Element/model]
                                            ComposerViewComponent
                                        [Field/target]
                                            EmojisPopoverComponent
                                `
                            }
                        </t>
                    `
                }
`;
