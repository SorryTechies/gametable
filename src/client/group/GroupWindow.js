/**
 * Created by LastBerserk on 28.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import NormalRequest from "../logic/NormalRequest";
import StaticController from "../static/StaticController";

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
        request.method = NormalRequest.METHOD.POST;
        let result = await request.send(character);
    }

    async loadCharacter() {
        let result = (await StaticController.getMap()).objects.map(obj => obj.gameObject);
        this.setState({characters: result});
    }

    render() {
        let key = 1;
        return <div className={rootScss.menu_page}>
            {this.state.characters.map(character => {
                let maxHP = 0;
                try {
                    maxHP = CharacterDataHelper.calculateMaxHp(character);
                } catch (ignore) {}
                return <div key={++key}>
                    <p>{character.user ? character.user.username : key}</p>
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
