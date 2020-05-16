/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import LoginController from "../logic/LoginController";
import StatusMenu from "./menu/pc/StatusMenu";
import StaticController from "../static/StaticController";
import StaticKeyboardController from "../static/StaticKeyboardController";
import ScaleSlider from "./ScaleSlider";
import MapGrid from "./MapGrid";
import BrowserWebSocket from "../logic/ws/BrowserWebSocket";
import WebSocketMessage from "../../common/logic/WebSocketMessage";
import ActionHighlight from "./menu/pc/ActionHighlight";
import PopupManager from "../popup/PopupManager";
import RuleActions from "../rules/RuleAction";
import DmPanel from "./menu/pc/DmPanel";
import RuleActionsConstants from "../rules/constants/RuleActionsConstants";
import BrowserMessenger from "../logic/ws/messagers/BrowserMessenger";
import RuleCharacterChangesBean from "../rules/RuleCharacterChangesBean";
import TARGET_TYPE from "../rules/constants/RuleActionTargetType";

const BAR_STATUS = 'status';
const ACTION_HIGHLIGHT = 'act';
const DM_STATUS = 'dm';
const DEFAULT = 60;

export default class CombatWindow extends React.Component {
    constructor(props) {
        super(props);
        /** @type RuleActionList */
        this.selectedActionList = null;
        this.state = {
            /** @type SessionMapBean */
            map: null,
            objects: [],
            /** @type RuleGameObject */
            objectSelected: null,
            /** @type RuleAction */
            clickRuleAction: null,
            clickTarget: null,
            statusBar: null,
            turn: null,
            gridSizeInt: DEFAULT,
            scale: 1,
            coloredGrid: []
        };
    }

    componentDidMount() {
        StaticController.subscribe({id: WebSocketMessage.TYPE_OBJECT, func: this.forceUpdate.bind(this)});
        StaticController.subscribe({id: WebSocketMessage.TYPE_INTENT, func: this.forceUpdate.bind(this)});
        StaticKeyboardController.subscribe(StaticKeyboardController.ESCAPER, this.clearSelection.bind(this));
        this.setState({
            map: StaticController.getMap(),
            objects: StaticController.getObjects()
        });
    }

    componentWillUnmount() {
        StaticController.unSubscribe(WebSocketMessage.TYPE_INTENT);
        StaticController.unSubscribe(WebSocketMessage.TYPE_OBJECT);
        StaticKeyboardController.unsubscribe(StaticKeyboardController.ESCAPER, this.clearSelection.bind(this));
    }

    clearSelection() {
        this.setState({
            statusBar: null,
            objectSelected: null,
            clickRuleAction: null,
            clickTarget: null
        })
    }

    validateAction(action) {
        try {
            action.validate();
            return true;
        } catch (e) {
            console.error(e);
            PopupManager.push(e.message);
            return false;
        }
    }

    addGraphics(action) {
    }

    removeGraphics(action) {
    }

    addNewCombatAction(action) {
        if (!this.validateAction(action)) return;
        this.addGraphics(action);
        StaticController.getRound().addAction(action);
        BrowserMessenger.sendNewIntentMessage(action);
    }

    removeCombatAction(action) {
        this.removeGraphics(action);
        StaticController.getRound().removeAction(action);
        BrowserMessenger.sendRemIntentMessage(action);
        this.forceUpdate();
    }

    clearAim(action) {
        if (action) this.addNewCombatAction(action);
        this.setState({
            statusBar: BAR_STATUS,
            clickRuleAction: null,
            clickTarget: null
        });
    }

    clickObject(unit) {
        if (this.state.clickRuleAction) {
            try {
                this.state.clickRuleAction.setTarget(TARGET_TYPE.UNIT, unit);
                this.clearAim(this.state.clickRuleAction);
            } catch (ignored) {
                console.warn(ignored);
                PopupManager.push("Нужно указать свободную клетку.");
            }
        } else {
            if (this.state.objectSelected) {
                this.clearSelection();
            } else {
                this.setState({
                    statusBar: BAR_STATUS,
                    objectSelected: unit,
                })
            }
        }
    }

    clickTable(x, y) {
        if (this.state.clickRuleAction) {
            try {
                this.state.clickRuleAction.setTarget(TARGET_TYPE.GROUND, {x: x, y: y});
                this.clearAim(this.state.clickRuleAction)
            } catch (ignored) {
                PopupManager.push("Нужно указать юнита.");
            }
        } else {
            if (this.state.objectSelected && LoginController.isDM()) {
                const pos = {x: x, y: y};
                this.state.objectSelected.movePoints.setStartingPoint(pos);
                RuleCharacterChangesBean.addPositionModification(this.state.objectSelected.id, pos);
                StaticController.sendBeans();
                this.clearSelection();
            }
        }
    }

    doAimAction(action) {
        if (action.targetType === TARGET_TYPE.NONE || action.targetType === TARGET_TYPE.ITEM) {
            this.clearAim(action);
        } else {
            this.setState({
                statusBar: ACTION_HIGHLIGHT,
                clickRuleAction: action
            });
        }
    }

    onActionDelete(action) {
        this.removeCombatAction(action);
        this.forceUpdate();
    }

    render() {
        if (this.state.objectSelected) this.selectedActionList = StaticController.getRound().getObject(this.state.objectSelected.id).actionList;
        const map = this.state.map;
        let statusBar = null;
        switch (this.state.statusBar) {
            case BAR_STATUS:
                statusBar = <StatusMenu
                    unit={this.state.objectSelected}
                    doAimAction={this.doAimAction.bind(this)}
                    actionList={this.selectedActionList}
                    onActionDelete={this.onActionDelete.bind(this)}/>;
                break;
            case ACTION_HIGHLIGHT:
                statusBar = <ActionHighlight text="ВЫБЕРЕТЕ ЦЕЛЬ"/>;
                break;
            case null:
                if (LoginController.isDM()) statusBar = <DmPanel/>;
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
                                         onClickObject={this.clickObject.bind(this)}
                                         objectSelected={this.state.objectSelected}
                                         onClickGrid={this.clickTable.bind(this)}/>
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
