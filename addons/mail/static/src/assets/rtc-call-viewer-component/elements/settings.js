/** @odoo-module **/

import { Define } from '@mail/define';

import Dialog from 'web.OwlDialog';

export default Define`
    {Element}
        [Element/name]
            settings
        [Element/model]
            RtcCallViewerComponent
        [Element/isPresent]
            {Env/userSetting}
            .{UserSetting/rtcConfigurationMenu}
            .{RtcConfigurationMenu/isOpen}
        [Element/slot]
            {qweb}
                ${
                    `
                        <${Dialog}
                            size="'small'"
                            title="${
                                Define`
                                    {Locale/text}
                                        Settings
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
                            <RtcConfigurationMenuComponent/>
                            <t t-set-slot="buttons">
                                <!-- Explicit No buttons -->
                            </t>
                        </${Dialog}>
                    `
                }
`;
