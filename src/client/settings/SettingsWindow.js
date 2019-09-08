/**
 * Created by LastBerserk on 07.09.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import StaticSettings from "../static/StaticSettings";

export default class SettingsWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={rootScss.global_popup}>
            <div>
                <label>Volume</label>
                <input type="range" min="0" max="10" defaultValue={StaticSettings.get(StaticSettings.VOLUME)} step="1"
                       onChange={event => StaticSettings.setVolume(event.target.value)}
                />
                <label>Edit Mode</label>
                <input type="checkbox"
                       checked={StaticSettings.get(StaticSettings.EDITING_MODE)}
                       onChange={() => {
                           StaticSettings.set(StaticSettings.EDITING_MODE, !StaticSettings.get(StaticSettings.EDITING_MODE));
                           this.forceUpdate();
                       }}
                />
            </div>
            <button onClick={() => {
                if (this.props.clickCallback) this.props.clickCallback();
            }}>Logout
            </button>
        </div>
    }
}