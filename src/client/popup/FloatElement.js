import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../scss/root.scss';

export default class FloatElement extends React.Component {
    render() {
        return <div className={rootScss.floatElement}>{this.props.element}</div>;
    }
}

FloatElement.propTypes = {
    element: PropTypes.element.isRequired
};