class PasswordStrengthMeter {

    init() {
        const meter = {
            input: document.querySelector('.input-group input'),
            icon: document.querySelector('.input-group .toggle'),
            ripple: document.querySelector('.input-group .ripple'),
            percentage: document.querySelector('.strength-percent span'),
            label: document.querySelector('.strength-label'),
            handleInput: e => {
                if(meter.input.value.length === 0) {
                    meter.label.innerHTML = "Strength";
                    meter.addClass();
                } else if(meter.input.value.length <= 4) {
                    meter.label.innerHTML = "Weak";
                    meter.addClass('weak');
                } else if(meter.input.value.length <= 7) {
                    meter.label.innerHTML = "Average";
                    meter.addClass('average');
                } else {
                    meter.label.innerHTML = "Strong";
                    meter.addClass('strong');
                }
            },
            toggleInput: e => {
                const type = meter.input.getAttribute('type');
                if(type === 'password') {
                    meter.input.setAttribute('type', 'text');
                    meter.icon.innerHTML = '🫣';
                    meter.ripple.style.cssText = 'border-radius:4px; width:100%; height:100%; right:0; z-index:-1;';
                    meter.input.style.color = '#000';
                    meter.input.style.background = 'transparent';
                    meter.icon.style.fontSize = '27px';
                } else {
                    meter.input.setAttribute('type', 'password');
                    meter.icon.innerHTML = '👀';
                    meter.ripple.style.cssText = 'border-radius:50%; width:35px; height:35px; right:10px; z-index:1;';
                    meter.input.style.color = '#fff';
                    meter.input.style.background = '#112d37';
                    meter.icon.style.fontSize = '25px';
                }
            },
            addClass: className => {
                meter.percentage.classList.remove('weak');
                meter.percentage.classList.remove('average');
                meter.percentage.classList.remove('strong');
                if(className) meter.percentage.classList.add(className);
            },
            init: () => {
                meter.input.addEventListener('input', meter.handleInput);
                meter.icon.addEventListener('click', meter.toggleInput);
            }
        };

        meter.init();
    }

}

new PasswordStrengthMeter().init();