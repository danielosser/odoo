/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Name of the language of the visitor. (Ex: "English")
    {Field}
        [Field/name]
            langName
        [Field/model]
            Visitor
        [Field/type]
            attr
        [Field/target]
            String
`;
