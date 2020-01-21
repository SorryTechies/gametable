/**
 * Created by LastBerserk on 21.01.2020.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../scss/root.scss';

export default class CombatObject extends React.Component {
    render() {
        return <div
            style={{
                width: (this.props.size - 20).toString() + "px",
                height: (this.props.size - 20).toString() + "px",
                borderColor: this.props.borderColor,
                backgroundColor: this.props.unit.img ? this.props.unit.color ? this.props.unit.color : undefined : undefined,
                backgroundImage: this.props.unit.img ? "url('" + this.props.unit.img + "')" : undefined,
                backgroundSize: this.props.unit.img ? "cover" : undefined,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "3px"
            }}
            className={rootScss.map_object}
            onClick={this.props.onClick}
            key={this.props.unit.name}>{this.props.unit.img ? "" : this.props.unit.name}
        </div>
    }
}

CombatObject.propTypes = {
    size: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    unit: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};