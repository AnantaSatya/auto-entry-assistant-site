(() => {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const counter = carousel.querySelector("[data-carousel-counter]");
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dialog = document.querySelector("#preview-dialog");
  let currentIndex = 0;

  const showSlide = (newIndex) => {
    currentIndex = (newIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });

    counter.textContent = `${currentIndex + 1} / ${slides.length}`;
  };

  previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (event.key === "ArrowRight") showSlide(currentIndex + 1);
  });

  if (dialog && typeof dialog.showModal === "function") {
    const dialogImage = dialog.querySelector("[data-preview-image]");
    const dialogTitle = dialog.querySelector("[data-preview-title]");
    const dialogDescription = dialog.querySelector("[data-preview-description]");
    const closeButton = dialog.querySelector("[data-preview-close]");

    slides.forEach((slide) => {
      const previewButton = slide.querySelector("[data-preview-open]");
      const image = slide.querySelector("img");

      previewButton.addEventListener("click", () => {
        dialogImage.src = image.currentSrc || image.src;
        dialogImage.alt = image.alt;
        dialogTitle.textContent = slide.dataset.title;
        dialogDescription.textContent = slide.dataset.description;
        dialog.showModal();
      });
    });

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  showSlide(0);
})();
