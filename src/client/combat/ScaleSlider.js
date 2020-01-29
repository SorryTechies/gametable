/**
 * Created by LastBerserk on 21.01.2020.
 */

import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../scss/root.scss';

const SCALE_MAX = 90;
const SCALE_MIN = 30;
const ON_CHANGE_INTERVAL = 10;
const DEFAULT = 60;

export default class ScaleSlider extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeTimer = null;
        this.currentZoomValue = DEFAULT;
    }

    render() {
        return <div
            className={rootScss.static_element}
            id={rootScss.zoom_background}>
            <input
                type="range"
                min={SCALE_MIN}
                max={SCALE_MAX}
                defaultValue={DEFAULT}
                id={rootScss.zoom}
                onChange={event => {
                    this.currentZoomValue = event.target.value;
                    if (this.onChangeTimer === null)
                        this.onChangeTimer = setTimeout(() => {
                            this.onChangeTimer = null;
                            this.props.onSliderChange(parseInt(this.currentZoomValue));
                        }, ON_CHANGE_INTERVAL);
                }}/>
        </div>;
    }
}

ScaleSlider.propTypes = {
    onSliderChange: PropTypes.func.isRequired
};