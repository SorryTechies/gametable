import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../scss/root.scss';
import {getButtonState} from "./CommandButtonByKey";
import FloatElement from "../../popup/FloatElement";
import ACTIONS from "../../rules/constants/RuleActionsConstants";
import StaticClicker from "../../static/StaticClicker";
import CustomSelectWithFavorite from "../CustomSelect/CustomSelectWithFavorite";

export default class CommandButton extends React.Component {
    constructor(props) {
        super(props);
        this.id = "comb" + (this.props.index).toString();
        this.clickBlock = false;
        this.timeout = null;
        this.state = {float: null};
    }

    clear() {
        if (typeof this.timeout === "number") {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    onMouseClicked(event) {
        if (this.state.float && !this.clickBlock && !event.target.closest(`.${rootScss.floatElement}`)) {
            this.setState({float: null});
        }
    }

    componentDidMount() {
        StaticClicker.subscribe({id: this, func: this.onMouseClicked.bind(this)});
    }

    componentWillUnmount() {
        StaticClicker.unSubscribe(this);
    }

    clearFloat() {
        this.setState({float: null});
    }

    onSelected(value) {
        // TODO save changed value
        this.clearFloat();
    }

    onSavedChanged(newLayout) {
        this.props.actionList.gameObject.commandButtonLayout[this.props.index] = newLayout;
        this.clearFloat();
        this.forceUpdate();
    }

    setUpFloat() {
        const fav = this.props.actionList.gameObject.commandButtonLayout[this.props.index];
        this.setState({
            float: <div id={this.id}><FloatElement element={
                <CustomSelectWithFavorite
                    values={Object.values(ACTIONS)}
                    onSelected={this.onSelected.bind(this)}
                    favorite={fav}
                    onFavoriteChange={this.onSavedChanged.bind(this)}/>
            }/></div>
        });
    }

    onActionDown() {
        this.clear();
        this.timeout = setTimeout(() => {
            this.clickBlock = true;
            this.setUpFloat();
            this.clear();
        }, 1000);
    }

    onActionUp(action) {
        // Blocker for first mUp
        setTimeout(() => this.clickBlock = false, 100);
        if (typeof this.timeout === "number") {
            this.clear();
        }
    }

    render() {
        const layouts = this.props.actionList.gameObject.commandButtonLayout;
        const layout =  layouts[this.props.index];
        const state = getButtonState(layout);
        return <div className={rootScss.commandButton}>
            <img src={state.icon} alt={state.name}
                 onTouchStart={this.onActionDown.bind(this, state.action)}
                 onMouseDown={this.onActionDown.bind(this, state.action)}
                 onTouchEnd={this.onActionUp.bind(this, state.action)}
                 onMouseUp={this.onActionUp.bind(this, state.action)}/>
            {this.state.float}
        </div>
    }
}

CommandButton.propTypes = {
    index: PropTypes.number.isRequired,
    actionList: PropTypes.object.isRequired
};