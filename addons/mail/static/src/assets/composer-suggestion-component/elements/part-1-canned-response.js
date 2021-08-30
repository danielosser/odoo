/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            part1CannedResponse
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
                CannedResponse
        [web.Element/textContent]
            @record
            .{ComposerSuggestionComponent/record}
            .{CannedResponse/source}
`;
