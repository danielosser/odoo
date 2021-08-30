/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Name of the website on which the visitor is connected. (Ex: "Website 1")
    {Field}
        [Field/name]
            websiteName
        [Field/model]
            Visitor
        [Field/type]
            attr
        [Field/target]
            String
`;
