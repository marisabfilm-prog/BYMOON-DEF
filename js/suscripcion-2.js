const wraps = document.querySelectorAll('.pago-metodo-wrap');
const camposTarjeta = document.getElementById('campos-tarjeta');

wraps.forEach(wrap => {
    const radio = wrap.querySelector('input[type="radio"]');
    radio.addEventListener('change', () => {
        wraps.forEach(w => w.classList.remove('activo'));
        wrap.classList.add('activo');
        camposTarjeta.style.display = radio.value === 'tarjeta' ? 'flex' : 'none';
    });
});

document.getElementById('num-tarjeta').addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 16);
    e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
});

document.getElementById('caducidad').addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) v = v.substring(0, 2) + ' / ' + v.substring(2);
    e.target.value = v;
});