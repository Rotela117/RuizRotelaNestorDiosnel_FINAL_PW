document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formExamen");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Recoger respuestas
        const respuestas = {
            P1lenguaje: document.querySelector('input[name="p1"]:checked')?.value || "",
            P2hardware: document.querySelector('input[name="p2"]:checked')?.value || "",
            P3Respuesta: document.getElementById("p3").value.trim(),
            P4CPU: document.querySelector('input[name="p4"]:checked')?.value || "",
            P5Software: document.querySelector('input[name="p5"]:checked')?.value || ""
        };

        // Validar que todas las preguntas estén respondidas
        for (let key in respuestas) {
            if (!respuestas[key]) {
                alert("Responda todas las preguntas antes de enviar.");
                return;
            }
        }

        // Enviar directamente a EmailJS
        emailjs.send("service_3pd5l1t", "template_z2lsxls", respuestas)
            .then(() => {
                alert("Examen enviado correctamente.");
                form.reset();
                window.location.href = "../index.html"; // Redirige al inicio
            })
            .catch((error) => {
                console.error("Error al enviar el examen:", error);
                alert("Hubo un error al enviar el examen. Intenta de nuevo.");
            });
    });
});
