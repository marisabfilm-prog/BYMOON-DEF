
const tabs = document.querySelectorAll('.privacidad-tab');
const secciones = document.querySelectorAll('.privacidad-seccion');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('privacidad-tab-activo'));
        tab.classList.add('privacidad-tab-activo');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            tabs.forEach(tab => {
                tab.classList.remove('privacidad-tab-activo');
                if (tab.getAttribute('href') === `#${id}`) {
                    tab.classList.add('privacidad-tab-activo');
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

secciones.forEach(sec => observer.observe(sec));