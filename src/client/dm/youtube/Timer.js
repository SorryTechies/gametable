/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../../scss/root.scss';
import NormalRequest from "../../logic/NormalRequest";
import StaticController from "../../static/StaticController";

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.playback = null;
        this.state = {
            playbackTime: this.props.time
        };
    }

    componentDidMount() {
        this.playback = setInterval(() => this.setState({playbackTime: this.state.playbackTime + 1}), 1000);
    }

    componentWillUnmount() {
        if (this.playback) {
            clearInterval(this.playback);
            this.playback = null;
        }
    }

    render() {
        return <div>{this.state.playbackTime}</div>
    }
}
