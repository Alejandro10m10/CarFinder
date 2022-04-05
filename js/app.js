// Variables
const resultado = document.querySelector('#resultado'),
      yearSelected = document.querySelector('#year'),
      maxYear = new Date().getFullYear(),
      minYear = maxYear - 12;

// Eventos
document.addEventListener('DOMContentLoaded', ()=> {
   mostrarAutos(); // Muestra los autos al cargar

   // Llena las opciones de años
   llenarSelect();
});


// Funciones
function mostrarAutos(){
    autos.forEach( auto => {
        const autoHTML = document.createElement('p');
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    });
}

function llenarSelect(){
    for(let i = maxYear ; i >= minYear ; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones del año al select
    }
}