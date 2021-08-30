/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Briefly highlights the message.
    {Action}
        [Action/name]
            MessageView/highlight
        [Action/params]
            record
                [type]
                    MessageView
        [Action/behavior]
            {Browser/clearTimeout}
                @record
                .{MessageView/highlightTimeout}
            {Record/update}
                [0]
                    @record
                [1]
                    [MessageView/isHighlighted]
                        true
                    [MessageView/highlightTimeout]
                        {Browser/setTimeout}
                            {func}
                                {Record/update}
                                    [0]
                                        @record
                                    [1]
                                        [MessageView/isHighlighted]
                                            false
                            2000
`;
