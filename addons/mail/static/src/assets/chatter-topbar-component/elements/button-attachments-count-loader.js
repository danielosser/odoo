/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Elenent/name]
            buttonAttachmentsCountLoader
        [Element/model]
            ChatterTopbarComponent
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-circle-o-notch
            fa-spin
        [Element/isPresent]
            @record
            .{ChatterTopbarComponent/chatter}
            .{Chatter/isDisabled}
            .{isFalsy}
            .{&}
                @record
                .{ChatterTopbarComponent/chatter}
                .{Chatter/isShowingAttachmentsLoading}
        [web.Element/aria-label]
            {Locale/text}
                Attachment counter loading...
        [web.Element/style]
            [web.scss/margin-left]
                {scss/map-get}
                    {scss/$spacers}
                    1
`;
