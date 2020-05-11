import * as React from "react";
import * as PropTypes from "prop-types";
import rootScss from '../../../scss/root.scss';

export default class CustomSelectWithFavorite extends React.Component {
    render() {
        this.props.values.sort(item => item === this.props.favorite ? 1 : 0);
        return <div className={rootScss.customSelect}>
            {this.props.values.map((value, i) => {
                const icon = value === this.props.favorite ? "F" : "C";
                return <div key={i}
                     className={rootScss.customSelectOption}
                     onClick={this.props.onSelected.bind(this, value)}>
                    <div>{Array.isArray(this.props.displayNames) ? this.props.displayNames[i] : value}</div>
                    <div onClick={() => this.props.onFavoriteChange(value)}>{icon}</div>
                </div>
            })}
        </div>
    }
}

CustomSelectWithFavorite.propTypes = {
    displayNames: PropTypes.array,
    values: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired,
    favorite: PropTypes.any.isRequired,
    onFavoriteChange: PropTypes.func.isRequired
};