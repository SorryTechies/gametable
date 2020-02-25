/**
 * Created by LastBerserk on 25.02.2020.
 */

export default class TestWrapper {
    static wrap(filename, func) {
        return func.then(() => {
            console.log("Test " + filename + " passed.");
            return "ok";
        })
            .catch(e => {
                console.error(e);
                return e;
            });
    }
}