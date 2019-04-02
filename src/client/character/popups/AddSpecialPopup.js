/**
 * Created by LastBerserk on 23.03.2019.
 */
import * as React from "react";
import rootScss from '../../../scss/root.scss';
import InputWithDefaultText from "../../elements/InputWithDefaultText";
import TextAreaWithDefaultText from "../../elements/TextAreaWithDefaultText";
import StaticController from "../../static/StaticController";

export default class AddSpecialPopup extends React.Component {

    constructor(props) {
        super(props);
        this.obj1 = {
            value: null
        };
        this.obj2 = {
            value: null
        };
    }

    render() {
        return <div>
            <div>
                <InputWithDefaultText
                    className={rootScss.new_special_title}
                    text=""
                    defaultText="Title..."
                    retObj={this.obj1}

                />
            </div>
            <div>
                <TextAreaWithDefaultText
                    className={rootScss.new_special_desc}
                    text=""
                    defaultText="Description..."
                    retObj={this.obj2}
                />
            </div>
            <div>
                <button onClick={() => {
                    if (this.obj1.value && this.obj2.value) {
                        StaticController.getCharacter()
                            .then(character => {
                                if (!character.feats) character.feats = [];
                                character.feats.push({
                                    name: this.obj1.value,
                                    description: this.obj2.value
                                });
                                return StaticController.saveCharacter();
                            })
                            .then(() => {
                                if (this.props.exitCallback) {
                                    this.props.exitCallback();
                                }
                            })
                            .catch(error => console.log(error))
                    }
                }} className={rootScss.new_special_save}>Save
                </button>
            </div>
        </div>;
    }
}