/**
 * Created by LastBerserk on 24.04.2020.
 */

import * as React from "react";

export default class RollCheckView extends React.Component {
    render() {
        return <div>
            <button onClick={this.props.onClickFunc}>ROLL
            </button>
        </div>
    }
}