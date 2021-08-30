/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            SoundEffect/play
        [Action/params]
            loop
                [type]
                    Boolean
                [default]
                    false
            volume
                [type]
                    Float
                [default]
                    1
            record
                [type]
                    SoundEffect
        [Action/behavior]
            {if}
                @record
                .{SoundEffect/audio}
                .{isFalsy}
            .{then}
                :audio
                    {Record/insert}
                        [Record/traits]
                            Audio
                :ext
                    {if}
                        {Audio/canPlayType}
                            [0]
                                @audio
                            [1]
                                audio/ogg; codecs=vorbis
                    .{then}
                        .ogg
                    .{else}
                        .mp3
                {Record/update}
                    [0]
                        @audio
                    [1]
                        [Audio/src]
                            @record
                            .{SoundEffect/path}
                            .{+}
                                @record
                                .{SoundEffect/filename}
                            .{+}
                                @ext
                {Record/update}
                    [0]
                        @record
                    [1]
                        [SoundEffect/audio]
                            @audio
            {Audio/play}
                @record
                .{SoundEffect/audio}
            {Record/update}
                [0]
                    @audio
                [1]
                    [Audio/currentTime]
                        0
                    [Audio/loop]
                        @loop
                    [Audio/volume]
                        @volume
            {Promise/resolve}
                {Audio/play}
                    @record
                    .{SoundEffect/audio}
            .{Promise/catch}
                {func}
`;
