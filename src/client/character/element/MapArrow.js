/**
 * Created by LastBerserk on 15.02.2020.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import anim from '../../../scss/anim.scss';

export default class MapArrow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type ? this.props.type : "move"
        };
    }

    render() {
        return <div className={anim.arrow} style={{

        }}/>
    }
}

MapArrow.propTypes = {
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
    type: PropTypes.string
};