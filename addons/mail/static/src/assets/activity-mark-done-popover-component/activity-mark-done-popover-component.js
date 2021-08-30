/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ActivityMarkDonePopoverComponent
        [Model/fields]
            activity
        [Model/template]
            root
                feedback
                buttons
                    doneScheduleNextButton
                    doneButton
                    discardButton
        [Model/lifecycles]
            onMounted
`;
