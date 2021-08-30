/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            messageEditingButtons
        [Element/model]
            ComposerViewComponent
        [Element/isPresent]
            @record
            .{ComposerViewComponent/composerView}
            .{ComposerView/messageViewInEditing}
        [web.Element/tag]
            span
        [web.Element/class]
            text-muted
        [Element/slot]
            escape to <a href="#" t-on-click="${
                Define`
                    {ComposerView/onClickCancelLink}
                        [0]
                            @record
                            .{ComposerViewComponent/composerView}
                        [1]
                            @ev
                `
            }
            }">cancel</a>, enter to <a href="#" t-on-click="${
                Define`
                    {ComposerView/onClickSaveLink}
                        [0]
                            @record
                            .{ComposerViewComponent/composerView}
                        [1]
                            @ev
                `
            }">save
`;
