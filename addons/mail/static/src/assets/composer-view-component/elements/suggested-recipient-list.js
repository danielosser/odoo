/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            suggestedRecipientList
        [Element/model]
            ComposerViewComponent
        [Field/target]
            ComposerSuggestedRecipientListComponent
        [Element/isPresent]
            @record
            .{ComposerViewComponent/hasFollowers}
            .{&}
                @record
                .{ComposerViewComponent/composerView}
                .{ComposerView/composer}
                .{Composer/isLog}
                .{isFalsy}
            .{&}
                @record
                .{ComposerViewComponent/composerView}
                .{Composer/messageViewInEditing}
                .{isFalsy}
        [Element/props]
            [ComposerSuggestedRecipientListComponent/thread]
                @record
                .{ComposerViewComponent/composerView}
                .{ComposerView/composer}
                .{Composer/activeThread}
`;
