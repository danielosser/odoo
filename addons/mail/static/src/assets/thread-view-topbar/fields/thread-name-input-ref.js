/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the OWL ref of the "thread name" input of this top bar.
        Useful to focus it, or to know when a click is done outside of it.
    {Field}
        [Field/name]
            threadNameInputRef
        [Field/model]
            ThreadViewTopbar
        [Field/type]
            o2o
        [Field/target]
            Element
        [Field/compute]
            @record
            .{ThreadViewTopbar/threadViewTopbarComponents}
            .{Collection/first}
            .{ThreadViewTopbarComponent/threadNameInput}
`;