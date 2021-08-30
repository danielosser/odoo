/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the component displaying this message view (if any).
    {Field}
        [Field/name]
            component
        [Field/model]
            MessageView
        [Field/type]
            attr
        [Field/target]
            MessageViewComponent
`;
