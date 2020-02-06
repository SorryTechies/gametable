/**
 * Created by LastBerserk on 08.02.2019.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../../scss/root.scss';

export default class ActionHighlight extends React.Component {
    render() {
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}>
            {this.props.text}
        </div>
    }
}

ActionHighlight.propTypes = {
    text: PropTypes.string.isRequired
};