/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            calendar
        [ModelAddon/model]
            ActivityComponent
        [ModelAddon/template]
            editButton
            rescheduleButton
                rescheduleButtonIcon
                rescheduleButtonLabel
        [ModelAddon/elementAddons]
            cancelButton
            editButton
`;
