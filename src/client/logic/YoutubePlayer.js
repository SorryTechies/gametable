/**
 * Created by LastBerserk on 28.04.2019.
 */
import * as React from "react";
import rootScss from '../../scss/root.scss';
import StaticController from "../static/StaticController";
import StaticSettings from "../static/StaticSettings";
import * as WsConstants from "../../common/WsConstants";
import PopupManager from "../popup/PopupManager";

const Y_API = "ytapi";
const Y_PLAYER = "youtube_player";
const MUSIC_VOLUME = 2;
export default class YoutubePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.player = null;
        this.state = {
            isMuted: false,
            permissionGranted: true
        }
    }

    async playVideo() {
        const youtubeData = await StaticController.getMusic();
        this.stopVideo();
        if (!youtubeData.id) return;
        console.log("Playing new video.");
        if (youtubeData.currentTime !== -1) this.createPlayer(youtubeData);
    }

    setUpVideo(youtubeData) {
        if (this.player) {
            this.player.seekTo(youtubeData.currentTime);
            this.player.playVideo();
        }
    }

    createPlayer(youtubeData) {
        const ytObject = {
            videoId: youtubeData.id,
            startSeconds: youtubeData.currentTime,
            events: {
                onReady: e => {
                    console.log("Youtube player loaded.");
                    this.player.mute();
                    this.setState({permissionGranted: false});
                    this.setUpVideo(youtubeData);
                }
            }
        };
        if (this.player) {
            this.player.loadVideoById(ytObject);
        } else {
            setTimeout(() => {
                console.log("Youtube node loaded.");
                try {
                    this.player = new YT.Player(Y_PLAYER, ytObject);
                } catch (e) {
                    console.error(e)
                }
            }, 2000);
        }
    }

    stopVideo() {
        if (this.player) this.player.stopVideo();
    }

    pauseVideo() {
        if (this.player) this.player.pauseVideo();
    }

    componentDidMount() {
        this.playVideo().catch(e => PopupManager.push(JSON.stringify(e)));
        StaticSettings.subscribe({
            name: StaticSettings.VOLUME, func: volume => {
                if (this.player) {
                    this.player.setVolume(volume);
                }
            }
        });
        StaticController.subscribe({id: WsConstants.STATIC_MUSIC, func: this.playVideo.bind(this)});
    }

    render() {
        return <div id={rootScss.music_popup}>
            <div id={Y_PLAYER} style={{position: "absolute", top: "-9999px", left: "-9999px"}}/>
            {!this.state.permissionGranted ? <div className={rootScss.global_popup}>
                <button onClick={() => {
                    if (this.player) {
                        this.player.unMute();
                        this.player.setVolume(StaticSettings.getVolume());
                    }
                    this.setState({permissionGranted: true});
                }}>
                    Server want to play audio. Press to listen...
                </button>
            </div> : null}
        </div>
    }
}
