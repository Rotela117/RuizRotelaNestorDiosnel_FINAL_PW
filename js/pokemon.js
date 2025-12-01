const inputPokemon = document.getElementById("pokemonInput");
const btnBuscarPokemon = document.getElementById("btnBuscarPokemon");
const resultadoPokemon = document.getElementById("resultadoPokemon");

btnBuscarPokemon.addEventListener("click", buscarPokemon);
inputPokemon.addEventListener("keyup", e => {
    if (e.key === "Enter") buscarPokemon();
});

async function buscarPokemon() {
    const texto = inputPokemon.value.trim().toLowerCase();
    if(!texto) {
        alert("Ingresá un nombre o ID del Pokémon.");
        return;
    }

    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${texto}`;
        const resp = await fetch(url);

        if(!resp.ok) {
            alert("Pokémon no encontrado.");
            resultadoPokemon.innerHTML = "";
            resultadoPokemon.classList.add("oculto");
            return;
        }

        const data = await resp.json();
        resultadoPokemon.innerHTML = "";

        const tipos = data.types.map(t => t.type.name).join(", ");

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-pokemon","animada");
        tarjeta.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}" class="bandera">
            <p><strong>Tipo:</strong> ${tipos}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
        `;

        resultadoPokemon.appendChild(tarjeta);
        resultadoPokemon.classList.remove("oculto");

    } catch (error) {
        console.error(error);
        alert("Error al conectar con la API de Pokémon.");
    }
}
