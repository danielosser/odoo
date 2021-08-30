/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            layoutMenu
        [Field/model]
            RtcLayoutMenuComponent
        [Field/type]
            m2o
        [Field/target]
            RtcLayoutMenu
        [Field/isRequired]
            true
        [Field/inverse]
            RtcLayoutMenu/component
`;
