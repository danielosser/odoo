/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether this message view should be squashed visually.
    {Field}
        [Field/name]
            isSquashed
        [Field/model]
            MessageView
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
