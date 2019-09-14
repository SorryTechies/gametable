/**
 * Created by LastBerserk on 29.01.2019.
 */
import * as React from "react";
import rootScss from '../../scss/root.scss';

export default class PopupManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            popups: []
        }
    }

    push(data) {
        this.state.popups.unshift(data);
        this.setState({popups: this.state.popups});
        setTimeout(() => {
            this.state.popups.pop();
            this.setState({popups: this.state.popups});
        }, 5000);
    }

    componentDidMount() {
        PopupManager.push = this.push.bind(this);
    }

    render() {
        return <div>
            {this.state.popups.map((data, index) => {
                return <div key={index} style={{top: (85 + index * 50).toString() + "px"}}
                            className={rootScss.popup}>{data}</div>
            })}
        </div>
    }
}

PopupManager.push = () => {
};