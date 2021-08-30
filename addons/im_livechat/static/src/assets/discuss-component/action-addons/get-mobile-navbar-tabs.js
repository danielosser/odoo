/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            DiscussComponent/getMobileNavbarTabs
        [ActionAddon/feature]
            im_livechat
        [ActionAddon/behavior]
            {Record/insert}
                [Record/traits]
                    Collection
                @original
                {Record/insert}
                    [Record/traits]
                        Dict
                    [icon]
                        fa
                        fa-comments
                    [id]
                        livechat
                    [label]
                        {Locale/text}
                            Livechat
`;
