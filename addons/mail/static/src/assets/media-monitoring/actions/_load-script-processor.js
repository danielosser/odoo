/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MediaMonitoring/_loadScriptProcessor
        [Action/params]
            source
                [type]
                    MediaStreamSource
            audioContext
                [type]
                    AudioContext
            frequencyRange
                [type]
                    Collection<Number>
                [default]
                    80
                    1000
            minimumActiveCycles
                [type]
                    Number
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
            {Dev/comment}
                audio setup
            :bitSize
                1024
            :analyser
                {AudioContext/createAnalyzer}
                    @audioContext
            {MediaStreamSource/connect}
                [0]
                    @source
                [1]
                    @analyser
            :scriptProcessorNode
                {AudioContext/createScriptProcessor}
                    [0]
                        @audioContext
                    [1]
                        @bitSize
                    [2]
                        1
                    [3]
                        1
            {Analyzer/connect}
                [0]
                    @analyser
                [1]
                    @scriptProcessorNode
            {Record/update}
                [0]
                    @analyzer
                [1]
                    [Analyzer/fftsize]
                        @bitSize
            {ScriptProcessor/connect}
                [0]
                    @scriptProcessorNode
                [1]
                    @audioContext
                    .{AudioContext/destination}
            {Dev/comment}
                timing variables
            :processInterval
                50
                {Dev/comment}
                    how many ms between each computation
            :intervalInFrames
                @processInterval
                .{/}
                    1000
                .{*}
                    @analyser
                    .{Analyzer/context}
                    .{Context/sampleRate}
            :nextUpdateFrame
                @processInterval
            {Dev/comment}
                process variables
            :activityBuffer
                0
            :wasAboveThreshold
                undefined
            :isAboveThreshold
                false
            {Record/update}
                [0]
                    @scriptProcessorNode
                [1]
                    [ScriptProcessor/onaudioprocess]
                        {func}
                            {Dev/comment}
                                throttles down the processing tic rate
                            :nextUpdateFrame
                                @nextUpdateFrame
                                .{-}
                                    @bitSize
                            {if}
                                @nextUpdateFrame
                                .{>=}
                                    0
                            .{then}
                                {break}
                            :nextUpdateFrame
                                @nextUpdateFrame
                                .{+}
                                    @intervalInFrames
                            {Dev/comment}
                                computes volume and threshold
                            :normalizedVolume
                                {MediaMonitoring/getFrequencyAverage}
                                    [0]
                                        @analyser
                                    [1]
                                        @frequencyRange
                                        .{Collection/first}
                                    [2]
                                        @frequencyRange
                                        .{Collection/second}
                            {if}
                                @normalizedVolume
                                .{>=}
                                    @volumeThreshold
                            .{then}
                                :activityBuffer
                                    @minimumActiveCycles
                            .{elif}
                                @normalizedVolume
                                .{<}
                                    @volumeThreshold
                                .{&}
                                    @activityBuffer
                                    .{>}
                                        0
                            .{then}
                                :activityBuffer
                                    @activityBuffer
                                    .{-}
                                        1
                            :isAboveThreshold
                                @activityBuffer
                                .{>}
                                    0
                            {if}
                                @onTic
                            .{then}
                                @onTic
                                .{Function/call}
                                    @normalizedVolume
                            {if}
                                @wasAboveThreshold
                                .{!=}
                                    @isAboveThreshold
                            .{then}
                                :wasAboveThreshold
                                    @isAboveThreshold
                                {if}
                                    @onThreshold
                                .{then}
                                    @onThreshold
                                    .{Function/call}
                                        @isAboveThreshold
            {Object}
                [disconnect]
                    {func}
                        {Analyzer/disconnect}
                            @analyzer
                        {ScriptProcessor/disconnect}
                            @scriptProcessorNode
                        {Record/update}
                            [0]
                                @scriptProcessorNode
                            [1]
                                [ScriptProcessor/onaudioprocess]
                                    null
`;
