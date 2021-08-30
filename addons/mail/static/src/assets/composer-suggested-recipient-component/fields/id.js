/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            ComposerSuggestedRecipientComponent
        [Field/type]
            attr
        [Field/target]
            String
        [default]
            {UnderscoreJS/uniqueId}
                o-ComposerSuggestedRecipientComponent-
`;
