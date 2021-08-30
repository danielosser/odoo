/** @odoo-module **/

import { Define } from '@mail/define';

import Dialog from 'web.OwlDialog';

export default Define`
    {Element}
        [Element/name]
            changeLayout
        [Element/model]
            RtcCallViewerComponent
        [Element/isPresent]
            @record
            .{RtcCallViewerComponent/rtcCallViewer}
            .{RtcCallViewer/rtcLayoutMenu}
        [Element/slot]
        {qweb}
            ${
                `
                    <${Dialog}
                        size="'small'"
                        title="${
                            Define`
                                {Locale/text}
                                    Change Layout
                            `
                        }"
                        t-on-dialog-closed="${
                            Define`
                                {RtcCallViewer/onRtcSettingsDialogClosed}
                                    [0]
                                        @record
                                        .{RtcCallViewerComponent/rtcCallViewer}
                                    [1]
                                        @ev
                            `
                        }"
                    >
                        <RtcLayoutMenuComponent rtcLayoutMenu="${
                            Define`
                                @record
                                .{RtcCallViewerComponent/rtcCallViewer}
                                .{RtcCallViewer/rtcLayoutMenu}
                            `
                        }"/>
                        <t t-set-slot="buttons">
                            <!-- Explicit No buttons -->
                        </t>
                    </${Dialog}>
                `
            }
`;
