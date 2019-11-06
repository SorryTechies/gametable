/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import NormalRequest from "../logic/NormalRequest";
import BrowserWebSocket from "../logic/ws/BrowserWebSocket";
import LoginController from "../logic/LoginController";
import StatusMenu from "./menu/pc/StatusMenu";
import DMTools from "./menu/dm/DMTools";
import LockCombat from "../logic/requests/LockCombat";
import NextTurn from "../logic/requests/NextTurn";
import ModifiableText from "../elements/ModifiableText";
import StaticController from "../static/StaticController";
import * as WsConstants from "../../common/WsConstants";
import SetInitiativeRequest from "../logic/requests/SetInitiativeRequest";

const SUBSCRIBE_ID = 'map';

const SCALE_MAX = 90;
const SCALE_MIN = 30;
const BAR_STATUS = 'status';
const DM_STATUS = 'dm';
const ON_CHANGE_INTERVAL = 10;
const DEFAULT = 60;

export default class CombatWindow extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeTimer = null;
        this.currentZoomValue = DEFAULT;
        this.state = {
            /** @type CombatMap */
            map: null,
            /** @type CombatObject */
            objectSelected: null,
            statusBar: null,
            turn: null,
            gridSizeInt: DEFAULT,
            scale: 1,
            coloredGrid: []
        };
    }

    async getMap() {
        let map = await StaticController.getMap();
        this.setState({map: map})
    }

    async saveSelected() {
        const request = new NormalRequest();
        request.method = NormalRequest.METHOD.POST;
        request.path = '/saveObject';
        await request.send(this.state.objectSelected);
    }

    componentDidMount() {
        StaticController.subscribe({id: WsConstants.STATIC_MAP, func: this.getMap.bind(this)});
        this.getMap().catch(console.error);
    }

    componentWillUnmount() {
        StaticController.unSubscribe(WsConstants.STATIC_MAP);
    }

    setCellContent(i, j) {
        let initiative = this.state.map.currentInitiative || 0;
        for (let ind = 0; ind < this.state.map.objects.length; ind++) {
            const unit = this.state.map.objects[ind];
            if (unit.x === i && unit.y === j) {
                let color = "white";
                if (this.state.objectSelected) {
                    color = unit.name === this.state.objectSelected.name ? "red" : "white";
                }
                const obj = <div
                    style={{
                        width: (this.state.gridSizeInt - 20).toString() + "px",
                        height: (this.state.gridSizeInt - 20).toString() + "px",
                        borderColor: color,
                        backgroundColor: unit.img ? unit.color ? unit.color : undefined : undefined,
                        backgroundImage: unit.img ? "url('" + unit.img + "')" : undefined,
                        backgroundSize: unit.img ? "cover" : undefined,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "3px"
                    }}
                    className={rootScss.map_object}
                    onClick={() => this.clickObject(unit)}
                    key={unit.name}>{unit.img ? "" : unit.name}
                </div>;
                if (unit.initiative === initiative) {
                    return <div
                        id={rootScss.current_turn_indicator}
                        style={{
                            width: (this.state.gridSizeInt - 10).toString() + "px",
                            height: (this.state.gridSizeInt - 10).toString() + "px",
                        }}
                    >{obj}</div>
                } else {
                    return obj;
                }
            }
        }
        return null;
    }

    drawGrid() {
        const arr = [];
        for (let i = 0; i < this.state.map.gridY; i++) {
            const innerArr = [];
            for (let j = 0; j < this.state.map.gridX; j++) {
                const cellContent = this.setCellContent(i, j);
                innerArr.push(<th
                    style={{
                        width: this.state.gridSizeInt.toString() + "px",
                        height: this.state.gridSizeInt.toString() + "px",
                    }}
                    onClick={this.clickTable.bind(this, i, j)}
                    key={i.toString() + '_' + j.toString()}>
                    {cellContent}
                </th>);
            }
            arr.push(<tr key={i.toString()}>{innerArr}</tr>);
        }
        return <table
            style={{
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${this.state.map.img})`,
                width: this.state.gridSizeInt.toString() + "px",
                height: this.state.gridSizeInt.toString() + "px",
            }}>
            <tbody>
            {arr}
            </tbody>
        </table>
    }

    getStatusElement() {
        return <div className={`${rootScss.static_element} ${rootScss.combat_menu}`}><input/></div>
    }

    clickObject(unit) {
        if (this.state.objectSelected) {
            this.setState({
                statusBar: null,
                objectSelected: null,
            })
        } else {
            this.setState({
                statusBar: BAR_STATUS,
                objectSelected: unit,
            })
        }
    }

    painCell(x, y) {
        const index = this.state.coloredGrid.findIndex(item => item.x === x && item.y === y);
        if (index >= 0) {

        }
    }

    clickTable(x, y) {
        const move = () => {
            this.state.objectSelected.x = x;
            this.state.objectSelected.y = y;
            this.saveSelected()
                .then(this.getMap.bind(this))
                .catch(error => console.log(error));
            this.setState({
                selected: null,
                objectSelected: null
            })
        };
        if (LoginController.isDM()) {
            if (this.state.objectSelected) {
                move();
            } else {
                this.painCell(x, y);
            }
        } else {
            // if (this.state.turn === )
        }
    }

    setInitiative(id, initiative) {
        new SetInitiativeRequest().send(id, initiative).catch(error => console.log(error));
    }

    dmCombat() {
        if (!LoginController.isDM()) return null;
        return <div>
            <button onClick={() => {
                new LockCombat().send().catch(error => console.log(error));
                this.getMap().catch(error => console.log(error))
            }}>{this.state.map.initiativeLocked ? "UNLOCK" : "LOCK"}</button>
            {<div>
                <div>
                    {this.state.map.objects.map(object => {
                        const decoration = {textDecoration: object.initiative === this.state.map.currentInitiative ? "underline" : null};
                        return <div key={object.objectId} className={rootScss.dm_initiative}>
                            <p style={decoration} className={rootScss.dm_initiative_text}>{object.name}</p>
                            <ModifiableText
                                style={decoration}
                                className={rootScss.dm_initiative_text}
                                text={object.initiative}
                                callback={this.setInitiative.bind(this, object.objectId)}
                            />
                        </div>
                    })}
                </div>
            </div>}
            <button onClick={() => new NextTurn().send().catch(error => console.log(error))}>NEXT TURN</button>
        </div>
    }

    renderSlider() {
        return <div
            className={rootScss.static_element}
            id={rootScss.zoom_background}>
            <input
                type="range"
                min={SCALE_MIN}
                max={SCALE_MAX}
                defaultValue={DEFAULT}
                id={rootScss.zoom}
                onChange={event => {
                    this.currentZoomValue = event.target.value;
                    if (this.onChangeTimer === null)
                        this.onChangeTimer = setTimeout(() => {
                            this.onChangeTimer = null;
                            this.setState({gridSizeInt: parseInt(this.currentZoomValue)});
                        }, ON_CHANGE_INTERVAL);
                }}/>
            {this.dmCombat()}
        </div>;
    }

    render() {
        const map = this.state.map;
        let statusBar = null;
        switch (this.state.statusBar) {
            case BAR_STATUS:
                statusBar = <StatusMenu
                    unit={this.state.objectSelected}
                    dmCallback={() => this.setState({statusBar: DM_STATUS})}
                />;
                break;
            case DM_STATUS:
                statusBar = <DMTools addCallback={async (name, turns, description) => {
                    if (!this.state.objectSelected.buffs) this.state.objectSelected.buffs = [];
                    this.state.objectSelected.buffs.push({
                        name: name,
                        turns: turns,
                        description: description
                    });
                    await this.saveSelected().catch(error => console.log(error));
                }}/>;
                break;
        }
        if (map) {
            return <div>
                <div
                    className={rootScss.menu_page}
                    style={{paddingBottom: this.state.objectSelected ? "60px" : "0"}}
                >
                    <div style={{
                        width: (this.state.gridSizeInt * this.state.map.gridX) + 'px',
                        height: (this.state.gridSizeInt * this.state.map.gridY + 200) + 'px'
                    }}>
                        <div className={rootScss.combat_map}>
                            <div id={rootScss.combat_map_background}>{this.drawGrid()}</div>
                        </div>
                    </div>
                </div>
                {this.renderSlider()}
                {statusBar}
            </div>
        } else {
            return null;
        }
    }
}
