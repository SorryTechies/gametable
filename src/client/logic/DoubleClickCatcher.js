/**
 * Created by LastBerserk on 16.04.2020.
 */

export default class DoubleClickCatcher {
    constructor() {
        this.doubleClick = () => {};
        this.delay = DoubleClickCatcher.DEFAULT_CATCH_DELAY;
        this.fireDelay = DoubleClickCatcher.DEFAULT_FIRE_DELAY;
        this.locked = false;
        this.fireOnce = false;
        this.clicked = false;
        this.fired = false;
        this.timeout = null;
        this.fireTimeout = null;
    }

    fire() {
        this.clicked = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.clicked = false, this.delay);
    }

    onClick() {
        if (this.locked || (this.fireOnce && this.fired)) return;
        if (!this.clicked) return this.fire();
        this.doubleClick();
        clearTimeout(this.timeout);
        clearTimeout(this.fireTimeout);
        this.locked = true;
        this.fireTimeout = setTimeout(() => this.locked = false,this.fireDelay);
        this.clicked = false;
        this.fired = true;
    }
}

DoubleClickCatcher.DEFAULT_CATCH_DELAY = 1;
DoubleClickCatcher.DEFAULT_FIRE_DELAY = 1;