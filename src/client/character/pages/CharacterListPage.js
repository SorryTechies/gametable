/**
 * Created by LastBerserk on 04.03.2020.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import CharacterListRow from "../element/CharacterListRow";

export default class CharacterListPage extends React.Component {
    render() {
        return <div>
            <table>
                <tbody>
                {Object.keys(this.props.list).map(key => {
                    return <CharacterListRow key={key}
                                             description={this.props.list[key].description}
                                             name={this.props.list[key].name}
                                             onDelete={() => this.props.onDelete(key)}/>
                })}
                </tbody>
            </table>
            <button onClick={this.props.onCreate}>+</button>
        </div>;
    }
}

CharacterListPage.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired
};