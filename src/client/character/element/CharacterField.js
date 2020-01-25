/**
 * Created by LastBerserk on 25.01.2020.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import rootScss from '../../../scss/root.scss';

export default class CharacterField extends React.Component {
    render() {
        return <th className={this.props.value.length > 20 ? rootScss.big_box : null}>{this.props.value}</th>;
    }
}

CharacterField.propTypes = {
    value: PropTypes.any.isRequired
};