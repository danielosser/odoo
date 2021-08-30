/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            MessagingMenuComponent
        [Field/type]
            m2o
        [Field/target]
            Device
        [Field/default]
            {Env/device}
        [Field/observe]
            {Record/insert}
                [Record/traits]
                    FieldObserver
                [FieldObserver/event]
                    click
                [FieldObserver/callback]
                    {Dev/comment}
                        ignore click inside the menu
                    {func}
                        [in]
                            ev
                        [out]
                            {if}
                                @record
                                .{MessagingMenuComponent/root}
                                .{web.Element/contains}
                                    @ev
                                    .{web.MouseEvent/target}
                            .{then}
                                {break}
                            {Dev/comment}
                                in all other cases: close the messaging menu when
                                clicking outside
                            {MessagingMenu/close}
`;
