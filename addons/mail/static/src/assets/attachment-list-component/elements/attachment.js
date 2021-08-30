/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            attachment
        [Element/model]
            AttachmentListComponent
        [web.Element/style]
            {Dev/comment}
                Avoid overflow of long attachment text
            [web.scss/margin-bottom]
                {scss/map-get}
                    {scss/$spacers}
                    1
            [web.scss/margin-top]
                {scss/map-get}
                    {scss/$spacers}
                    1
            [web.scss/margin-inline-end]
                {scss/map-get}
                    {scss/$spacers}
                    1
            [web.scss/margin-inline-start]
                {scss/map-get}
                    {scss/$spacers}
                    0
            [web.scss/max-width]
                100%
`;
