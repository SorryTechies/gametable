/**
 * Created by LastBerserk on 21.01.2020.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../scss/root.scss';
import CombatObject from "./CombatObject";

export default class MapGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    getColor(unit) {
        let color = "white";
        if (this.props.objectSelected) {
            color = unit.name === this.props.objectSelected.name ? "red" : "white";
        }
        return color;
    }

    setCellContent(i, j) {
        const unit = this.props.objects.find(unit => unit.position.x === i && unit.position.y === j);
        if (!unit) return null;
        return <CombatObject key={unit.name}
                             size={this.props.size}
                             borderColor={this.getColor(unit)}
                             unit={unit}
                             onClick={() => this.props.onClickObject(unit)}/>;
    }

    renderTable() {
        const size = this.props.size.toString() + "px";
        const arr = [];
        for (let i = 0; i < this.props.map.size.x; i++) {
            const innerArr = [];
            for (let j = 0; j < this.props.map.size.y; j++) {
                const obj = <th
                    style={{
                        width: size,
                        height: size,
                    }}
                    onClick={() => this.props.onClick(i, j)}
                    key={i.toString() + '_' + j.toString()}>
                    {this.setCellContent(i, j)}
                </th>;
                innerArr.push(obj);
            }
            arr.push(<tr key={i.toString()}>{innerArr}</tr>);
        }
        return arr;
    }

    render() {
        const size = this.props.size.toString() + "px";
        return <table
            style={{
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${this.props.map.dm_url ? this.props.map.dm_url : this.props.map.url})`,
                width: size,
                height: size,
            }}>
            <tbody>
            {this.renderTable()}
            </tbody>
        </table>
    }
}

MapGrid.propTypes = {
    size: PropTypes.number.isRequired,
    map: PropTypes.object.isRequired,
    /** @type {Array<GameObject>} */
    objects: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onClickObject: PropTypes.func.isRequired,
    objectSelected: PropTypes.object
};