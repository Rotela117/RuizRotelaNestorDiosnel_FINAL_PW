const selectCripto = document.getElementById("criptoSelect");
const btnBuscarCripto = document.getElementById("btnBuscarCripto");
const resultadoCripto = document.getElementById("resultadoCripto");

async function cargarCriptos() {
    try {
        const resp = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const data = await resp.json();

        const top50 = ["bitcoin","ethereum","tether","bnb","usd-coin","ripple","cardano","dogecoin","polygon","litecoin"];
        top50.forEach(id => {
            const cripto = data.find(c => c.id === id);
            if(cripto){
                const option = document.createElement("option");
                option.value = cripto.id;
                option.textContent = cripto.name;
                selectCripto.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error al cargar criptomonedas:", error);
    }
}

btnBuscarCripto.addEventListener("click", buscarCripto);

async function buscarCripto() {
    const id = selectCripto.value;
    if(!id) {
        alert("Seleccioná una criptomoneda.");
        return;
    }

    try {
        const resp = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`);
        const data = await resp.json();

        if(!data.length) {
            alert("Criptomoneda no encontrada.");
            resultadoCripto.innerHTML = "";
            return;
        }

        const cripto = data[0];
        resultadoCripto.innerHTML = "";

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-cripto","animada");
        tarjeta.innerHTML = `
            <h2>${cripto.name}</h2>
            <img src="${cripto.image}" alt="${cripto.name}" style="width:100px; border-radius:10px; margin:10px 0;">
            <p><strong>Precio USD:</strong> $${cripto.current_price.toLocaleString()}</p>
            <p><strong>Cambio 24h:</strong> ${cripto.price_change_percentage_24h.toFixed(2)}%</p>
            <p><strong>Market Cap:</strong> $${cripto.market_cap.toLocaleString()}</p>
        `;

        resultadoCripto.appendChild(tarjeta);
    } catch (error) {
        console.error(error);
        alert("Error al conectar con CoinGecko API.");
    }
}

cargarCriptos();
