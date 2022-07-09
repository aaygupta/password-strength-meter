class PasswordStrengthMeter {

    constructor(options = {}) {
        this.showHelper = options.showHelper || false;
    }

    init() {
        const meter = {
            input: document.querySelector('.input-group input'),
            icon: document.querySelector('.input-group .toggle'),
            ripple: document.querySelector('.input-group .ripple'),
            percentage: document.querySelector('.strength-percent span'),
            label: document.querySelector('.strength-label'),
            instructions: document.querySelector('.strength-instructions ul'),
            options: [
                { id: 0, value: "Strength", minDiversity: 0, minLength: 0 },
                { id: 1, value: "Weak", minDiversity: 2, minLength: 4 },
                { id: 2, value: "Medium", minDiversity: 4, minLength: 6 },
                { id: 3, value: "Strong", minDiversity: 4, minLength: 8 }
            ],
            rules: [
                { id: 0, regex: '[a-z]' },
                { id: 1, regex: '[A-Z]' },
                { id: 2, regex: '[0-9]' },
                { id: 3, regex: '[`!@#$%^&*()_,.~]' }
            ],
            handleInput: e => {
                e.preventDefault();
                let score = meter.calculateScore(meter.input.value);
                if(score.length > meter.options[0].minLength && score.length < meter.options[1].minLength) {
                    meter.label.innerHTML = meter.options[1].value;
                    meter.addClass(meter.options[1].value.toLowerCase());
                } else {
                    meter.label.innerHTML = meter.options[score.id].value;
                    meter.addClass(meter.options[score.id].value.toLowerCase());
                }

                meter.toggleInstructions(score);
            },
            calculateScore: (password = '') => {
                let score = {}

                score.contains = meter.rules
                    .filter(rule => new RegExp(`${rule.regex}`).test(password))
                    .map(rule => rule.id)

                score.length = password.length;

                let fulfilledOptions = meter.options
                    .filter(option => score.contains.length >= option.minDiversity)
                    .filter(option => score.length >= option.minLength)
                    .sort((o1, o2) => o2.id - o1.id)
                    .map(option => ({id: option.id, value: option.value}))

                Object.assign(score, fulfilledOptions[0])

                return score;
            },
            toggleInput: () => {
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
            toggleInstructions: score => {
                const getScoreElement = score => meter.instructions.querySelector('li[data-score="'+score+'"]');
                Array(5).fill(0).map((_, i) => getScoreElement(i+1).classList.remove('fade'));

                if(score.length >= meter.options[3].minLength) getScoreElement(1).classList.add('fade');
                if(score.contains.includes(0)) getScoreElement(2).classList.add('fade');
                if(score.contains.includes(1)) getScoreElement(3).classList.add('fade');
                if(score.contains.includes(2)) getScoreElement(4).classList.add('fade');
                if(score.contains.includes(3)) getScoreElement(5).classList.add('fade');
            },
            addClass: className => {
                meter.percentage.classList.remove('weak');
                meter.percentage.classList.remove('medium');
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

export default PasswordStrengthMeter;