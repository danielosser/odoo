/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            ActivityComponent
        [Element/onClick]
            {if}
                @ev
                .{web.MouseEvent/target}
                .{web.Element/tag}
                .{=}
                    A
                .{&}
                    @ev
                    .{web.MouseEvent/target}
                    .{web.Element/dataset}
                    .{web.Dataset/oeId}
                .{&}
                    @ev
                    .{web.MouseEvent/target}
                    .{web.Element/dataset}
                    .{web.Dataset/oeModel}
            .{then}
                {Env/openProfile}
                    [id]
                        @ev
                        .{web.MouseEvent/target}
                        .{web.Element/dataset}
                        .{web.Dataset/oeId}
                    [model]
                        @ev
                        .{web.MouseEvent/target}
                        .{web.Element/dataset}
                        .{web.Dataset/oeModel}
                {Dev/comment}
                    avoid following dummy href
                {web.Event/preventDefault}
                    @ev
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex]
                0
                0
                auto
            [web.scss/padding]
                {scss/map-get}
                    {scss/$spacers}
                    2
`;
