/** @odoo-module **/

import { Define } from '@mail/define';

import Dialog from 'web.Dialog';

export default Define`
    {Action}
        [Action/name]
            DiscussSidebarCategoryItem/_askAdminConfirmation
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
                                    You are the administrator of this channel. Are you sure you want to leave?
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