/**
 * Created by LastBerserk on 05.03.2020.
 */

import * as React from "react";
import PropTypes from 'prop-types';
import RuleFeatsConstants from "../../../rules/constants/RuleFeatsConstants";
import TranslationModule from "../../../rules/translation/TranslationModule";

export default class FeatsPopup extends React.Component {
    render() {
        return <div>
            <div>Add feat</div>
            {Object.values(RuleFeatsConstants).map(key => {
                const translation = TranslationModule.getTranslation(TranslationModule.MODULES.FEATS, key);
                return <div key={key} onClick={() => this.props.onPicked(key)}>
                    <div>{translation.name}</div>
                    <div>{translation.description}</div>
                </div>
            })}
            <button onClick={this.props.onClose}>close</button>
        </div>
    }
}

FeatsPopup.propTypes = {
    onPicked: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};