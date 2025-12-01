const inputRick = document.getElementById("rickInput");
const btnBuscarRick = document.getElementById("btnBuscarRick");
const resultadoRick = document.getElementById("resultadoRick");

btnBuscarRick.addEventListener("click", buscarRick);
inputRick.addEventListener("keyup", (e) => {
    if(e.key === "Enter") buscarRick();
});

async function buscarRick() {
    const id = inputRick.value.trim();
    if(!id) {
        alert("Ingresá un ID válido.");
        return;
    }

    try {
        const url = `https://rickandmortyapi.com/api/character/${id}`;
        const resp = await fetch(url);

        if(!resp.ok) {
            alert("Personaje no encontrado.");
            resultadoRick.innerHTML = "";
            resultadoRick.classList.add("oculto");
            return;
        }

        const data = await resp.json();
        resultadoRick.innerHTML = "";

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-rick","animada");
        tarjeta.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.image}" alt="${data.name}" class="bandera">
            <p><strong>Estado:</strong> ${data.status}</p>
            <p><strong>Especie:</strong> ${data.species}</p>
        `;

        resultadoRick.appendChild(tarjeta);
        resultadoRick.classList.remove("oculto");

    } catch (error) {
        console.error(error);
        alert("Error al conectar con la API de Rick & Morty.");
    }
}
