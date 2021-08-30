/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            currentPartnerAvatar
        [Element/model]
            ComposerViewComponent
        [Model/traits]
            ComposerViewComponent/currenAvatar
        [Element/isPresent]
            {Env/currentGuest}
            .{isFalsy}
            .{|}
                @record
                .{ComposerViewComponent/composerView}
                .{ComposerView/composer}
                .{Composer/activeThread}
                .{Thread/model}
                .{!=}
                    mail.channel
        [web.Element/alt]
            {Locale/text}
                Avatar of user
        [web.Element/src]
            {ComposerViewComponent/getCurrentPartnerAvatar}
                @record
`;
