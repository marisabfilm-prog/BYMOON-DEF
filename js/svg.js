async function inlineSvg(host) {
  const src = host.dataset.inlineSvg;
  if (!src) {
    return null;
  }

  try {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${src}`);
    }

    host.innerHTML = await response.text();
    return host.querySelector("svg");
  } catch (error) {
    console.error("Error cargando SVG inline:", error);
    return null;
  }
}

function animarViento(vientoSvg) {
  if (!vientoSvg) {
    return;
  }

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
}

async function inicializarSvgsInline() {
  const hosts = document.querySelectorAll("[data-inline-svg]");

  for (const host of hosts) {
    const svg = await inlineSvg(host);

    if (svg?.classList.contains("viento-oeste")) {
      animarViento(svg);
    }
  }
}

inicializarSvgsInline();
