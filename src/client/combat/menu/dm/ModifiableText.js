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
            StaticClicker.subscribe({id: id, func: this.onEvent.bind(this)});
            this.refs[INPUT_REF].focus();
        }
    }

    onEvent(event) {
        if (event.target !== this.refs[INPUT_REF]) {
            this.stopRedacting();
        }
    }

    stopRedacting() {
        this.subscribedForClick = false;
        StaticClicker.unSubscribe(this.refs[INPUT_REF].className);
        this.setState({currentlyModified: false});
        if (this.props.callback) this.props.callback(this.refs[INPUT_REF].value);
    }

    render() {
        if (this.state.currentlyModified) {
            return <input
                className={this.props.className}
                style={this.props.style}
                key={this.props.key}
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
                onKeyPress={event => {
                    if (event.key === 'Enter') this.stopRedacting();
                }}
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