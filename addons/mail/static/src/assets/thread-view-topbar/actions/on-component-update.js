/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ThreadViewTopbar/onComponentUpdate
        [Action/params]
            record
                [type]
                    ThreadViewTopbar
        [Action/behavior]
            {if}
                @record
                .{ThreadViewTopbar/doFocusOnGuestNameInput}
            .{then}
                {web.Element/focus}
                    @record
                    .{ThreadViewTopbar/guestNameInputRef}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [ThreadViewTopbar/doFocusOnGuestNameInput]
                            {Record/empty}
            {if}
                @record
                .{ThreadViewTopbar/doFocusOnThreadNameInput}
            .{then}
                @record
                .{ThreadViewTopbar/threadNameInputRef}
                .{web.Element/focus}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [ThreadViewTopbar/doFocusOnThreadNameInput]
                            {Record/empty}
            {if}
                @record
                .{ThreadViewTopbar/doFocusOnThreadDescriptionInput}
            .{then}
                {UI/focus}
                    @record
                    .{ThreadViewTopbar/threadDescriptionInputRef}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [ThreadViewTopbar/doFocusOnThreadDescriptionInput]
                            {Record/empty}
            {if}
                @record
                .{ThreadViewTopbar/doSetSelectionStartOnGuestNameInput}
                .{!=}
                    undefined
                .{&}
                    @record
                    .{ThreadViewTopbar/doSetSelectionEndOnGuestNameInput}
                    .{!=}
                        undefined
                .{&}
                    @record
                    .{ThreadViewTopbar/doSetSelectionDirectionOnGuestNameInput}
                    .{!=}
                        undefined
            .{then}
                {web.Element/setSelectionRange}
                    [0]
                        @record
                        .{ThreadViewTopbar/guestNameInputRef}
                    [1]
                        @record
                        .{ThreadViewTopbar/doSetSelectionStartOnGuestNameInput}
                    [2]
                        @record
                        .{ThreadViewTopbar/doSetSelectionEndOnGuestNameInput}
                    [3]
                        @record
                        .{ThreadViewTopbar/doSetSelectionDirectionOnGuestNameInput}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [ThreadViewTopbar/doSetSelectionDirectionOnGuestNameInput
                            {Record/empty}
                        [ThreadViewTopbar/doSetSelectionEndOnGuestNameInput
                            {Record/empty}
                        [ThreadViewTopbar/doSetSelectionStartOnGuestNameInput
                            {Record/empty}
            {if}
                @record
                .{ThreadViewTopbar/doSetSelectionStartOnThreadNameInput}
                .{!=}
                    undefined
                .{&}
                    @record
                    .{ThreadViewTopbar/doSetSelectionEndOnThreadNameInput}
                    .{!=}
                        undefined
                .{&}
                    @record
                    .{ThreadViewTopbar/doSetSelectionDirectionOnThreadNameInput}
                    .{!=}
                        undefined
            .{then}
                @record
                .{ThreadViewTopbar/threadNameInputRef}
                .{web.Element/setSelectionRange}
                    [0]
                        @record
                        .{ThreadViewTopbar/doSetSelectionStartOnThreadNameInput}
                    [1]
                        @record
                        .{ThreadViewTopbar/doSetSelectionEndOnThreadNameInput}
                    [2]
                        @record
                        .{ThreadViewTopbar/doSetSelectionDirectionOnThreadNameInput}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [ThreadViewTopbar/doSetSelectionDirectionOnThreadNameInput]
                            {Record/empty}
                        [ThreadViewTopbar/doSetSelectionEndOnThreadNameInput]
                            {Record/empty}
                        [ThreadViewTopbar/doSetSelectionStartOnThreadNameInput]
                            {Record/empty}
            {if}
                @record
                .{ThreadViewTopbar/doSetSelectionStartOnThreadDescriptionInput}
                .{!=}
                    undefined
                .{&}
                    @record
                    .{ThreadViewTopbar/doSetSelectionEndOnThreadDescriptionInput}
                    .{!=}
                        undefined
                .{&}
                    @record
                    .{ThreadViewTopbar/doSetSelectionDirectionOnThreadDescriptionInput}
                    .{!=}
                        undefined
            .{then}
                {UI/setSelectionRange}
                    [0]
                        @record
                        .{ThreadViewTopbar/threadDescriptionInputRef}
                    [1]
                        @record
                        .{ThreadViewTopbar/doSetSelectionStartOnThreadDescriptionInput}
                    [2]
                        @record
                        .{ThreadViewTopbar/doSetSelectionEndOnThreadDescriptionInput}
                    [3]
                        @record
                        .{ThreadViewTopbar/doSetSelectionDirectionOnThreadDescriptionInput}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [ThreadViewTopbar/doSetSelectionDirectionOnThreadDescriptionInput]
                            {Record/empty}
                        [ThreadViewTopbar/doSetSelectionEndOnThreadDescriptionInput]
                            {Record/empty}
                        [ThreadViewTopbar/doSetSelectionStartOnThreadDescriptionInput]
                            {Record/empty}
`;