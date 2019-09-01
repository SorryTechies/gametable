/**
 * Created by LastBerserk on 01.09.2019.
 */

export default class ClientUtilities {
    static getScreenWidth() {
        return screen.width;
    }

    static getScreenHeight() {
        return screen.height;
    }

    static isPhoneScreen() {
        return ClientUtilities.getScreenWidth() <= 480;
    }
}