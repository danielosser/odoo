/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        AKU TODO: make model for emojis
    {Field}
        [Field/name]
            emojis
        [Field/model]
            EmojisPopoverComponent
        [Field/type]
            m2o
        [Field/target]
            Emojis
        [Field/isRequired]
            true
`;
