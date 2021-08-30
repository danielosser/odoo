/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MediaMonitoring/_loadAudioWorkletProcessor
        [Action/params]
            source
                [type]
                    MediaStreamSource
            audioContext
                [type]
                    AudioContext
            frequencyRange
                [type]
                    Collection
                [default]
                    80
                    1000
            minimumActiveCycles
                [type]
                    Integer
                [default]
                    10
            onThreshold
                [type]
                    Function
            onTic
                [type]
                    Function
            volumeThreshold
                [type]
                    Float
                [default]
                    0.3
        [Action/returns]
            Object
                [description]
                    @returns {Object} returnValue
                    @returns {function} returnValue.disconnect disconnect callback
        [Action/behavior]
            {AudioContext/resume}
                @audioContext
            {Dev/comment}
                Safari does not support Worklet.addModule
            {AudioWorklet/addModule}
                [0]
                    @audioContext
                    .{AudioContext/audioWorklet}
                [1]
                    /mail/rtc/audio_worklet_processor
            :thresholdProcessor
                {Record/insert}
                    [Record/traits]
                        AudioWorkletNode
                    [0]
                        @audioContext
                    [1]
                        audio-processor
                    [2]
                        [processorOptions]
                            [minimumActiveCycles]
                                @minimumActiveCycles
                            [volumeThreshold]
                                @volumeThreshold
                            [frequencyRange]
                                @frequencyRange
                            [postAllTics]
                                @onTic
                                .{isTruthy}
            {MediaStreamSource/connect}
                [0]
                    @source
                [1]
                    @thresholdProcessor
            .{MediaStreamSource/connect}
                @audioContext
                .{AudioContext/destination}
            {Record/update}
                [0]
                    @thresholdProcessor
                    .{AudioWorkletNode/port}
                [1]
                    [Port/onmessage]
                        {func}
                            [in]
                                event
                            [out]
                                :isAboveThreshold
                                    @event
                                    .{web.Event/data}
                                    .{Dict/get}
                                        isAboveThreshold
                                :volume
                                    @event
                                    .{web.Event/data}
                                    .{Dict/get}
                                        volume
                                {if}
                                    @onThreshold
                                    .{&}
                                        @isAboveThreshold
                                        .{!=}
                                            undefined
                                .{then}
                                    @onThreshold
                                    .{Function/call}
                                        @isAboveThreshold
                                {if}
                                    @onTic
                                    .{&}
                                        @volume
                                        .{!=}
                                            undefined
                                .{then}
                                    @onTic
                                    .{Function/call}
                                        @volume
            {Record/insert}
                [Record/traits]
                    Object
                [disconnect]
                    {func}
                        {AudioWorkletNode/disconnect}
                            @thresholdProcessor
`;
