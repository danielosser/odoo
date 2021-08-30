/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            threadViewTopbar
        [Field/model]
            ThreadViewTopbarComponent
        [Field/type]
            m2o
        [Field/target]
            ThreadViewTopbar
        [Field/inverse]
            ThreadViewTopbarComponent/threadViewTopbarComponents
`;