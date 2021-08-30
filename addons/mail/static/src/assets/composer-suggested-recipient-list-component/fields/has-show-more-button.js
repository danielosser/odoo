/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasShowMoreButton
        [Field/model]
            ComposerSuggestedRecipientListComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            true
`;
