/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            ComposerViewComponent
        [Field/type]
            m2o
        [Field/target]
            Device
        [Field/defaut]
            {Env/device}
        [Field/observe]
            {Record/insert}
                [Record/traits]
                    FieldObserver
                [FieldObserver/event]
                    click
                [FieldObserver/callback]
                    {func}
                        [in]
                            ev
                        [out]
                            {if}
                                {ComposerViewComponent/contains}
                                    @record
                                    @ev
                                    .{web.Event/target}
                            .{then}
                                {break}
                            {Dev/comment}
                                Let event be handled by bubbling handlers first
                            {Browser/setTimeout}
                                0
                            {if}
                                {Event/isHandled}
                                    [0]
                                        @ev
                                    [1]
                                        MessageActionList/replyTo
                            .{then}
                                {break}
                            {ComposerView/discard}
                                @record
                                .{ComposerViewComponent/composerView}
`;
