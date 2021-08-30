/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Prompt the browser print of this attachment.
    {Action}
        [Action/name]
            AttachmentViewerComponent/_print
        [Action/params]
            record
        [Action/behavior]
            :printWindow
                {Browser/open}
                    about:blank
                    _new
            {Document/open}
                @printWindow
                .{BrowserPrint/document}
            {Document/write}
                [0]
                    @printWindow
                    .{BrowserPrint/document}
                [1]
                    {html}
                        ${
                            `
                            <html>
                                <head>
                                    <script>
                                        function onloadImage() {
                                            setTimeout('printImage()', 10);
                                        }
                                        function printImage() {
                                            window.print();
                                            window.close();
                                        }
                                    </script>
                                </head>
                                <body onload='onloadImage()'>
                                    <img src="${
                                        Define`
                                            @record
                                            .{AttachmentViewerComponent/record}
                                            .{AttachmentViewer/attachment}
                                            .{Attachment/defaultSource}
                                        `
                                    }" alt=""/>
                                </body>
                            </html>
                            `
                        }
            {Document/close}
                @printWindow
                .{BrowserPrint/document}
`;
