import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../scss/root.scss';

export default class CustomSelect extends React.Component {
    render() {
        return <div className={rootScss.customSelect + " " + rootScss.unselectable}>
            {this.props.values.map((value, i) =>
                <div key={i}
                     className={rootScss.customSelectOption}
                     onClick={this.props.onSelected.bind(this, value)}>
                    {Array.isArray(this.props.displayNames) ? this.props.displayNames[i] : value}
                </div>
            )}
        </div>
    }
}

CustomSelect.propTypes = {
    displayNames: PropTypes.array,
    values: PropTypes.array.isRequired,
    currentlySelected: PropTypes.array,
    onSelected: PropTypes.func.isRequired
};