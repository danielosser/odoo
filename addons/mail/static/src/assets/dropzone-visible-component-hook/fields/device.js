/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            device
        [Field/model]
            DropzoneVisibleComponentHook
        [Field/type]
            m2o
        [Field/target]
            Device
        [Field/default]
            {Env/device}
        [Field/observe]
            {Dev/comment}
                Shows the dropzone when entering the browser window, to let the
                user know where he can drop its file.
                Avoids changing state when entering inner dropzones.
            {Record/insert}
                [Record/traits]
                    Collection
                {Record/insert}
                    [Record/traits]
                        FieldObserver
                    [FieldObserver/event]
                        dragenter
                    [FieldObserver/callback]
                        {func}
                            [in]
                                ev
                            [out]
                                {if}
                                    @record
                                    .{DropzoneVisibleComponentHook/dragCount}
                                    .{=}
                                        0
                                .{then}
                                    {Record/update}
                                        [0]
                                            @record
                                        [1]
                                            [DropzoneVisibleComponentHook/value]
                                                true
                                .{else}
                                    {Record/update}
                                        [0]
                                            @record
                                        [1]
                                            [DropzoneVisibleComponentHook/dragCount]
                                                {Field/add}
                                                    1
                {Record/insert}
                    [Record/traits]
                        FieldObserver
                    [FieldObserver/event]
                        dragleave
                    [FieldObserver/callback]
                        {func}
                            {Record/update}
                                [0]
                                    @record
                                [1]
                                    [DropzoneVisibleComponentHook/dragCount]
                                        {Field/remove}
                                            1
                            {if}
                                @record
                                .{DropzoneVisibleComponentHook/dragCount}
                                .{=}
                                    0
                            .{then}
                                {Record/update}
                                    [0]
                                        @record
                                    [1]
                                        [DropzoneVisibleComponentHook/value]
                                            true
                {Record/insert}
                    [Record/traits]
                        FieldObserver
                    [FieldObserver/event]
                        drop
                    [FieldObserver/callback]
                        {func}
                            {Record/update}
                                [0]
                                    @record
                                [1]
                                    [DropzoneVisibleComponentHook/dragCount]
                                        0
                                    [DropzoneVisibleComponentHook/value]
                                        false
                {Dev/comment}
                    Thoses Events prevent the browser to open or
                    download the file if it's dropped outside of the dropzone.
                {Record/insert}
                    [Record/traits]
                        FieldObserver
                    [FieldObserver/event]
                        dragover
                    [FieldObserver/callback]
                        {func}
                            [in]
                                ev
                            [out]
                                {web.Event/preventDefault}
                                    @ev
                {Record/insert}
                    [Record/traits]
                        FieldObserver
                    {Dev/comment}
                        AKU TODO: should be on window here,
                        previous is handled on document
                    [FieldObserver/event]
                        drop
                    [FieldObserver/callback]
                        {func}
                            [in]
                                ev
                            [out]
                                {web.Event/preventDefault}
                                    @ev
`;