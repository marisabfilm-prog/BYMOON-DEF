// PARALLAX - scroll
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
