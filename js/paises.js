const input = document.getElementById("paisInput");
const resultado = document.getElementById("resultadoPais");
const btnBuscar = document.getElementById("btnBuscarPais");

btnBuscar.addEventListener("click", buscarPais);
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") buscarPais();
});

async function buscarPais() {
    const texto = input.value.trim();
    if (!texto) {
        alert("Ingresá un país.");
        return;
    }

    try {
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(texto)}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (!datos || datos.status === 404) {
            alert("País no encontrado.");
            resultado.innerHTML = "";
            return;
        }

        resultado.innerHTML = "";

        datos.forEach(info => {
            const monedas = info.currencies
                ? Object.values(info.currencies).map(m => `${m.name} (${m.symbol})`).join(", ")
                : "No disponible";

            const idiomas = info.languages
                ? Object.values(info.languages).join(", ")
                : "No disponible";

            const zonas = info.timezones ? info.timezones.join(", ") : "No disponible";

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-pais", "animada");

            tarjeta.innerHTML = `
                <h2>${info.name.common}</h2>
                <p><strong>Capital:</strong> ${info.capital ? info.capital[0] : "No disponible"}</p>
                <p><strong>Población:</strong> ${info.population.toLocaleString()}</p>
                <p><strong>Monedas:</strong> ${monedas}</p>
                <p><strong>Idiomas:</strong> ${idiomas}</p>
                <p><strong>Husos horarios:</strong> ${zonas}</p>
                <img src="${info.flags.png}" alt="Bandera de ${info.name.common}" class="bandera">
            `;

            resultado.appendChild(tarjeta);
        });
    } catch (error) {
        console.error(error);
        alert("Error al conectar con la API.");
    }
}
