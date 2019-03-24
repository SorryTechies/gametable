/**
 * Created by LastBerserk on 24.03.2019.
 */
import * as React from "react";
import rootScss from '../../scss/root.scss';
import StaticClicker from "../static/StaticClicker";

export default class InputWithDefaultText extends React.Component {
    constructor(props) {
        super(props);

        this.subscribedForClick = false;

        this.state = {
            value: this.props.text,
            wasModified: !!this.props.text
        }
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }

    onFocus() {
        this.setState({wasModified: true});
    }

    onFocusOut() {
        if (!this.state.value) {
            this.setState({wasModified: false});
        }
    }

    render() {
        const className = this.props.className;
        if (this.state.wasModified) {
            this.props.retObj.value = this.state.value;
            return <input  onFocus={this.onFocus.bind(this)}
                          onBlur={this.onFocusOut.bind(this)}
                          onChange={this.onChange.bind(this)}
                          value={this.state.value}
                          className={className}/>
        } else {
            this.props.retObj.value = null;
            return <input  className={className + " " + rootScss.input_default_text}
                          onFocus={this.onFocus.bind(this)}
                          onBlur={this.onFocusOut.bind(this)}
                          onChange={this.onChange.bind(this)}
                          value={this.props.defaultText}/>
        }
    }
}