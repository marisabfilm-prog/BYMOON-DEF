
// Definimos los contenidos en variables para que el código sea limpio
    const contenidoHilos = `
    <div class="hilo-card hilo-propio" style="background-image: url('jpg/hilo1.jpg');">
        <div class="hilo-overlay"><p>HILO 1</p><span>🌕</span></div>
    </div>
    <div class="hilo-card hilo-ajeno">
        <p class="hilo-autor">HILO de @fulanito</p>
        <p class="hilo-cita">Dormir es el arte de soltar todo lo que no puedes controlar hasta mañana.</p>
    </div>
    `;

    const contenidoGuardados = `
    <div class="hilo-card hilo-propio" style="background-image: url('jpg/hilo1.jpg');">
        <span class="icon-corazon">❤️</span>
        <div class="hilo-overlay"><p>HILO 1</p><span>🌕</span></div>
    </div>
    <div class="hilo-card hilo-ajeno">
        <span class="icon-corazon">❤️</span>
        <p class="hilo-autor">HILO de @fulanito</p>
        <p class="hilo-cita">Dormir es el arte de soltar todo lo que no puedes controlar hasta mañana.</p>
    </div>
    <div class="hilo-card hilo-propio" style="background-image: url('jpg/hilo2.jpg');">
        <span class="icon-corazon">❤️</span>
        <div class="hilo-overlay"><p>HILO 2</p></div>
    </div>
    `;

    function cambiarTab(tipo) {
    const btnHilos = document.getElementById('btn-hilos');
    const btnGuardados = document.getElementById('btn-guardados');
    const infoTab = document.getElementById('info-tab');
    const grid = document.getElementById('grid-contenido');

    // Resetear estados de botones
    btnHilos.classList.remove('active');
    btnGuardados.classList.remove('active');

    if (tipo === 'guardados') {
        btnGuardados.classList.add('active');
    infoTab.innerText = "Aquí encontrarás los hilos que has guardado";
    grid.innerHTML = contenidoGuardados;
    } else {
        // Volver a Hilos
        btnHilos.classList.add('active');
    infoTab.innerText = "Aquí encontrarás los hilos y comentarios creados por ti";
    grid.innerHTML = contenidoHilos;
    }
}

// Ejecutar una vez al cargar para que aparezcan los hilos al principio
window.onload = () => cambiarTab('hilos');
