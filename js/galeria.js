// Hover para cambiar imágenes
const cuadros = document.querySelectorAll(".galeria .cuadro img");

cuadros.forEach(img => {
    const original = img.src;
    const alterna = img.getAttribute("data-alt");

    img.addEventListener("mouseenter", () => img.src = alterna);
    img.addEventListener("mouseleave", () => img.src = original);
});
