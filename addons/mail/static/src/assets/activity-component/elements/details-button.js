/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsButton
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            a
        [Model/traits]
            Hoverable
        [web.Element/class]
            btn
            btn-link
        [Element/onClick]
            {Record/update}
                [0]
                    @record
                [1]
                    [ActivityComponent/areDetailsVisible]
                        @record
                        .{ActivityComponent/areDetailsVisible}
                        .{isFalsy}
        [web.Element/role]
            button
        [web.Element/style]
            {Dev/comment}
                Needed specifity to counter default bootstrap style
            {scss/selector}
                [0]
                    a:not([href]):not([tabindex]).&
                [1]
                    [web.scss/background]
                        transparent
                    [web.scss/opacity]
                        0.5
                    [web.scss/color]
                        {scss/gray}
                            500
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                {scss/selector}
                    [0]
                        a:not([href]):not([tabindex]).&
                    [1]
                        [web.scss/opacity]
                            1
                        [web.scss/color]
                            {scss/gray}
                                600
`;
