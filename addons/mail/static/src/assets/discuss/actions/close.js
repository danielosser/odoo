/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Close the discuss app. Should reset its internal state.
    {Action}
        [Action/name]
            Discuss/close
        [Action/params]
            discuss
        [Action/behavior]
            {Record/update}
                [0]
                    @discuss
                [1]
                    [Discuss/isOpen]
                        false
`;
