/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../../scss/root.scss';
import StaticController from "../../../static/StaticController";

export default class DmPanel extends React.Component {
    render() {
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}>
            <button onClick={StaticController.finishRound}>NEXT_ROUND</button>
            <button onClick={StaticController.turnBuffs}>TURN_BUFFS</button>
        </div>
    }
}

DmPanel.propTypes = {
};