/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Returns whether the given node is self or a children of self, including
        the emoji popover.
    {Action}
        [Action/name]
            ComposerViewComponent/contains
        [Action/params]
            record
                [type]
                    ComposerViewComponent
            node
                [type]
                    web.Node
        [Action/returns]
            Boolean
        [Action/behavior]
            {Dev/comment}
                emoji popover is outside but should be considered inside
            {if}
                @record
                .{ComposerViewComponent/emojisPopover}
                .{&}
                    {EmojisPopover/contains}
                        [0]
                            @record
                            .{ComposerViewComponent/emojisPopover}
                        [1]
                            @node
            .{then}
                true
            .{else}
                @record
                .{ComposerViewComponent/root}
                .{web.Element/contains}
                    @node
`;
