const galeria = document.getElementById("galeria");
const btnCargar = document.getElementById("cargar");
const inputBuscar = document.getElementById("buscar");
const btnTema = document.getElementById("toggle-tema");
const btnVerFavoritos = document.getElementById("btn-ver-favoritos");

// Elementos Vinculados al Modal
const modal = document.getElementById("modal-equipo");
const btnCerrarModal = document.querySelector(".cerrar-modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalBandera = document.getElementById("modal-bandera");
const modalDt = document.getElementById("modal-dt");
const modalJugadores = document.getElementById("modal-jugadores");

// Sistema Experto de Memoria de Sesión para Favoritos
let listaFavoritos = JSON.parse(sessionStorage.getItem("mis_favoritos")) || [];
let mostrandoSoloFavoritos = false;
let datosAgrupadosGlobal = {}; 

// Base de Datos Deportiva Ficticia para las Plantillas
const datosDeportivos = {
    "Argentina": { dt: "Lionel Scaloni", jugadores: ["Lionel Messi", "Emiliano Martínez", "Julián Álvarez", "Alexis Mac Allister"] },
    "Brasil": { dt: "Dorival Júnior", jugadores: ["Vinícius Júnior", "Rodrygo", "Alisson Becker", "Endrick"] },
    "Francia": { dt: "Didier Deschamps", jugadores: ["Kylian Mbappé", "Antoine Griezmann", "William Saliba", "Eduardo Camavinga"] },
    "España": { dt: "Luis de la Fuente", jugadores: ["Lamine Yamal", "Rodri", "Pedri", "Nico Williams"] },
    "Estados Unidos": { dt: "Gregg Berhalter", jugadores: ["Christian Pulisic", "Weston McKennie", "Gio Reyna", "Timothy Weah"] },
    "México": { dt: "Jaime Lozano", jugadores: ["Santiago Giménez", "Edson Álvarez", "Guillermo Ochoa", "Hirving Lozano"] }
};

// Diccionario de los 48 clasificados oficiales reales traducidos con su descripción
const clasificadosMundial = {
    "CONMEBOL (Sudamérica)": {
        "Argentina": { es: "Argentina", info: "Actual campeón del mundo y cabeza de serie." },
        "Brazil": { es: "Brasil", info: "La histórica pentacampeona buscará su sexta estrella." },
        "Colombia": { es: "Colombia", info: "Regresa con fuerza tras perderse el último Mundial." },
        "Ecuador": { es: "Ecuador", info: "Generación joven y muy física, siempre peligrosa." },
        "Uruguay": { es: "Uruguay", info: "La Celeste de Marcelo Bielsa, bicampeona mundial." },
        "Paraguay": { es: "Paraguay", info: "Vuelven a la cita mundialista por primera vez desde 2010." }
    },
    "CONCACAF (Norte/Centroamérica)": {
        "United States": { es: "Estados Unidos", info: "País anfitrión, con una plantilla llena de figuras en Europa." },
        "Mexico": { es: "México", info: "Anfitrión histórico; jugará el partido inaugural del torneo." },
        "Canada": { es: "Canadá", info: "Anfitrión que consolida su crecimiento en la región." },
        "Panama": { es: "Panamá", info: "Los Canaleros afianzan su presencia internacional." },
        "Haiti": { es: "Haití", info: "¡Hacen historia! Clasifican a un Mundial por primera vez." },
        "Curaçao": { es: "Curazao", info: "Debut absoluto en un Mundial para esta isla caribeña." }
    },
    "UEFA (Europa)": {
        "France": { es: "Francia", info: "Poderío absoluto y actual subcampeón del mundo." },
        "Spain": { es: "España", info: "Juventud y talento para recuperar el trono mundial." },
        "England": { es: "Inglaterra", info: "Los Tres Leones tienen plantilla para soñar con el título." },
        "Portugal": { es: "Portugal", info: "Equipo letal en ataque, lideran el Grupo K." },
        "Germany": { es: "Alemania", info: "El gigante europeo busca redención tras malos torneos." },
        "Netherlands": { es: "Países Bajos", info: "La Naranja Mecánica busca su ansiada primera copa." },
        "Belgium": { es: "Bélgica", info: "Inician una nueva etapa post-generación dorada." },
        "Croatia": { es: "Croacia", info: "Un equipo experto en llegar a las fases finales." },
        "Switzerland": { es: "Suiza", info: "Rival durísimo y constante en octavos de final." },
        "Austria": { es: "Austria", info: "Regresan al Mundial por primera vez desde 1998." },
        "Scotland": { es: "Escocia", info: "Clasificaron en el último minuto de forma agónica." },
        "Norway": { es: "Noruega", info: "Vuelven al escenario mundial tras más de dos décadas." },
        "Sweden": { es: "Suecia", info: "Fuerza física y orden táctico desde Escandinavia." },
        "Turkey": { es: "Turquía", info: "Siempre apasionados y peligrosos en torneos cortos." },
        "Czech Republic": { es: "República Checa", info: "Sólido equipo de Europa del Este en pleno recambio." },
        "Bosnia and Herzegovina": { es: "Bosnia y Herzegovina", info: "Segunda participación en su historia (debut en 2014)." }
    },
    "AFC (Asia)": {
        "Japan": { es: "Japón", info: "Los Samuráis Azules son el gigante indiscutido de Asia." },
        "South Korea": { es: "Corea del Sur", info: "Presencia ininterrumpida en Mundiales desde 1986." },
        "Iran": { es: "Irán", info: "Defensa férrea, listos para complicar a cualquiera." },
        "Australia": { es: "Australia", info: "Los Socceroos son habituales animadores del torneo." },
        "Uzbekistan": { es: "Uzbekistán", info: "¡Debutantes absolutos! Primera vez en una Copa del Mundo." },
        "Jordan": { es: "Jordania", info: "¡Hacen historia! Jugarán su primer Mundial en 2026." },
        "Qatar": { es: "Catar", info: "Superan la eliminatoria tras debutar como anfitriones en 2022." },
        "Saudi Arabia": { es: "Arabia Saudita", info: "Famosos por dar la sorpresa ante Argentina en 2022." },
        "Iraq": { es: "Irak", info: "Vuelven al escenario mundial por primera vez desde 1986." }
    },
    "CAF (África)": {
        "Morocco": { es: "Marruecos", info: "Hicieron historia llegando a semifinales en 2022." },
        "Senegal": { es: "Senegal", info: "Actuales potencias de África con un gran plantel." },
        "Egypt": { es: "Egipto", info: "Los Faraones vuelven a la carga con talento ofensivo." },
        "Tunisia": { es: "Túnez", info: "Las Águilas de Cartago, presentes una vez más." },
        "Algeria": { es: "Argelia", info: "Regresan al Mundial liderando la región norte de África." },
        "South Africa": { es: "Sudáfrica", info: "Los Bafana Bafana regresan a la máxima competición." },
        "Ivory Coast": { es: "Costa de Marfil", info: "Los Elefantes vuelven a pisar fuerte en el continente." },
        "Ghana": { es: "Ghana", info: "Las Estrellas Negras, un clásico africano en los Mundiales." },
        "Cape Verde": { es: "Cabo Verde", info: "¡Debut histórico! La pequeña nación insular sorprende al mundo." },
        "DR Congo": { es: "R.D. del Congo", info: "Regresan al Mundial tras su única aparición en 1974." }
    },
    "OFC (Oceanía)": {
        "New Zealand": { es: "Nueva Zelanda", info: "Aprovechan el cupo directo de Oceanía en el nuevo formato." }
    }
};

async function cargarDatos() {
    galeria.innerHTML = "<p style='text-align:center; color:#fff;'>Descargando base de datos FIFA...</p>";
    
    try {
        const res = await fetch("https://api.sampleapis.com/countries/countries");
        if (!res.ok) throw new Error("Error HTTP: " + res.status);
        
        const data = await res.json();
        datosAgrupadosGlobal = {}; 
        
        for (const [region, infoPaises] of Object.entries(clasificadosMundial)) {
            const nombresClasificados = Object.keys(infoPaises);
            const equiposRegion = data.filter(pais => nombresClasificados.includes(pais.name));
            
            // Ordenar alfabéticamente por su traducción al español
            equiposRegion.sort((a, b) => {
                const nombreA = clasificadosMundial[region][a.name].es;
                const nombreB = clasificadosMundial[region][b.name].es;
                return nombreA.localeCompare(nombreB);
            });
            
            if (equiposRegion.length > 0) {
                datosAgrupadosGlobal[region] = equiposRegion;
            }
        }
        
        renderizarGaleria(datosAgrupadosGlobal);
    } catch (error) {
        galeria.innerHTML = `<p style='color:red;'>Error al conectar con el servidor: ${error.message}</p>`;
    }
}

function renderizarGaleria(datos) {
    galeria.innerHTML = ""; 
    
    for (const [region, equipos] of Object.entries(datos)) {
        const titulo = document.createElement("h2");
        titulo.className = "titulo-region";
        titulo.textContent = region;
        galeria.appendChild(titulo);
        
        const grid = document.createElement("div");
        grid.className = "grid-region";
        
        equipos.forEach((pais) => {
            const nombreIngles = pais.name;
            const bandera = pais.media.flag;
            const capital = pais.capital || "Por definir";
            
            // Extracción de datos cruzados desde el diccionario local
            const infoPais = clasificadosMundial[region][nombreIngles];
            const nombreEspanol = infoPais.es;
            const informacion = infoPais.info;
            const esFavorito = listaFavoritos.includes(nombreEspanol);

            const card = document.createElement("article");
            card.className = "tarjeta";
            card.innerHTML = `
                <img src="${bandera}" alt="Bandera de ${nombreEspanol}" loading="lazy">
                <h3>${nombreEspanol}</h3>
                <p><strong>Capital:</strong> ${capital}</p>
                <p class="info-extra">${informacion}</p>
                <button class="btn-fav ${esFavorito ? 'activo' : ''}" data-nombre="${nombreEspanol}">
                    ${esFavorito ? '⭐ Favorito' : '☆ Marcar'}
                </button>
            `;
            
            // Evento Click en la tarjeta abre el Modal
            card.addEventListener("click", () => {
                abrirModal(nombreEspanol, bandera);
            });
            
            // Evento Click en botón de favorito (con stopPropagation para no abrir el modal)
            const btnFav = card.querySelector('.btn-fav');
            btnFav.addEventListener("click", (e) => {
                e.stopPropagation(); 
                const nombreClick = e.target.getAttribute("data-nombre");
                
                if (listaFavoritos.includes(nombreClick)) {
                    listaFavoritos = listaFavoritos.filter(fav => fav !== nombreClick);
                    e.target.classList.remove("activo");
                    e.target.textContent = "☆ Marcar";
                } else {
                    listaFavoritos.push(nombreClick);
                    e.target.classList.add("activo");
                    e.target.textContent = "⭐ Favorito";
                }
                sessionStorage.setItem("mis_favoritos", JSON.stringify(listaFavoritos));
            });

            grid.appendChild(card);
        });
        
        galeria.appendChild(grid);
    }
}

function abrirModal(nombre, bandera) {
    modalTitulo.textContent = nombre;
    modalBandera.src = bandera;
    modalJugadores.innerHTML = ""; 

    // Buscador interno en nuestra simulación de datos de nóminas
    const infoFutbol = datosDeportivos[nombre] || { 
        dt: "Por definir en el campamento base", 
        jugadores: ["Plantilla en proceso de scouting", "Pendiente de publicación oficial por la federación"] 
    };

    modalDt.textContent = infoFutbol.dt;
    infoFutbol.jugadores.forEach(jugador => {
        const li = document.createElement("li");
        li.textContent = jugador;
        modalJugadores.appendChild(li);
    });

    modal.classList.remove("oculta");
}

function aplicarFiltros() {
    const textoBuscado = inputBuscar.value.toLowerCase();
    const datosFiltrados = {};

    for (const [region, equipos] of Object.entries(datosAgrupadosGlobal)) {
        let filtrados = equipos;

        if (textoBuscado) {
            filtrados = filtrados.filter(pais => {
                const nombreEspanol = clasificadosMundial[region][pais.name].es.toLowerCase();
                return nombreEspanol.includes(textoBuscado);
            });
        }

        if (mostrandoSoloFavoritos) {
            filtrados = filtrados.filter(pais => {
                const nombreEspanol = clasificadosMundial[region][pais.name].es;
                return listaFavoritos.includes(nombreEspanol);
            });
        }

        if (filtrados.length > 0) datosFiltrados[region] = filtrados;
    }

    if (Object.keys(datosFiltrados).length === 0) {
        galeria.innerHTML = "<p style='text-align:center; color:#fff;'>No se encontraron selecciones mundialistas con los filtros aplicados.</p>";
        return;
    }

    renderizarGaleria(datosFiltrados);
}

// Escuchas de Eventos (Listeners)
inputBuscar.addEventListener("input", aplicarFiltros);

btnVerFavoritos.addEventListener("click", () => {
    mostrandoSoloFavoritos = !mostrandoSoloFavoritos;
    if (mostrandoSoloFavoritos) {
        btnVerFavoritos.style.backgroundColor = "#fbbf24"; 
        btnVerFavoritos.style.color = "#000";
        btnVerFavoritos.textContent = "Volver a Todas";
    } else {
        btnVerFavoritos.style.backgroundColor = "rgba(255,255,255,0.15)";
        btnVerFavoritos.style.color = "white";
        btnVerFavoritos.textContent = "⭐ Mis Favoritos";
    }
    aplicarFiltros();
});

btnCerrarModal.addEventListener("click", () => { modal.classList.add("oculta"); });
window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("oculta"); });
btnCargar.addEventListener("click", cargarDatos);