/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Close the attachment viewer by closing its linked dialog.
    {Action}
        [Action/name]
            AttachmentViewer/close
        [Action/params]
            attachmentViewer
        [Action/behavior]
            :dialog
                {Record/find}
                    [Record/traits]
                        Dialog
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Dialog/record}
                            .{=}
                                @attachmentViewer
            {if}
                @dialog
            .{then}
                {Record/delete}
                    @dialog
`;
