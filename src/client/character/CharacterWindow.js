/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as React from "react";
import rootScss from '../../scss/root.scss';
import LoginController from "../logic/LoginController";
import NormalRequest from "../logic/NormalRequest";
import Roller from "../roller/Roller";
import PathfinderCharacterCore from "./PathfinderCharacterCore";
import PopupManager from "../popup/PopupManager";
import RollInitiative from "../logic/requests/RollInitiative";
import DiceRoller from "../logic/DiceRoller";
import StaticController from "../static/StaticController";

const CharacterHelper = require('../../common/CharacterDataHelper');

/**
 * @param {[[]]} rows
 * @param {Function | [Function]} [callbacks]
 * @return {XML}
 */
function generateTable(rows, callbacks) {
    const tr = [];
    for (let i = 0; i < rows.length; i++) {
        const th = [];
        for (let j = 0; j < rows[i].length; j++) {
            let data = rows[i][j];
            if (data === undefined) data = "";
            th.push(<th
                key={i.toString() + '_' + j.toString()}
                className={data.length && data.length > 20 ? rootScss.big_box : null}
                onClick={Array.isArray(callbacks) ? () => callbacks[j](data) : null}
            >{data}</th>);

        }
        tr.push(<tr
            key={i}
            onClick={Array.isArray(callbacks) || !callbacks ? null : () => callbacks(rows[i])}
        >{th}</tr>);
    }
    return <table>
        <tbody>
        {tr}
        </tbody>
    </table>;
}

function roll(bonus) {
    return Roller.rollDice() + bonus;
}

export default class CharacterWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            /** @type Character */
            characterData: null,
            /** @type [Attack] */
            attacks: []
        };
    }

    componentDidMount() {
        this.loadCharacter().catch(e => console.log(e))
    }

    async loadCharacter() {
        let result = await StaticController.getCharacter();
        this.setState({characterData: result});
    }

    async rollInitiative(row) {
        const diceRoller = new DiceRoller().roll(row[1]);
        PopupManager.push(diceRoller.toString(row[0]));
        const request = new RollInitiative();
        await request.send(diceRoller.calculatedResult);
    }

    render() {
        if (!this.state.characterData) return null;
        /** @type {Character} */
        const character = this.state.characterData;
        /** @type {CharacterDataT} */
        const data = character.data;
        const statBonuses = {
            str: CharacterHelper.calculateStatBonus(data.stats.strength),
            dex: CharacterHelper.calculateStatBonus(data.stats.dexterity),
            con: CharacterHelper.calculateStatBonus(data.stats.constitution),
            int: CharacterHelper.calculateStatBonus(data.stats.intelligence),
            wis: CharacterHelper.calculateStatBonus(data.stats.wisdom),
            cha: CharacterHelper.calculateStatBonus(data.stats.charisma)
        };
        const attacks = this.state.attacks.length > 0 ? <div><h2>Attacks</h2>
            {generateTable(PathfinderCharacterCore.getWeaponCore(data, this.state.attacks))}</div> : null;
        const abilities = character.abilities.length > 0 ? <div><h2>Abilities</h2>
            {generateTable(
                character.abilities.map(item => [
                    item.name,
                    item.description,
                    item.target,
                    item.range
                ])
            )}</div> : null;
        const spells = character.spells.length > 0 ? <div><h2>Spells</h2>
            {generateTable(
                character.spells.map(item => [
                    item.name,
                    item.description,
                    item.target,
                    item.range
                ])
            )}</div> : null;
        const feats = character.feats.length > 0 ? <div><h2>Feats</h2>
            <button>+</button>
            {generateTable(
                character.feats.map(item => [
                    item.name,
                    item.description
                ])
            )}</div> : null;
        return <div className={rootScss.menu_page}>
            <div id={rootScss.character_screen}>
                <h2>{LoginController.getLogin()}</h2>
                <h3>Primary stats</h3>
                {
                    generateTable(
                        PathfinderCharacterCore.getStatsCore(data, statBonuses),
                        (row) => PopupManager.push(new DiceRoller().roll(row[2]).toString(row[0]))
                    )
                }
                <h2>Saves</h2>
                {
                    generateTable(
                        PathfinderCharacterCore.getSavesCore(data, statBonuses),
                        (row) => PopupManager.push(new DiceRoller().roll(row[1]).toString(row[0]))
                    )
                }
                {
                    generateTable(
                        [['Initiative', statBonuses.dex]],
                        this.rollInitiative.bind(this)
                    )}
                <h2>Skills</h2>
                {
                    generateTable(
                        PathfinderCharacterCore.getSkillsCore(data, statBonuses),
                        (row) => PopupManager.push(new DiceRoller().roll(row[3]).toString(row[0]))
                    )
                }
                {attacks}
                {abilities}
                {feats}
                {spells}
            </div>
        </div>
    }
}
