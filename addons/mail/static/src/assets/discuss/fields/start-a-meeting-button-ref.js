/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            startAMeetingButtonRef
        [Field/model]
            Discuss
        [Field/type]
            attr
        [Field/target]
            Element
        [Field/related]
            Discuss/discussSidebarComponents
            Collection/first
            DiscussSidebarComponent/startMeetingButton
`;
