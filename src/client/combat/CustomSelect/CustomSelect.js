import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../scss/root.scss';

function getClassName(val, selectedObject) {
    // mark as favorite, value in selected chain
    if (selectedObject.key === val.key || selectedObject.next && selectedObject.next.key === val.key) {
        return rootScss.customSelectOption + " " + rootScss.customSelectFavorite;
    } else {
        return rootScss.customSelectOption;
    }
}

export default class CustomSelect extends React.Component {
    render() {
        return <div className={rootScss.customSelect + " " + rootScss.unselectable}>
            {this.props.values.map((value, i) =>
                <div key={i}
                     className={getClassName(value, this.props.currentlySelected)}
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
    currentlySelected: PropTypes.object,
    onSelected: PropTypes.func.isRequired
};