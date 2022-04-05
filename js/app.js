// Variables
const marca = document.querySelector('#marca'),
      year = document.querySelector('#year'),
      maxYear = new Date().getFullYear(),
      minYear = maxYear - 12, 
      precioMinimo = document.querySelector('#minimo'),
      precioMaximo = document.querySelector('#maximo'),
      puertas = document.querySelector('#puertas'),
      transmision = document.querySelector('#transmision'),
      color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    precioMinimo: '',
    precioMaximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Eventos
document.addEventListener('DOMContentLoaded', ()=> {
   mostrarAutos(); // Muestra los autos al cargar

   // Llena las opciones de años
   llenarSelect();
});

// Event Listener para los select de búsqueda
marca.addEventListener('change', (e) => getSelectValue(e, 'marca') );
year.addEventListener('change', (e) => getSelectValue(e, 'year') );
precioMinimo.addEventListener('change', (e) => getSelectValue(e, 'precioMinimo') );
precioMaximo.addEventListener('change', (e) => getSelectValue(e, 'precioMaximo') );
puertas.addEventListener('change', (e) => getSelectValue(e, 'puertas') );
transmision.addEventListener('change', (e) => getSelectValue(e, 'transmision') );
color.addEventListener('change', (e) => getSelectValue(e, 'color') );


// Funciones
function mostrarAutos(){
    autos.forEach( auto => {
        const autoHTML = document.createElement('p');
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        autoHTML.textContent = `
            ${marca} ${modelo} - Año: ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
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

function getSelectValue(e, objectProperty){ datosBusqueda[`${objectProperty}`] = e.target.value; filtrarAuto();}

// Función que filtra en base a la búsqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear )

    console.log(resultado);
}

function filtrarMarca(auto){
    const { marca } = datosBusqueda;
    if( marca ){ 
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if( year ){ 
        return auto.year === parseInt(year);
    }
    return auto;
}