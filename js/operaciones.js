function mostrarResultado(texto) {
    document.getElementById("resultado").textContent = texto;
}

function calcularSuma() {
    let a = parseFloat(prompt("Ingrese el primer número:"));
    let b = parseFloat(prompt("Ingrese el segundo número:"));
    if(isNaN(a) || isNaN(b)) return mostrarResultado("Valores inválidos.");
    mostrarResultado("La suma es: " + (a + b));
}

function calcularDivision() {
    let a = parseFloat(prompt("Ingrese el primer número:"));
    let b = parseFloat(prompt("Ingrese el segundo número:"));
    if(isNaN(a) || isNaN(b)) return mostrarResultado("Valores inválidos.");
    if (b === 0) return mostrarResultado("No se puede dividir entre cero.");
    mostrarResultado("La división es: " + (a / b));
}

function calcularPromedio() {
    let a = parseFloat(prompt("Ingrese el primer número:"));
    let b = parseFloat(prompt("Ingrese el segundo número:"));
    if(isNaN(a) || isNaN(b)) return mostrarResultado("Valores inválidos.");
    mostrarResultado("El promedio es: " + ((a + b) / 2));
}
