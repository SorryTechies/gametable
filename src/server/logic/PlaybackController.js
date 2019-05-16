/**
 * Created by LastBerserk on 07.05.2019.
 */

/**
 * @typedef {{}} PlaybackObject
 * @property {string} url
 * @property {number} currentTime
 */

let id = "";
let currentPlayback = 0;
let playback = null;

function checkUrl(url) {
    return /https:\/\/www\.youtube\.com\/watch\?.*v=([^&]*)&|$/.exec(url)[1];
}

class PlaybackController {
    /**
     * @param {PlaybackObject} obj
     */
    static startPlayback(obj) {
        if (obj.currentTime === -1) {
            currentPlayback = -1;
            this.clearPlayback();
        } else {
            const videoId = checkUrl(obj.url);
            if (!videoId) throw Error("Wrong url.");
            if (!obj.currentTime || obj.currentTime < 0) obj.currentTime = 0;
            id = videoId;
            currentPlayback = obj.currentTime;
            this.clearPlayback();
            playback = setInterval(() => ++currentPlayback, 1000);
        }
    }

    static clearPlayback() {
        if (playback) {
            clearInterval(playback);
        }
    }

    /**
     * @return {PlaybackObject}
     */
    static getPlayback() {
        return {
            id: id,
            currentTime: currentPlayback
        }
    }
}

module.exports = PlaybackController;