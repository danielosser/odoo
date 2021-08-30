/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            DialogComponent
        [Field/type]
            m2o
        [Field/target]
            Device
        [Field/default]
            {Env/device}
        [Field/observe]
            {Record/insert}
                [Record/traits]
                    Collection
                [0]
                    {Record/insert}
                        [Record/traits]
                            FieldObserver
                        [FieldObserver/event]
                            click
                        {Dev/comment}
                            Closes the dialog when clicking outside.
                            Does not work with attachment viewer
                            because it takes the whole space.
                        [FieldObserver/callback]
                            {func}
                                [in]
                                    ev
                                [out]
                                    {if}
                                        @record
                                        .{DialogComponent/component}
                                        .{&}
                                            @record
                                            .{DialogComponent/component}
                                            .{web.Element/contains}
                                                @ev
                                                .{web.Event/target}
                                    .{then}
                                        {break}
                                    {Dev/comment}
                                        TODO: this should be child logic
                                        (will crash if child doesn't have isCloseable!!)
                                        task-2092965
                                    {if}
                                        @record
                                        .{DialogComponent/component}
                                        .{&}
                                            {DialogComponent/isCloseable}
                                                @record
                                                .{DialogComponent/component}
                                            .{isFalsy}
                                    .{then}
                                        {break}
                                    {Record/delete}
                                        @record
                                        .{DialogComponent/dialog}
                [1]
                    {Record/insert}
                        [Record/traits]
                            FieldObserver
                        [FieldObserver/event]
                            keydown
                        [FieldObserver/callback]
                            {if}
                                @ev
                                .{KeyboardEvent/key}
                                .{!=}
                                    Escape
                            .{then}
                                {break}
                            {Record/delete}
                                @record
                                .{DialogComponent/dialog}
`;
