/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the thread view managing this top bar.
    {Field}
        [Field/name]
            threadViewTopbarComponents
        [Field/model]
            ThreadViewTopbar
        [Field/type]
            o2m
        [Field/target]
            ThreadViewTopbarComponent
        Field/inverse]
            ThreadViewTopbarComponent/threadViewTopbar
`;