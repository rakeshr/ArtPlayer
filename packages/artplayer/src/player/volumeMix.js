import { clamp } from '../utils';

export default function volumeMix(art, player) {
    const {
        refs: { $video },
        i18n,
        notice,
        storage,
    } = art;

    Object.defineProperty(player, 'volume', {
        get: () => $video.volume || 0,
        set: percentage => {
            if (percentage !== undefined) {
                $video.volume = clamp(percentage, 0, 1);
                notice.show(`${i18n.get('Volume')}: ${parseInt($video.volume * 100, 10)}`);
                if ($video.volume !== 0) {
                    storage.set('volume', $video.volume);
                }
                art.emit('volumeChange', $video.volume);
            }
        },
    });

    Object.defineProperty(player, 'mute', {
        value: () => {
            player.volume = 0;
        },
    });
}
