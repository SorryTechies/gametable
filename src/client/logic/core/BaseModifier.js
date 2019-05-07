/**
 * Created by LastBerserk on 15.04.2019.
 */

export default class BaseModifier {
    /**
     * @param {BaseElement} element
     */
    constructor(element) {
        this.element = element;
        this.value = 0;
        this.calculate = () => this.element.result += this.value;
    }
}