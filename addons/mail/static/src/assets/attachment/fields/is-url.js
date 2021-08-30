/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States if the attachment is an url.
    {Field}
        [Field/name]
            isUrl
        [Field/model]
            Attachment
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/compute]
            @record
            .{Attachment/type}
            .{=}
                url
            .{&}
                @record
                .{Attachment/url}
`;
