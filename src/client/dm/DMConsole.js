/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import NormalRequest from "../logic/NormalRequest";

export default class DMConsole extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    resetData() {
        const request = new NormalRequest();
        request.path = "/debugReloadData";
        request.method = NormalRequest.METHOD.POST;
        request.send({});
    }

    render() {
        return <div className={rootScss.menu_page}>
            <button onClick={this.resetData.bind(this)}>ReloadDataForClients</button>
        </div>
    }
}
