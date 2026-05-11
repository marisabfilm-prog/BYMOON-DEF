const btn = document.querySelector('.respiracion-btn');
const numero = document.querySelector('.respiracion-numero');
const instruccion = document.querySelector('.respiracion-instruccion');
const anillos = document.getElementById('respiracion');

const fases = [
    { texto: 'Inhala...', duracion: 4 },
    { texto: 'Aguanta...', duracion: 4 },
    { texto: 'Exhala...', duracion: 6 },
];

let activo = false;
let intervalo = null;

function iniciarCiclo() {
    let faseActual = 0;
    let segundos = fases[0].duracion;
    numero.textContent = segundos;
    instruccion.textContent = fases[0].texto;

    intervalo = setInterval(() => {
        segundos--;
        numero.textContent = segundos;

        if (segundos <= 0) {
            faseActual = (faseActual + 1) % fases.length;
            segundos = fases[faseActual].duracion;
            instruccion.textContent = fases[faseActual].texto;
        }
    }, 1000);
}

btn.addEventListener('click', () => {
    if (!activo) {
        activo = true;
        anillos.classList.add('activo');
        iniciarCiclo();
    } else {
        activo = false;
        clearInterval(intervalo);
        anillos.classList.remove('activo');
        instruccion.textContent = 'Pulsa para comenzar';
        numero.textContent = '3';
    }
});