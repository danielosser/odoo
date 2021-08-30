/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            AttachmentViewerComponent
        [Field/type]
            m2o
        [Field/target]
            Device
        [Field/default]
            {Env/device}
        [Field/observe]
            {Record/insert}
                [Record/traits]
                    FieldObserver
                [FieldObserver/event]
                    click
                [FieldObserver/callback]
                    {if}
                        @record
                        .{AttachmentViewerComponent/isDragging}
                        .{isFalsy}
                    .{then}
                        {break}
                    {web.Event/stopPropagation}
                        @ev
                    {AttachmentViewerComponent/_stopDragging}
                        @record
`;