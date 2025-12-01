const API_KEY = "332918a9350ed4ab4713752edfea9a8e";

const botonBuscar = document.getElementById("buscar");
const resultado = document.getElementById('resultado');

function mostrarClima(data) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('resultado-clima');

    tarjeta.innerHTML = `
        <img class="icono-clima" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <div class="descripcion">${data.weather[0].description}</div>
        <div class="detalles">Humedad: ${data.main.humidity}% | Viento: ${data.wind.speed} m/s</div>
    `;

    resultado.appendChild(tarjeta);
}

botonBuscar.addEventListener("click", () => {
    const ciudad = document.getElementById("ciudad").value.trim();

    if (!ciudad) {
        alert("Por favor ingresa una ciudad.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ciudad no encontrada");
            }
            return response.json();
        })
        .then(data => {
            const icono = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icono}@4x.png`;

            resultado.innerHTML = `
                <div class="weather-card">
                    <h3>${data.name}</h3>
                    <img class="weather-icon" src="${iconUrl}" alt="icono del clima">
                    <p><strong>Condición:</strong> ${data.weather[0].description}</p>
                    <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
                    <p><strong>Sensación térmica:</strong> ${data.main.feels_like} °C</p>
                    <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
                    <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
                </div>
            `;
        })
        .catch(error => {
            resultado.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
        });
});
