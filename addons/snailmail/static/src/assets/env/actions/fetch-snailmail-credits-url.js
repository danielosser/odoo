/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Env/fetchSnailmailCreditsUrl
        [Action/feature]
            snailmail
        [Action/behavior]
            :snailmailCreditsUrl
                {Record/doAsync}
                    [0]
                        @env
                    [1]
                        {func}
                            @env
                            .{Env/owlEnv}
                            .{Dict/get}
                                services
                            .{Dict/get}
                                rpc
                            .{Function/call}
                                [model]
                                    iap.account
                                [method]
                                    get_credits_url
                                [args]
                                    [0]
                                        snailmail
            {Record/update}
                [0]
                    @env
                [1]
                    [Env/snailmailCreditsUrl]
                        @snailmailCreditsUrl
`;
