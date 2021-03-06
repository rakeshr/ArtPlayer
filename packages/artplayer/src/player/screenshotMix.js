import { secondToTime, downloadFile, def } from '../utils';

export default function screenshotMix(art, player) {
    const {
        option,
        notice,
        template: { $video },
    } = art;

    def(player, 'getScreenshotDataURL', {
        value: () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = $video.videoWidth;
                canvas.height = $video.videoHeight;
                canvas.getContext('2d').drawImage($video, 0, 0);
                return canvas.toDataURL('image/png');
            } catch (err) {
                notice.show = err;
                throw err;
            }
        },
    });

    def(player, 'getScreenshotBlobUrl', {
        value: () =>
            new Promise((resolve, reject) => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = $video.videoWidth;
                    canvas.height = $video.videoHeight;
                    canvas.getContext('2d').drawImage($video, 0, 0);
                    canvas.toBlob(blob => {
                        resolve(URL.createObjectURL(blob));
                    });
                } catch (err) {
                    notice.show = err;
                    reject(err);
                }
            }),
    });

    def(player, 'screenshot', {
        value: () => {
            const dataUri = player.getScreenshotDataURL();
            if (dataUri) {
                downloadFile(dataUri, `${option.title || 'artplayer'}_${secondToTime($video.currentTime)}.png`);
                art.emit('screenshot', dataUri);
            }
        },
    });
}
