class PasswordStrengthMeter {

    init() {
        const meter = {
            input: document.querySelector('.input-group input'),
            icon: document.querySelector('.input-group .toggle'),
            ripple: document.querySelector('.input-group .ripple'),
            percentage: document.querySelector('.strength-percent span'),
            label: document.querySelector('.strength-label'),
            instructions: document.querySelector('.strength-instructions ul'),
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

                meter.toggleInstructions();
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
                    meter.input.style.background = 'rgba(255,255,255,.2)';
                    meter.icon.style.fontSize = '25px';
                }
            },
            toggleInstructions: () => {
                const getScoreElement = score => meter.instructions.querySelector('li[data-score="'+score+'"]');
                Array(5).fill(0).map((_, i) => getScoreElement(i+1).classList.remove('fade'));

                if(meter.input.value.length >= 8) 
                    getScoreElement(1).classList.add('fade');
                if((/[a-z]/.test(meter.input.value))) 
                    getScoreElement(2).classList.add('fade');
                if((/[A-Z]/.test(meter.input.value))) 
                    getScoreElement(3).classList.add('fade');
                if((/\d+/.test(meter.input.value))) 
                    getScoreElement(4).classList.add('fade');
                if((/[`!@#$%^&*()_,.~]/.test(meter.input.value))) 
                    getScoreElement(5).classList.add('fade');
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