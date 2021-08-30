/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            FileUploaderComponent
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
                    @record
                    .{FileUploaderComponent/_fileUploadId}
                [FieldObserver/callback]
                    {FileUploaderComponent/_onAttachmentUploaded}
                    @record
`;
