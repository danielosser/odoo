/** @odoo-module **/

import { Define } from '@mail/define';

import Dialog from 'web.Dialog';

export default Define`
    {Action}
        [Action/name]
            DiscussSidebarCategoryItem/_askLeaveGroupConfirmation
        [Action/params]
            record
                [type]
                    DiscussSidebarCategoryItem
        [Action/behavior]
            ${
                () => {
                    return new Promise(resolve => {
                        Dialog.confirm(
                            null,
                            Define`
                                {Locale/text}
                                    You are about to leave this group conversation and will no longer have access to it unless you are invited again. Are you sure you want to continue?
                            `,
                            {
                                buttons: [
                                    {
                                        text: Define`
                                            {Locale/text}
                                                Leave
                                        `,
                                        classes: 'btn-primary',
                                        close: true,
                                        click: resolve,
                                    },
                                    {
                                        text: Define`
                                            {Locale/text}
                                                Discard
                                        `,
                                        close: true,
                                    },
                                ],
                            }
                        );
                    });
                }
            }
`;