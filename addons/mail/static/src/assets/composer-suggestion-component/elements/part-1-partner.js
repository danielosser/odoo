/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            part1Partner
        [Element/model]
            ComposerSuggestionComponent
        [web.Element/tag]
            span
        [Model/traits]
            ComposerSuggestionComponent/part1
        [Element/isPresent]
            @record
            .{ComposerSuggestionComponent/modelName}
            .{=}
                Partner
        [web.Element/textContent]
            record
            .{ComposerSuggestionComponent/record}
            .{Partner/nameOrDisplayName}
`;
