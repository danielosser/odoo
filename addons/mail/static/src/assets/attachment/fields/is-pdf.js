/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States if the attachment is a PDF file.
    {Field}
        [Field/name]
            isPdf
        [Field/model]
            Attachment
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/compute]
            @record
            .{Attachment/mimetype}
            .{=}
                application/pdf
`;
