// -----------------------------
// Bienvenida y formulario con color según edad
// -----------------------------
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const edadInput = document.getElementById('edad');
const guardarBtn = document.getElementById('guardar-datos');
const mensaje = document.getElementById('mensaje-bienvenida');
const tarjetaBienvenida = document.querySelector('.bienvenida');
const formulario = document.querySelector('.formulario'); // selecciona el formulario correctamente

function mostrarDatos() {
    const nombre = sessionStorage.getItem('nombre');
    const apellido = sessionStorage.getItem('apellido');
    const edad = sessionStorage.getItem('edad');

    if (nombre && apellido && edad) {
        mensaje.textContent = `¡Bienvenido ${nombre} ${apellido}, ya tienes ${edad} y eres ${edad >= 20 ? 'mayor' : 'menor'}!`;

        // Cambiar color de fondo según edad
        tarjetaBienvenida.style.backgroundColor = edad >= 20 ? '#8c7ae6' : '#d8c1ff';
        tarjetaBienvenida.style.color = '#fff';

        // Ocultar formulario
        formulario.style.display = 'none';

        // Animación fade-in
        mensaje.style.opacity = 0;
        setTimeout(() => {
            mensaje.style.transition = 'opacity 0.8s';
            mensaje.style.opacity = 1;
        }, 100);
    }
}

guardarBtn.addEventListener('click', () => {
    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const edad = parseInt(edadInput.value);

    if (nombre && apellido && !isNaN(edad)) {
        sessionStorage.setItem('nombre', nombre);
        sessionStorage.setItem('apellido', apellido);
        sessionStorage.setItem('edad', edad);
        mostrarDatos();
    } else {
        alert("Por favor completa todos los campos correctamente.");
    }
});

// Al cargar la página, verificar si ya hay datos
mostrarDatos();
