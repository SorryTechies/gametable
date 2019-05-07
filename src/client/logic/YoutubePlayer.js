/**
 * Created by LastBerserk on 28.04.2019.
 */
import * as React from "react";
import rootScss from '../../scss/root.scss';
import StaticController from "../static/StaticController";

const Y_API = "ytapi";
const Y_PLAYER = "youtube_player";
export default class YoutubePlayer extends React.Component {
    constructor(props) {
        super(props);
        this.player = null;
        this.state = {
            isMuted:  false
        }
    }

    async createPlayer() {
        const youtubeData = await StaticController.getMusic();
        if (!youtubeData.id) return;
        const YTNode = document.getElementById(Y_API);
        setTimeout(() => {
            console.log("Youtube node loaded.");
            this.player = new YT.Player(Y_PLAYER, {
                videoId: youtubeData.id,
                loop: true,
                events: {
                    onReady: e => {
                        console.log("Youtube player loaded.");
                        const w = e.target;
                        w.mute();
                        w.seekTo(youtubeData.currentTime);
                        w.playVideo();
                        this.setState({isMuted : true});
                    }
                }
            });
        }, 2000);
    }

    componentDidMount() {
        this.createPlayer().catch(e => console.error(e));
    }

    render() {
        return <div id={rootScss.music_popup}>
            <div id={Y_PLAYER} style={{position: "absolute", top: "-9999px", left: "-9999px"}}/>
            {this.state.isMuted ? <div className={rootScss.global_popup}>
                <button onClick={() => {
                    if (this.player) this.player.unMute();
                    this.setState({isMuted: false});
                }}>
                    Server want to play audio. Press to listen...
                </button>
            </div> : null}
        </div>
    }
}
