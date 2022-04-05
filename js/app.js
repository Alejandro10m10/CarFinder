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
   mostrarAutos(autos); // Muestra los autos al cargar

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
function mostrarAutos(autos){
    limpiarHTML(); // Elimina el HTML previo
    autos.forEach( auto => {
        const autoHTML = document.createElement('p');
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        autoHTML.textContent = `
            ${marca} ${modelo} - Año: ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
        `;
        resultado.style.overflowY = 'scroll';
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

// Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// Función que filtra en base a la búsqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarPrecioMinimo ).filter( filtrarPrecioMaximo ).filter( 
                            filtrarPuertas ).filter( filtrarTransmision).filter( filtrarColor );

    if(resultado.length){
        mostrarAutos(resultado);
    } else{
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('p');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = "No hay Resultados, Intenta con otros parámetros de búsqueda"
    noResultado.style.margin = '0 20px';
    resultado.style.overflowY = 'hidden';
    resultado.appendChild(noResultado);
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

function filtrarPrecioMinimo(auto){
    const { precioMinimo } = datosBusqueda;
    if( precioMinimo ){ 
        return auto.precio >= precioMinimo;
    }
    return auto;
}

function filtrarPrecioMaximo(auto){
    const { precioMaximo } = datosBusqueda;
    if( precioMaximo ){ 
        return auto.precio <= precioMaximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if( puertas ){ 
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if( transmision ){ 
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if( color ){ 
        return auto.color === color;
    }
    return auto;
}