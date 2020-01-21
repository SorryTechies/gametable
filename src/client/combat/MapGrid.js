/**
 * Created by LastBerserk on 21.01.2020.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../scss/root.scss';
import CombatObject from "./CombatObject";

export default class MapGrid extends React.Component {
    setCellContent(i, j) {
        let initiative = this.props.map.currentInitiative || 0;
        for (let ind = 0; ind < this.props.map.objects.length; ind++) {
            const unit = this.props.map.objects[ind];
            if (unit.x === i && unit.y === j) {
                let color = "white";
                if (this.props.objectSelected) {
                    color = unit.name === this.props.objectSelected.name ? "red" : "white";
                }
                const obj = <CombatObject key={unit.name}
                                          size={this.props.size}
                                          borderColor={color}
                                          unit={unit}
                                          onClick={() => this.props.onClickObject(unit)}/>;
                if (unit.initiative === initiative) {
                    return <div
                        id={rootScss.current_turn_indicator}
                        style={{
                            width: (this.props.size - 10).toString() + "px",
                            height: (this.props.size - 10).toString() + "px",
                        }}
                    >{obj}</div>
                } else {
                    return obj;
                }
            }
        }
        return null;
    }

    render() {
        const size = this.props.size.toString() + "px";
        const arr = [];
        for (let i = 0; i < this.props.map.gridY; i++) {
            const innerArr = [];
            for (let j = 0; j < this.props.map.gridX; j++) {
                innerArr.push(<th
                    style={{
                        width: size,
                        height: size,
                    }}
                    onClick={() => this.props.onClick(i, j)}
                    key={i.toString() + '_' + j.toString()}>
                    {this.setCellContent(i, j)}
                </th>);
            }
            arr.push(<tr key={i.toString()}>{innerArr}</tr>);
        }
        return <table
            style={{
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${this.props.map.dmImg ? this.props.map.dmImg : this.props.map.img})`,
                width: size,
                height: size,
            }}>
            <tbody>
            {arr}
            </tbody>
        </table>
    }
}

MapGrid.propTypes = {
    size: PropTypes.number.isRequired,
    map: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onClickObject: PropTypes.func.isRequired,
    objectSelected: PropTypes.object
};