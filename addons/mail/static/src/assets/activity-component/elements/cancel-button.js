/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            cancelButton
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            button
        [Model/traits]
            ActivityComponent/toolButton
        [web.Element/class]
            btn
            btn-link
        [Element/onClick]
            {web.Event/preventDefault}
                @ev
            {Activity/deleteServerRecord}
                @record
                .{ActivityComponent/activity}
            {Component/trigger}
                [0]
                    @record
                [1]
                    reload
                [2]
                    [keepChanges]
                        true
`;
