/**
 * Created by LastBerserk on 29.01.2019.
 */
import * as React from "react";
import rootScss from '../../scss/root.scss';

export default class StaticViewManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            /** @type {{title: string, obj: *}} */
            view: null
        }
    }

    componentDidMount() {
        StaticViewManager.addView = view => this.setState({view: view});
    }

    unMount() {
        this.setState({view: null});
    }

    render() {
        if (this.state.view) {
            const view = React.cloneElement(this.state.view.obj, {exitCallback: this.unMount.bind(this)});
            return <div className={rootScss.global_popup}>
                <div id={rootScss.global_popup_menu}><div>{this.state.view.title}</div><button onClick={this.unMount.bind(this)}>X</button></div>
                <div>{view}</div>
            </div>;
        } else {
            return null;
        }
    }
}

StaticViewManager.addView = () => {
};