/**
 * Created by LastBerserk on 23.03.2019.
 */
import * as React from "react";
import rootScss from '../../../scss/root.scss';
import InputWithDefaultText from "../../elements/InputWithDefaultText";
import TextAreaWithDefaultText from "../../elements/TextAreaWithDefaultText";
import StaticController from "../../static/StaticController";

export default class AddSpellPopup extends React.Component {

    constructor(props) {
        super(props);
        this.obj1 = {
            value: null
        };
        this.obj2 = {
            value: null
        };
        this.obj3 = {
            value: null
        };
        this.obj4 = {
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
                <InputWithDefaultText
                    className={rootScss.new_special_title}
                    text=""
                    defaultText="Allowed target..."
                    retObj={this.obj3}

                />
            </div>
            <div>
                <InputWithDefaultText
                    className={rootScss.new_special_title}
                    text=""
                    defaultText="Range..."
                    retObj={this.obj4}

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
                                if (!character.spells) character.spells = [];
                                character.spells.push({
                                    name: this.obj1.value,
                                    description: this.obj2.value,
                                    target: this.obj3.value,
                                    range: this.obj4.value
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