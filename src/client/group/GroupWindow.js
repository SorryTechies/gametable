/**
 * Created by LastBerserk on 28.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import Roller from "../roller/Roller";
import NormalRequest from "../logic/NormalRequest";

const CharacterDataHelper = require("../../common/CharacterDataHelper");

export default class GroupWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            /** @type [Character] */
            characters: []
        };
    }

    componentDidMount() {
        this.loadCharacter().catch(e => console.log(e))
    }

    async saveCharacter(character) {
        const request = new NormalRequest();
        request.path = '/saveCharacter';
        request.method = 'POST';
        let result = await request.send(character);
    }

    async loadCharacter() {
        const request = new NormalRequest();
        request.path = '/loadGroup';
        let result = await request.send();
        this.setState({characters: result});
    }

    render() {
        return <div className={rootScss.menu_page}>
            {this.state.characters.map(character => {
                const maxHP = CharacterDataHelper.calculateMaxHp(character);
                return <div key={character.user.username}>
                    <p>{character.user.username}</p>
                    <p>{"HP " + (maxHP - character.damage).toString() + "/" + maxHP.toString()}</p>
                    <button onClick={() => {
                        character.damage++;
                        this.saveCharacter(character)
                            .then(() => this.setState({characters: this.state.characters}))
                            .catch(error => console.log(error));
                    }}>-
                    </button>
                    <button onClick={() => {
                        if (character.damage > 0) {
                            character.damage--;
                            this.saveCharacter(character)
                                .then(() => this.setState({characters: this.state.characters}))
                                .catch(error => console.log(error));
                        }
                    }}>+
                    </button>
                </div>
            })}
        </div>
    }
}
