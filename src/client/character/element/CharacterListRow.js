/**
 * Created by LastBerserk on 04.03.2020.
 */

import * as React from "react";
import PropTypes from 'prop-types';

export default class CharacterListRow extends React.Component {
    render() {
        return <tr>
            <th>{this.props.name}</th>
            <th>{this.props.description}</th>
            <th><button onClick={() => this.props.onDelete()}>del</button></th>
        </tr>
    }
}

CharacterListRow.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
};

