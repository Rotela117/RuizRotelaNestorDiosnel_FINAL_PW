document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formInscripcion");

    // Inicializar EmailJS
    emailjs.init("AElZjJ9bxHXGrEZ74");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recarga de página

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const curso = document.querySelector("input[name='curso']:checked")?.value || "";

        if (!firstName || !lastName || !correo || !curso) {
            alert("Complete todos los campos antes de enviar.");
            return;
        }

        const templateParams = { firstName, lastName, correo, curso };

        // Enviar directamente con EmailJS
        emailjs.send("service_3pd5l1t", "template_d0uo8hj", templateParams)
            .then(() => {
                alert("Formulario enviado correctamente.");
                form.reset();
            })
            .catch((error) => {
                console.error("Error al enviar el formulario:", error);
                alert("Hubo un error al enviar el formulario. Intenta de nuevo.");
            });
    });
});
