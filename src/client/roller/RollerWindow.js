/**
 * Created by LastBerserk on 26.01.2019.
 */

import Roller from "./Roller";
import * as React from "react";
import rootScss from '../../scss/root.scss';

export default class RollerWindow extends React.Component {
    render() {
        return <div className={rootScss.menu_page}>
            <div className={rootScss.rollers}>
                <Roller max="20"/>
                <Roller max="10"/>
                <Roller max="8"/>
                <Roller max="6"/>
                <Roller max="4"/>
                <Roller max="100"/>
            </div>
        </div>
    }
}
