/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import YoutubeControllPanel from "./youtube/YoutubeControlPanel";

export default class DMConsole extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return <div className={rootScss.menu_page}>
            <YoutubeControllPanel/>
        </div>
    }
}
