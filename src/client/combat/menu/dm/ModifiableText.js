/**
 * Created by LastBerserk on 10.03.2019.
 */

import * as React from "react";
import rootScss from '../../../../scss/root.scss';
import StaticClicker from "../../../static/StaticClicker";

const INPUT_REF = "input";
export default class ModifiableText extends React.Component {
    constructor(props) {
        super(props);

        this.subscribedForClick = false;

        this.state = {
            value: this.props.text,
            currentlyModified: false
        }
    }

    componentDidUpdate() {
        if (this.state.currentlyModified && !this.subscribedForClick) {
            this.subscribedForClick = true;
            const id = this.refs[INPUT_REF].className;
            StaticClicker.subscribe({id: id, func: this.onEvent.bind(this, id)});
        }
    }

    onEvent(id, event) {
        if (event.target !== this.refs[INPUT_REF]) {
            this.subscribedForClick = false;
            StaticClicker.unSubscribe(id);
            this.stopRedacting(this.refs[INPUT_REF].value);
        }
    }

    stopRedacting(value) {
        this.setState({currentlyModified: false});
        if (this.props.callback) this.props.callback(value);
    }

    render() {
        if (this.state.currentlyModified) {
            return <input
                className={this.props.className}
                style={this.props.style}
                key={this.props.key}
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
                ref="input"
            />
        } else {
            return <p
                className={this.props.className}
                style={this.props.style}
                key={this.props.key}
                onDoubleClick={() => this.setState({currentlyModified: true})}
            >
                {this.state.value}
            </p>
        }
    }
}