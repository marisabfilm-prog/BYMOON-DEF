// ANIMACIÓN DE PARTÍCULAS 
const acompSection = document.querySelector(".acomp-section");
let animacionIniciada = false;

function crearMagia() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
`;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const colores = [
    "hsla(268, 33%, 78%,",
    "hsla(39, 100%, 86%,",
    "hsla(315, 39%, 72%,",
  ];

  // Una sola trayectoria: entra por la izquierda, hace una curva amplia y sale por abajo
  const rio = {
    p0: { x: -20, y: window.innerHeight * 0.4 },
    p1: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.1 },
    p2: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 },
    p3: { x: window.innerWidth * 0.4, y: window.innerHeight + 20 },
  };

  const particulas = [];
  const duracionRio = 5000;
  const inicio = performance.now();

  function cubicBezier(t, p0, p1, p2, p3) {
    const mt = 1 - t;
    return {
      x:
        mt ** 3 * p0.x +
        3 * mt ** 2 * t * p1.x +
        3 * mt * t ** 2 * p2.x +
        t ** 3 * p3.x,
      y:
        mt ** 3 * p0.y +
        3 * mt ** 2 * t * p1.y +
        3 * mt * t ** 2 * p2.y +
        t ** 3 * p3.y,
    };
  }

  function spawnParticula(t) {
    const pos = cubicBezier(t, rio.p0, rio.p1, rio.p2, rio.p3);
    const color = colores[Math.floor(Math.random() * colores.length)];
    particulas.push({
      x: pos.x + (Math.random() - 0.5) * 12,
      y: pos.y + (Math.random() - 0.5) * 12,
      size: 1 + Math.random() * 2,
      color,
      alpha: 0.4 + Math.random() * 0.3,
      vida: 0,
      maxVida: 80 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0.3 + Math.random() * 0.3,
    });
  }

  function animar(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = timestamp - inicio;
    const t = Math.min(elapsed / duracionRio, 1);

    if (t > 0 && t < 1 && Math.random() < 0.5) {
      spawnParticula(t);
    }

    particulas.forEach((p) => {
      p.vida++;
      p.x += p.vx;
      p.y += p.vy;
      const progVida = p.vida / p.maxVida;
      const alpha = p.alpha * (1 - progVida);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${alpha})`;
      ctx.fill();
    });

    for (let i = particulas.length - 1; i >= 0; i--) {
      if (particulas[i].vida >= particulas[i].maxVida) {
        particulas.splice(i, 1);
      }
    }

    const terminado = elapsed > duracionRio + 3000;
    if (terminado && particulas.length === 0) {
      canvas.remove();
    } else {
      requestAnimationFrame(animar);
    }
  }

  requestAnimationFrame(animar);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animacionIniciada) {
        animacionIniciada = true;
        crearMagia();
      }
    });
  },
  { threshold: 0.2 },
);

observer.observe(acompSection);
