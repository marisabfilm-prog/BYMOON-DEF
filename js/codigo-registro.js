const inputs = document.querySelectorAll('.otp-input');

inputs.forEach((input, i) => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
        if (input.value) {
            input.classList.add('relleno');
            if (i < inputs.length - 1) inputs[i + 1].focus();
        } else {
            input.classList.remove('relleno');
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && i > 0) {
            inputs[i - 1].focus();
        }
    });

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const texto = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
        texto.split('').forEach((char, j) => {
            if (inputs[j]) {
                inputs[j].value = char;
                inputs[j].classList.add('relleno');
            }
        });
        if (inputs[texto.length - 1]) inputs[texto.length - 1].focus();
    });
});