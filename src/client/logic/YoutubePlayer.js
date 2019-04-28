/**
 * Created by LastBerserk on 28.04.2019.
 */
import * as React from "react";
import rootScss from '../../scss/root.scss';

const Y_API = "ytapi";
const Y_PLAYER = "youtube_player";
export default class YoutubePlayer extends React.Component {
    constructor(props) {
        super(props);

    }

    createPlayer() {
        const YTNode = document.getElementById(Y_API);
        YTNode.onload = setTimeout.bind(null, () => {
            this.player = new YT.Player(Y_PLAYER, {
                videoId: 'POHscfRZty8',
                loop: true,
                events: {
                    onReady: e => {
                        e.target.mute();
                        e.target.playVideo();
                    }
                }
            });
        }, 1000);
    }

    componentDidMount() {
        this.createPlayer();
    }

    render() {
        return <div id={rootScss.music_popup}>
            <div id={Y_PLAYER} style="position: absolute; top: -9999px; left: -9999px;"/>
            <button onClick={() => {this.player.unMute()}}>Server want to play audio. Press to listen...</button>
        </div>
    }
}
