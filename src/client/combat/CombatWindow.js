/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import NormalRequest from "../logic/NormalRequest";
import LoginController from "../logic/LoginController";
import StatusMenu from "./menu/pc/StatusMenu";
import DMTools from "./menu/dm/DMTools";
import StaticController from "../static/StaticController";
import * as WsConstants from "../../common/WsConstants";
import StaticKeyboardController from "../static/StaticKeyboardController";
import CombatObject from "./CombatObject";
import ScaleSlider from "./ScaleSlider";
import MapGrid from "./MapGrid";
import BrowserWebSocket from "../logic/ws/BrowserWebSocket";
import WebSocketMessage from "../../common/logic/WebSocketMessage";

const BAR_STATUS = 'status';
const DM_STATUS = 'dm';
const DEFAULT = 60;

export default class CombatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** @type SessionMap */
            map: null,
            objects: [],
            objectSelected: null,
            statusBar: null,
            turn: null,
            gridSizeInt: DEFAULT,
            scale: 1,
            coloredGrid: []
        };
    }

    saveMoveAction(object) {
        BrowserWebSocket.sendMessage(new WebSocketMessage(WebSocketMessage.TYPE_OBJECT, {
            _id: this.state.object._id,
            x: object.position.x,
            y: object.position.y
        }));
    }

    componentDidMount() {
        //  StaticController.subscribe({id: WsConstants.STATIC_MAP, func: this.getMap.bind(this)});
        StaticKeyboardController.subscribe(StaticKeyboardController.ESCAPER, this.clearSelection.bind(this));
        this.setState({
            map: StaticController.getMap(),
            objects: StaticController.getObjects()
        });
    }

    componentWillUnmount() {
        //  StaticController.unSubscribe(WsConstants.STATIC_MAP);
        StaticKeyboardController.unsubscribe(StaticKeyboardController.ESCAPER, this.clearSelection.bind(this));
    }

    clearSelection() {
        this.setState({
            statusBar: null,
            objectSelected: null,
        })
    }

    clickObject(unit) {
        if (this.state.objectSelected) {
            this.clearSelection();
        } else {
            this.setState({
                statusBar: BAR_STATUS,
                objectSelected: unit,
            })
        }
    }

    clickTable(x, y) {
        if (LoginController.isDM() && this.state.objectSelected) {
            this.state.objectSelected.position.x = x;
            this.state.objectSelected.position.y = y;
            this.saveMoveAction(this.state.objectSelected);
            this.setState({
                selected: null,
                objectSelected: null
            })
        }
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
                    await this.saveSelected().then(this.clearSelection.bind(this)).catch(console.log);
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
                        width: (this.state.gridSizeInt * this.state.map.size.x) + 'px',
                        height: (this.state.gridSizeInt * this.state.map.size.y + 200) + 'px'
                    }}>
                        <div className={rootScss.combat_map}>
                            <div id={rootScss.combat_map_background}>
                                <MapGrid size={this.state.gridSizeInt}
                                         map={this.state.map}
                                         objects={this.state.objects}
                                         onClick={this.clickTable.bind(this)}
                                         onClickObject={this.clickObject.bind(this)}
                                         objectSelected={this.state.objectSelected}/>
                            </div>
                        </div>
                    </div>
                </div>
                {<ScaleSlider onSliderChange={value => this.setState({gridSizeInt: value})}/>}
                {statusBar}
            </div>
        } else {
            return null;
        }
    }
}
