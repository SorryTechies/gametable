/**
 * Created by LastBerserk on 03.02.2019.
 */

class ErrorClass {
    constructor(res) {
        const answer = res;
        this.send = (obj) => {
            console.log(obj);
            answer.status(500).json(obj);
        }
    }
}

module.exports = ErrorClass;