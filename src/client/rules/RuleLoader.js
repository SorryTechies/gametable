/**
 * Created by LastBerserk on 25.02.2020.
 */

import TranslationModule from "./translation/TranslationModule";
let loader = null;
/**
 * @param {{}} l
 */
export const setLoader = l => loader = l;
/**
 * @return {{}}
 */
export const getLoader = () => loader;

export function sendDescription(message, action) {
    loader.sendActionDescription(message, action);
}