/** @odoo-module **/

import { Define } from '@mail/define';

import { hidePDFJSButtons } from '@web/legacy/js/libs/pdfjs';

export default Define`
    {Action}
        [Action/name]
            AttachmentViewerComponent/_hideUnwantedPdfJsButtons
        [Action/params]
            record
        [Action/behavior]
            {if}
                @record
                .{AttachmentViewerComponent/viewPdf}
            .{then}
                ${
                    () => hidePDFJSButtons(
                        Define`
                            @record
                            .{AttachmentViewerComponent/viewPdf}
                        `,
                    )
                }
`;
