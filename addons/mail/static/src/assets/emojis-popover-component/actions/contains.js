/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Returns whether the given node is self or a children of self.
    {Action}
        [Action/name]
            EmojisPopoverComponent/contains
        [Action/params]
            node
            record
        [Action/behavior]
            @record
            .{EmojisPopoverComponent/root}
            .{web.Element/contains}
                @node
`;
