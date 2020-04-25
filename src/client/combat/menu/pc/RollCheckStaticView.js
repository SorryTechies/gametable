/**
 * Created by LastBerserk on 10.04.2020.
 */

import * as React from "react";
import StaticController from "../../../static/StaticController";
import PopupManager from "../../../popup/PopupManager";
import SKILLS from "../../../rules/constants/RuleSkillConstants";
import TranslationModule from "../../../rules/translation/TranslationModule";

export default class RollCheckStaticView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            val: 0,
            hidden: false,
            checkFor: []
        };
    }

    onValueChange(e) {
        this.setState({val: e.target.value});
    }

    onKeyChange(e) {
        this.setState({key: e.target.value});
    }

    onOk() {
        const value = parseInt(this.state.val);
        if (isNaN(value)) throw new Error("Value should be int.");
        if (!this.state.key) throw new Error("Key is empty.");
        if (this.state.hidden) {
            const passed = StaticController.massiveLocalRollCheck(this.state.key, value)
                .reduce((acc, obj) => {
                    if (acc) acc += ", ";
                    return acc + obj.name;
                }, "");
            PopupManager.push(`${this.state.key} check ${passed ? passed : "none"} passed`);
        } else {
            StaticController.massiveRollCheck(this.state.key, this.state.val, this.state.checkFor);
        }
        this.props.exitCallback();
    }

    onHiddenChange() {
        this.setState({hidden: !this.state.hidden});
    }

    isSelected(account) {
        return !!this.state.checkFor.find(acc => acc._id === account._id);
    }

    onParticipantSelected(account) {
        const index = this.state.checkFor.findIndex(acc => acc._id === account._id);
        if (index === -1) {
            this.state.checkFor.push(account);
        } else {
            this.state.checkFor.splice(index, 1);
        }
        this.forceUpdate();
    }

    render() {
        return <div>
            <select onChange={this.onKeyChange.bind(this)}>
                {Object.values(SKILLS).map(key => <option key={key} value={key}>{TranslationModule.getTranslation(key)}</option>)}
            </select>
            <input type="text" value={this.state.val} onChange={this.onValueChange.bind(this)}/>
            <div>
                For:
                {StaticController.getParticipants().map(account =>
                    <div key={account._id}>
                        {account.username}
                        <input type="checkbox" checked={this.isSelected(account)}
                               onChange={this.onParticipantSelected.bind(this, account)}/>
                    </div>)}
            </div>
            <div>
                Is hidden:
                <input type="checkbox" checked={this.state.hidden} onChange={this.onHiddenChange.bind(this)}/>
            </div>
            <button onClick={this.onOk.bind(this)}>ROLL</button>
        </div>
    }
}