/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            userInfo
        [Element/model]
            ThreadViewTopbarComponent
        [Element/isPresent]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/threadView}
            .{ThreadView/threadViewer}
            .{ThreadViewer/discussPublicView}
            .{&}
                {Device/isMobile}
                .{isFalsy}
        [web.Element/class]
            d-flex
            align-items-center
`;
