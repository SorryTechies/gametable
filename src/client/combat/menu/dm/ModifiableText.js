/**
 * Created by LastBerserk on 10.03.2019.
 */

import * as React from "react";
import rootScss from '../../../../scss/root.scss';

export default class ModifiableText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.text,
            currentlyModified: false
        }
    }

    render() {
        if (this.state.currentlyModified) {
            return <input
                className={this.props.className}
                style={this.props.style}
                key={this.props.key}
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}/>
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