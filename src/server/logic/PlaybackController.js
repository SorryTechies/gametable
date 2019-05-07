/**
 * Created by LastBerserk on 07.05.2019.
 */

/**
 * @typedef {{}} PlaybackObject
 * @property {string} url
 * @property {number} currentTime
 */

let url = "";
let currentPlayback = 0;
let playback = null;

function checkUrl(url) {
    return /https:\/\/www.youtube.com\/watch?/.test(url);
}

class PlaybackController {
    /**
     * @param {PlaybackObject} obj
     */
    static startPlayback(obj) {
        if (!checkUrl(obj.url)) throw Error("Wrong url.");
        if (!obj.currentTime || obj.currentTime < 0) obj.currentTime = 0;
        url = obj.url;
        currentPlayback = obj.currentTime;
        if (playback) {
            clearInterval(playback);
            playback = null;
        }
        playback = setInterval(() => ++currentPlayback, 1000);
    }

    /**
     * @return {PlaybackObject}
     */
    static getPlayback() {
        return {
            url: url,
            currentTime: currentPlayback
        }
    }
}

module.exports = PlaybackController;