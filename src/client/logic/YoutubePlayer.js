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
        this.permissionGranted = false;
        this.videoData = null;
        this.state = {
            isMuted: false,
            showPermissionPopup: false
        }
    }

    async loadVideoDataAndCreatePlayer() {
        const youtubeData = await StaticController.getMusic();
        this.stopVideo();
        if (!youtubeData.id) return;
        this.videoData = youtubeData;
        console.log("Playing new video.");
        if (youtubeData.currentTime !== -1) this.createPlayer();
    }

    onStateChange(state) {
        alert(state.data);
        switch (state.data) {
            case YoutubePlayer.STATE.PLAYING:
                if (!this.permissionGranted) {
                    this.setState({showPermissionPopup: true});
                } else {
                    this.player.unMute();
                    this.player.setVolume(StaticSettings.getVolume());
                }
                break;
        }
    }

    createPlayer() {
        const ytObject = {
            videoId: this.videoData.id,
            startSeconds: this.videoData.currentTime,
        };
        if (this.player) {
            this.player.loadVideoById(ytObject);
        }
    }

    stopVideo() {
        if (this.player) this.player.stopVideo();
    }

    pauseVideo() {
        if (this.player) this.player.pauseVideo();
    }

    componentDidMount() {
        StaticSettings.subscribe({
            name: StaticSettings.VOLUME, func: volume => {
                if (this.player) {
                    this.player.setVolume(volume);
                }
            }
        });
        StaticController.subscribe({id: WsConstants.STATIC_MUSIC, func: this.loadVideoDataAndCreatePlayer.bind(this)});
        setTimeout(() => {
            console.log("Youtube node loaded.");
            try {
                const events = {
                    onReady: () => {
                        console.log("Youtube player loaded.");
                        this.player.mute();
                        this.loadVideoDataAndCreatePlayer().catch(e => {
                            console.error(e);
                            PopupManager.push(e.toString())
                        });
                    },
                    onStateChange: this.onStateChange.bind(this)
                };
                this.player = new YT.Player(Y_PLAYER, {events: events});
            } catch (e) {
                console.error(e)
            }
        }, 2000);
    }

    render() {
        return <div id={rootScss.music_popup}>
            <div id={Y_PLAYER} style={{position: "absolute", top: "-9999px", left: "-9999px"}}/>
            {this.state.showPermissionPopup ? <div className={rootScss.global_popup}>
                <button onClick={() => {
                    if (this.player) {
                        this.player.unMute();
                        this.player.setVolume(StaticSettings.getVolume());
                    }
                    this.setState({showPermissionPopup: false});
                    this.permissionGranted = true;
                }}>
                    Server want to play audio. Press to listen...
                </button>
            </div> : null}
        </div>
    }
}

YoutubePlayer.STATE = {
    NOT_STARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    QUEUED: 5
};
