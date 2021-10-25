from odoo.tools.translate import _


class VideoProcess:
    def __init__(self, base64_source):
        """
        Initialize the `base64_source` image for processing.

        :param base64_source: the original video, processed by b64decode(...) to limit processing
        :type base64_source: string or bytes

        :raise: ValueError if video is bigger than `max_video_size`
        """
        self.max_video_size = 128 * (1024 ** 2)  # 128 Mb is the file size limit for videos

        self.video = base64_source or False
        if self.video and len(self.video) > self.max_video_size:
            # Checks if video size exceeds max size, currently set to 128Mb after discussion with AL
            raise ValueError(_("Video size too big, uploaded videos must be smaller than %s Mb.", str(self.max_video_size // (1024 ** 2))))


def video_process(base64_source):
    """
    Processes supplied video for storage in ir.attachment.
    """
    videoProcessor = VideoProcess(base64_source)
    return videoProcessor.video if videoProcessor.video else base64_source
