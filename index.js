import PasswordStrengthMeter from "./password-strength";

class Index {

    constructor() {
        this.passwordMeter = new PasswordStrengthMeter();
    }

    init() {
        this.passwordMeter.init();
    }
}

new Index().init();