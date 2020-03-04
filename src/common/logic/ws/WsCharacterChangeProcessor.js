/**
 * Created by LastBerserk on 05.03.2020.
 */

export function handleCharacterChange(char, message) {
    if (message.data) {
        Object.keys(message.data).forEach(key => {
            if (key !== "_id") {
                char.data[key] = message.data[key]
            }
        });
    }
    if (Array.isArray(message.feats)) char.feats = message.feats;
}