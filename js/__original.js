 // PARALLAX
      window.addEventListener("scroll", function () {
        const scrolled = window.pageYOffset;
        // document.querySelector('.luna-de-luz').style.transform = `translateX(${scrolled * -0.2}px)`;
        // document.querySelector('.subtitle').style.transform = `translateX(${scrolled * -0.4}px)`;
        // document.querySelector('.p-hero').style.transform = `translateX(${scrolled * -0.3}px)`;
        // document.querySelector('.scroll').style.transform = `translateX(${scrolled * -0.5}px)`;
        // document.querySelector('.cta').style.transform = `translateX(${scrolled * -0.3}px)`;
        document.querySelector(".barco-hero").style.transform =
          `translateY(${scrolled * -0.5}px)`;
        document.querySelector(".agua-hero").style.transform =
          `translateY(${scrolled * -0.5}px)`;
        document.querySelector(".nubes-hero").style.transform =
          `translateY(${scrolled * -0.5}px)`;
        document.querySelector(".luna-hero").style.transform =
          `translateY(${scrolled * -0.9}px)`;

        // Efecto en texto del hero: subir y desvanecer
        const textElement = document.querySelector(".text");
        if (scrolled > 100) {
          const fadeStart = 100;
          const fadeEnd = 300;
          const progress = Math.min(
            (scrolled - fadeStart) / (fadeEnd - fadeStart),
            1,
          );
          textElement.style.opacity = 1 - progress;
          textElement.style.transform = `translateY(${-progress * 50}px)`;
        } else {
          textElement.style.opacity = 1;
          textElement.style.transform = "translateY(0px)";
        }

        // Desvanecer SVGs después de cierto scroll
        const svgs = document.querySelectorAll(
          ".barco-hero, .agua-hero, .nubes-hero, .luna-hero",
        );
        if (scrolled > 300) {
          const fadeStart = 300;
          const fadeEnd = 550;
          const progress = Math.min(
            (scrolled - fadeStart) / (fadeEnd - fadeStart),
            1,
          );
          svgs.forEach((svg) => {
            svg.style.opacity = 1 - progress;
          });
        } else {
          svgs.forEach((svg) => {
            svg.style.opacity = 1;
          });
        }

        const acomp = document.querySelector(".acomp-section");
        if (scrolled > 250) {
          acomp.classList.add("visible");
        } else {
          acomp.classList.remove("visible");
        }
      });
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

      // ANIMACIÓN PINTADO SVG VIENTO-OESTE
      const vientoSvg = document.querySelector(".viento-oeste");
      const shapes = vientoSvg.querySelectorAll("path, line, polyline");

      shapes.forEach((shape) => {
        if (shape.getTotalLength) {
          const len = shape.getTotalLength();
          shape.style.strokeDasharray = len;
          shape.style.strokeDashoffset = len;
          shape.style.transition = "none";
        }

        const computedFill = getComputedStyle(shape).fill;
        if (
          computedFill &&
          computedFill !== "none" &&
          !shape.getAttribute("stroke")
        ) {
          shape.dataset.originalFill = computedFill;
          shape.style.fill = "transparent";
          shape.style.stroke = computedFill;
          shape.style.strokeWidth = "0.2px";
        }
      });

      let vientoPintado = false;
      const vientoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !vientoPintado) {
              vientoPintado = true;
              shapes.forEach((shape, i) => {
                if (shape.getTotalLength) {
                  shape.style.transition = `stroke-dashoffset 0.6s ease ${i * 0.04}s`;
                  shape.style.strokeDashoffset = "0";
                }
                if (shape.dataset.originalFill) {
                  const delay = 600 + i * 40;
                  setTimeout(() => {
                    shape.style.transition = "fill 0.3s ease";
                    shape.style.fill = shape.dataset.originalFill;
                  }, delay);
                }
              });
            }
          });
        },
        { threshold: 0.1 },
      );

      vientoObserver.observe(vientoSvg);