/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../../scss/root.scss';
import NormalRequest from "../../logic/NormalRequest";
import StaticController from "../../static/StaticController";
import Timer from "./Timer";

export default class YoutubeControlPanel extends React.Component {

    constructor(props) {
        super(props);
        this.playback = null;
        this.state = {
            musicInput: "",
            musicTime: 0,
            playbackCurrentTime: 0,
            playbackTime: 0
        };
    }

    componentDidMount() {
        this.getPlaybackStatus();
    }

    getPlaybackStatus() {
        StaticController.getMusic()
            .then(result => this.setState({
                playbackCurrentTime: result.currentTime
            }))
            .catch(e => console.error(e));
    }

    async postPlayback() {
        const request = new NormalRequest();
        request.path = "/postPlaybackStatus";
        request.method = "POST";
        request.send({
            url: this.state.musicInput,
            currentTime: this.state.musicTime
        });
        this.getPlaybackStatus();
    }

    isCurrentlyPlaying() {
        return this.state.playbackCurrentTime > 0;
    }

    parseTime(time) {
        return parseInt(time);
    }

    renderPlayback() {
        if (this.playback) clearInterval(this.playback);
        this.playback = setInterval(() => this.sta, 1000);
        return <div>
            <progress/>
            <div>
                <Timer time={this.state.playbackCurrentTime}/>
                {"/" + this.state.playbackTime}
            </div>
        </div>
    }

    stopPlayback() {
        const request = new NormalRequest();
        request.path = "/postPlaybackStatus";
        request.method = NormalRequest.METHOD.POST;
        request.send({
            currentTime: -1
        });
        this.getPlaybackStatus();
    }

    render() {
        return <div className={rootScss.menu_page}>
            <div>
                <input type="text"
                       id={rootScss.youtube_input_url}
                       onChange={event => this.setState({musicInput: event.target.value})}
                       value={this.state.musicInput}/>
                <input type="number"
                       id={rootScss.youtube_input_start}
                       onChange={event => this.setState({musicTime: this.parseTime(event.target.value)})}
                       value={this.state.musicTime}/>
                <button className={rootScss.youtube_button} onClick={this.postPlayback.bind(this)}>Play</button>
                <button className={rootScss.youtube_button} onClick={this.stopPlayback.bind(this)}>Stop</button>
                <div id={rootScss.youtube_timer}>
                    {this.isCurrentlyPlaying() ? this.renderPlayback() : <div>Nothing playing currently...</div>}
                </div>
            </div>
        </div>
    }
}
