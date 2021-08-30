/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ComposerSuggestedRecipientListComponent
        [Model/fields]
            hasShowMoreButton
            thread
        [Model/template]
            root
                suggestedRecipient
                showMore
                showLess
`;
