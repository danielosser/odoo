/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ThreadViewTopbar/_onClickCaptureGlobal
        [Action/params]
            ev
                [type]
                    web.MouseEvent
            record
                [type]
                    ThreadViewTopbar
        [Action/behavior]
            {if}
                @record
                .{ThreadViewTopbar/isEditingGuestName}
                .{&}
                    @record
                    .{ThreadViewTopbar/guestNameInputRef}
                .{&}
                    {web.Element/contains}
                        [0]
                            @record
                            .{ThreadViewTopbar/guestNameInputRef}
                        [1]
                            @ev
                            .{web.Event/target}
                    .{isFalsy}
            .{then}
                {if}
                    @record
                    .{ThreadViewTopbar/pendingGuestName}
                    .{String/trim}
                    .{!=}
                        {String/empty}
                .{then}
                    {ThreadViewTopbar/_applyGuestRename}
                        @record
                .{else}
                    {ThreadViewTopbar/_resetGuestNameInput}
                        @record
            {if}
                @record
                .{ThreadViewTopbar/isEditingThreadName}
                .{&}
                    @record
                    .{ThreadViewTopbar/threadNameInputRef}
                .{&}
                    @record
                    .{ThreadViewTopbar/threadNameInputRef}
                    .{web.Element/contains}
                        @ev
                        .{web.Event/target}
                    .{isFalsy}
            .{then}
                {ThreadViewTopbar/_applyThreadRename}
                    @record
            {if}
                @record
                .{ThreadViewTopbar/isEditingThreadDescription}
                .{&}
                    @record
                    .{ThreadViewTopbar/threadDescriptionInputRef}
                .{&}
                    @record
                    .{ThreadViewTopbar/threadDescriptionInputRef}
                    .{web.Element/contains}
                        @ev
                        .{web.Event/target}
                    .{isFalsy}
            .{then}
                {ThreadViewTopbar/_applyThreadChangeDescription}
                    @record
`;