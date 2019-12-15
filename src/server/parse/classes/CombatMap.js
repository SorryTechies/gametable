/**
 * Created by LastBerserk on 25.01.2019.
 */

const ParseSubclass = require('../ParseSubclass');

class CombatMap extends ParseSubclass {
    constructor() {
        super(CombatMap.CLASS_NAME);
    }

    /** @return {string} */
    get img() {
        return this.get(CombatMap.IMAGE_FIELD)
    }

    /** @param {string} img */
    set img(img) {
        this.set(CombatMap.IMAGE_FIELD, img)
    }

    /** @return {string} */
    get dmImg() {
        return this.get(CombatMap.DM_IMAGE_FILED)
    }

    /** @param {string} img */
    set dmImg(img) {
        this.set(CombatMap.DM_IMAGE_FILED, img)
    }

    /** @return {int} */
    get gridX() {
        return this.get(CombatMap.X_FIELD)
    }

    /** @param {int} gridX */
    set gridX(gridX) {
        this.set(CombatMap.X_FIELD, gridX)
    }

    /** @return {int} */
    get gridY() {
        return this.get(CombatMap.Y_FIELD)
    }

    /** @param {int} gridY */
    set gridY(gridY) {
        this.set(CombatMap.Y_FIELD, gridY)
    }

    /**
     * @typedef {{}} MapObject
     *
     * @property {string} name
     * @property {int} x
     * @property {int} y
     * @property {string} img
     * @property {string} color
     */

    /** @return {Parse.Relation} */
    get objects() {
        return this.get(CombatMap.OBJECTS_FIELD)
    }

    /** @param {Parse.Relation} objects */
    set objects(objects) {
        this.set(CombatMap.OBJECTS_FIELD, objects)
    }

    /** @return {int} */
    get currentInitiative() {
        return this.get(CombatMap.CURRENT_INITIATIVE_FIELD)
    }

    /** @param {int} value */
    set currentInitiative(value) {
        this.set(CombatMap.CURRENT_INITIATIVE_FIELD, value)
    }

    /** @return {boolean} */
    get initiativeLocked() {
        return this.get(CombatMap.INITIATIVE_LOCKED_FIELD)
    }

    /** @param {boolean} value */
    set initiativeLocked(value) {
        this.set(CombatMap.INITIATIVE_LOCKED_FIELD, value)
    }
}

CombatMap.CLASS_NAME = 'CombatMap';
CombatMap.IMAGE_FIELD = 'img';
CombatMap.DM_IMAGE_FILED = 'dmImg';
CombatMap.X_FIELD = 'gridX';
CombatMap.Y_FIELD = 'gridY';
CombatMap.OBJECTS_FIELD = 'objects';
CombatMap.CURRENT_INITIATIVE_FIELD = 'currentInitiative';
CombatMap.INITIATIVE_LOCKED_FIELD = 'initiativeLocked';

module.exports = CombatMap;