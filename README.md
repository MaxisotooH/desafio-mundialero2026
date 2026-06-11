Desafío: Galería de Selecciones Mundialeras FIFA 2026
Este proyecto es una aplicación web interactiva desarrollada como desafío práctico de Front-End, diseñada para visualizar las selecciones clasificadas a la Copa del Mundo FIFA 2026, permitiendo la gestión de favoritos y la consulta de información técnica de los planteles.

🚀 Tecnologías Utilizadas
HTML5 & CSS3: Estructura semántica y diseño responsivo con efecto Glassmorphism.

JavaScript (ES6+): Consumo de APIs, manipulación del DOM y lógica de filtrado.

GitHub & Git: Control de versiones y despliegue continuo mediante GitHub Pages.

API externa: SampleAPIs (para datos geográficos de países).

📅 Proceso de Desarrollo (Cronología del Proyecto)
El desarrollo se llevó a cabo siguiendo una metodología incremental:

Etapa 1: Estructura Base y Consumo de API
Se configuró el entorno con Live Server y se integró la API https://api.sampleapis.com/countries/countries mediante fetch asíncrono para obtener datos actualizados.

Se implementó la lógica inicial para renderizar tarjetas dinámicas con banderas y nombres de países.

Etapa 2: Filtrado y Organización por Confederaciones
Se desarrolló un diccionario de datos interno (clasificadosMundial) que actúa como filtro de realidad, permitiendo mostrar solo a las 48 selecciones clasificadas al Mundial 2026.

Se implementó un sistema de subdivisión por regiones (CONMEBOL, UEFA, etc.) utilizando estructuras de control en JavaScript para agrupar los datos antes de pintar el DOM.

Etapa 3: Sistema de Favoritos y Persistencia
Se integró sessionStorage para permitir que el usuario marque sus selecciones favoritas.

Se añadió un filtro global que permite alternar entre la vista de "Todas las selecciones" y "Mis Favoritos" en tiempo real sin recargar la página.

Etapa 4: Experiencia de Usuario (UX) y Ventana Modal
Se implementó un componente modal (<dialog> estilizado) que se activa al hacer clic en cualquier tarjeta.

Se creó una base de datos ficticia de plantillas para mostrar datos proyectados de Director Técnico y Jugadores Clave, proporcionando información detallada al usuario.

Etapa 5: Diseño Temático FIFA 2026™
Identidad Visual: Se aplicó una paleta de colores oficial (Índigo Profundo, Violeta y Verde Neón) con degradados CSS.

Tipografía y Estilo: Se utilizó la propiedad background-clip: text para aplicar el degradado oficial del Mundial a los encabezados, logrando un acabado profesional.

Responsividad: Se optimizó la grilla (CSS Grid) para adaptarse a cualquier dispositivo (Mobile-first).

🛠️ Cómo ejecutar el proyecto
Clona este repositorio: git clone https://github.com/tu-usuario/desafio-mundialero2026.git

Abre el archivo index.html en tu navegador o utiliza la extensión Live Server de VS Code.

Haz clic en "Cargar Selecciones" para iniciar el consumo de la API.

🌐 Enlace al Proyecto
Puedes visualizar la versión desplegada aquí:
👉 https://tu-usuario.github.io/desafio-mundialero2026/

💡 Nota para el profesor:
Este proyecto demuestra habilidades en consumo de servicios REST, manipulación eficiente del DOM, gestión de estados locales (sessionStorage) y diseño de interfaces modernas aplicadas a una temática deportiva de actualidad.
