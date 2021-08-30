/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            part2Command
        [Element/model]
            ComposerSuggestionComponent
        [web.Element/tag]
            span
        [Model/traits]
            ComposerSuggestionComponent/part2
        [web.Element/textContent]
            @record
            .{ComposerSuggestionComponent/record}
            .{ChannelCommand/help}
`;
