/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            threadDescription
        [Element/model]
            ThreadViewTopbarComponent
        [Model/traits]
            ThreadViewTopbarComponent/editableItem
        [Element/isPresent]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/thread}
            .{&}
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
                .{ThreadViewTopbar/thread}
                .{Thread/isChannelDescriptionChangeable}
            .{&}
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
                .{ThreadViewTopbar/isEditingThreadDescription}
                .{isFalsy}
            .{&}
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
                .{ThreadViewTopbar/description}
        [web.Element/class]
            text-truncate
            px-1
        [web.Element/title]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/thread}
            .{Thread/description}
        [Element/onClick]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/onClickTopbarThreadDescription}
                @ev
        [Element/onMouseenter]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/onMouseEnterTopBarThreadDescription}
                @ev
        [Element/onMouseleave]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/onMouseLeaveTopBarThreadDescription}
                @ev
        [web.Element/textContent]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/thread}
            .{Thread/description}
        [web.Element/style]
            {if}
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
                .{ThreadViewTopbar/isMouseOverThreadDescription}
                .{&}
                    {Env/isCurrentUserGuest}
                    .{isFalsy}
            .{then}
                [web.scss/background-color]
                    {scss/$white}
                [web.scss/border-color]
                    {scss/$border-color}
            .{else}
                [web.scss/border-color]
                    transparent
                    {Dev/comment}
                        presence of border even if invisible to prevent flicker
`;