/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ComposerSuggestionListComponent
        [Model/fields]
            composerView
            isBelow
        [Model/template]
            root
                drop
                    list
                        itemMain
                        separator
                        itemExtra
`;
