📚 Aplicación de Lista de Tareas (To-Do List)

¡Bienvenido al repositorio de la aplicación de Lista de Tareas! Esta es una aplicación móvil desarrollada con Ionic y Angular que te permite organizar tus tareas, categorizarlas, y filtrarlas por día de la semana. Incluye funcionalidades avanzadas como persistencia de datos local, integración con Firebase Remote Config para feature flags, y un tema de modo oscuro que se activa automáticamente según la configuración de tu dispositivo.


🚀 1. Ejecutar la Aplicación Localmente

Sigue estos pasos para poner en marcha la aplicación en tu entorno de desarrollo.

Prerrequisitos:
Asegúrate de tener instalados los siguientes programas en tu sistema:

- Node.js y npm: Descarga e instala la versión LTS (Long Term Support) desde nodejs.org.

- Ionic CLI: Una vez que tengas Node.js y npm, instala la interfaz de línea de comandos de Ionic globalmente:

      npm install -g @ionic/cli

Pasos para la Ejecución:
Clonar el Repositorio (si aún no lo tienes):

    git clone https://github.com/David0831/to-do-list.git
    cd to-do-list

Instalar Dependencias:
Navega a la raíz del proyecto en tu terminal e instala todas las dependencias de Node.js:

    npm install

Ejecutar la Aplicación en el Navegador:
Una vez instaladas las dependencias, puedes iniciar la aplicación en tu navegador web local:

    ionic serve

Esto abrirá automáticamente la aplicación en tu navegador predeterminado (generalmente en http://localhost:8100/).


📝 2. Descripción del Proyecto y Funcionalidades Principales

Esta aplicación está diseñada para ser una herramienta intuitiva de gestión de tareas. Ofrece las siguientes funcionalidades clave:

- Gestión de Tareas: Crea, edita, marca como completadas y elimina tareas.

- Categorías Personalizables: Organiza tus tareas asignándolas a categorías que puedes crear, editar y eliminar.

- Filtros Avanzados: Filtra tus tareas por categoría y por el día de la semana asignado.

- Persistencia de Datos: Todas tus tareas y categorías se guardan automáticamente en el almacenamiento local de tu dispositivo, persistiendo entre sesiones.

- Modo Oscuro Automático: La aplicación se adapta automáticamente al tema de color (claro u oscuro) configurado en el sistema operativo de tu dispositivo.

- Feature Flags (Firebase Remote Config): Controla la visibilidad de ciertas funcionalidades a través de Firebase Remote Config. En este caso, la barra de filtro por       categorías se muestra o se oculta dinámicamente según un parámetro configurado en Firebase. Esto permite despliegues controlados de nuevas características sin necesidad de   actualizar la aplicación.


📜 3. Historial de Commits Detallado

A continuación, se detalla el progreso y las características añadidas en cada etapa del desarrollo de la aplicación, siguiendo la secuencia de los commits:

- feat: create home with task list
Este commit marca el inicio del proyecto. Se creó la interfaz principal de la aplicación (home.page) que muestra una lista de tareas. En esta etapa, las tareas estaban   "quemadas" (hardcoded) directamente en un array dentro del código. Se implementaron las funcionalidades básicas para la interacción con cada tarea: la capacidad de marcar   una tarea como completada o incompleta a través de un checkbox, y la opción de eliminar una tarea de la lista.

- Feat: Create category filter
En este commit, se introdujo una mejora significativa en la organización de las tareas. Se implementó la lógica de filtrado por categorías. Se añadió una barra superior en la interfaz principal donde se mostraban categorías predefinidas (también "quemadas" inicialmente en un array). Al seleccionar una categoría de esta barra, la lista de tareas se filtraba para mostrar solo aquellas que pertenecían a la categoría seleccionada, mejorando la navegabilidad y gestión de tareas.

- Feat: Create logic and modals for create, edit and delete categories
Este fue un commit clave para hacer la aplicación más dinámica. Las categorías dejaron de ser estáticas. Se desarrolló la lógica completa para gestionar las categorías, incluyendo la capacidad de:

  °Crear nuevas categorías a través de una modal interactiva.

  °Editar los nombres de las categorías existentes.

  °Eliminar categorías.
  
Se crearon las interfaces de usuario (modales) necesarias para estas operaciones, permitiendo al usuario una personalización total de sus categorías.

- Feat: Create logic and modal for create and edit tasks
Similar al commit anterior, pero enfocado en las tareas. Se implementó la lógica para gestionar las tareas de forma dinámica, permitiendo a los usuarios:

  °Crear nuevas tareas con campos como título, descripción y la asignación a una categoría existente (o sin categoría).

  °Editar los detalles de las tareas ya creadas.

Se desarrollaron las modales correspondientes para una experiencia de usuario fluida en la creación y edición de tareas.

- Feat: Add logic for save tasks and categories data in localstorage
Este commit aborda la persistencia de datos. Antes de este cambio, todas las tareas y categorías se perdían al recargar la página o cerrar la aplicación. Con esta implementación, se añadió la lógica para guardar automáticamente todas las tareas y categorías en el localStorage del navegador/dispositivo. Esto asegura que la información del usuario se mantenga persistente entre sesiones, mejorando la usabilidad de la aplicación.

- Feat: implement firebase for activate and desactivate categories bar
Se dio un paso hacia la modularidad y el control de funcionalidades. Se integró Firebase Remote Config en la aplicación. Esto permite utilizar Feature Flags para controlar la visibilidad de la barra de filtrado por categorías. Ahora, un administrador puede activar o desactivar esta barra de forma remota a través de la consola de Firebase, sin necesidad de actualizar la aplicación, facilitando pruebas A/B o despliegues progresivos de funcionalidades.

- Feat: Modify application style
Este commit se centró en la mejora de la experiencia visual. Se realizaron ajustes estéticos generales en el estilo de la aplicación para que se viera más moderna, coherente y atractiva visualmente. Esto incluyó cambios en colores, espaciados, tipografías y otros elementos de la interfaz de usuario para mejorar la presentación general.

- Feat: Add days of week filter
Se añadió una nueva y potente opción de filtrado. Además de las categorías, ahora los usuarios pueden asignar un día de la semana (Lunes a Domingo) a cada tarea al crearla o editarla. Se implementó una nueva barra superior de filtrado que permite al usuario seleccionar un día específico para ver solo las tareas correspondientes, o seleccionar "Todos" para ver todas las tareas, lo que añade otra capa de organización.

- Feat: Optimice the proyect
Este commit se dedicó a mejorar el rendimiento y la eficiencia de la aplicación. Se implementaron diversas optimizaciones, como la configuración de la estrategia de detección de cambios de Angular a OnPush para minimizar las verificaciones innecesarias del árbol de componentes, resultando en una aplicación más fluida y con menor consumo de memoria.

En resumen, cada commit ha contribuido a evolucionar esta aplicación de una simple lista de tareas a una herramienta robusta y personalizable.


💡 4. Guía de Uso de la Aplicación

Aquí te explicamos cómo interactuar con las funcionalidades principales de la aplicación:

- Tareas
    °Ver Tareas: Al abrir la aplicación, verás una lista de todas tus tareas pendientes y completadas.

    °Marcar/Desmarcar como Completada: Haz clic en el checkbox a la izquierda de cada tarea para cambiar su estado a completada (aparecerá tachada) o incompleta.

    °Crear Nueva Tarea: Haz clic en el botón flotante + (icono de adición) en la esquina inferior derecha para abrir la modal de creación. Rellena el Título (obligatorio), la Descripción (opcional), selecciona una Categoría (opcional) y un Día de la Semana (opcional). Haz clic en "Crear".

    °Editar Tarea: Haz clic en el icono de lápiz (editar) a la derecha de cada tarea para abrir la modal de edición. Modifica los campos que desees y haz clic en "Guardar Cambios".

    °Eliminar Tarea: Haz clic en el icono de papelera (eliminar) a la derecha de cada tarea. La tarea se eliminará permanentemente de tu lista.

- Categorías
    °Gestionar Categorías: Haz clic en el icono de etiquetas (pricetags o apps-outline) en la barra de título principal (arriba a la derecha) para abrir la modal de gestión de categorías.

    °Crear Categoría: Dentro de la modal de categorías, usa el botón "Crear Categoría" para añadir nuevas categorías con un nombre de tu elección.

    °Editar Categoría: Haz clic en el icono de lápiz junto a una categoría para cambiar su nombre.

    °Eliminar Categoría: Haz clic en el icono de papelera junto a una categoría para eliminarla. Si eliminas una categoría, las tareas asociadas a ella pasarán a estar "Sin categoría".

    °Filtrar por Categoría: En la barra superior, haz clic en las "chips" de categoría. La chip "Todas" mostrará todas las tareas, y cada chip de categoría mostrará solo las tareas asignadas a esa categoría. Puedes deslizar la barra de categorías horizontalmente para ver todas las opciones si tienes muchas.

- Días de la Semana
    °Filtrar por Día: Justo debajo del título principal, verás una barra con los días de la semana (Lunes, Martes, etc.) y una opción "Todos". Haz clic en un día para filtrar las tareas y ver solo aquellas asignadas a ese día.

    °Asignar Día a la Tarea: Al crear o editar una tarea, encontrarás un campo "Día de la Semana" en la modal. Puedes seleccionar a qué día pertenece la tarea o dejarlo en "No seleccionado".

- Feature Flags
La aplicación está configurada con Firebase Remote Config para el uso de Feature Flags. Esto permite controlar la visibilidad de ciertas funcionalidades, como la barra de filtros por categorías, de forma remota. La visibilidad de esta barra depende de un parámetro configurado en Firebase, lo que permite activarla o desactivarla en la aplicación sin necesidad de una nueva actualización de la misma.


🛠️ 5. Compilación y Ejecución en Android e iOS (Cordova)

Para ejecutar la aplicación en dispositivos o emuladores reales, necesitarás configurar tu entorno de desarrollo nativo.

- Requisitos Previos para la Compilación Nativa
Asegúrate de tener instalados y configurados los siguientes componentes. Es CRÍTICO que la ruta de tu proyecto NO contenga caracteres especiales (acentos como ó, ñ), ni espacios, para evitar problemas de compilación (ej. D:\dev\ionic_projects\to-do-list).

- Para Android:

    °Java Development Kit (JDK):

    °Versión recomendada: JDK 11 o 17 LTS (Long Term Support). Java 21+ puede presentar problemas de compatibilidad con algunas versiones de Gradle.

    °Instalación: Descarga e instala desde https://adoptium.net/temurin/releases/.

    °Configura JAVA_HOME: Variable de entorno del sistema que apunta a la raíz de tu instalación del JDK (ej. C:\Program Files\Eclipse Adoptium\jdk-17.0.x.x-Hotspot).

    °Añade %JAVA_HOME%\bin a tu variable Path del sistema.

- Android Studio:

    °Instalación: Descarga e instala Android Studio desde el sitio oficial.

    °Android SDK: Abre Android Studio y, a través del SDK Manager (File > Settings > Appearance & Behavior > System Settings > Android SDK), asegúrate de tener instalados:

    °Al menos una Android SDK Platform reciente (ej. API 33/34).

    °Android SDK Build-Tools (la versión más reciente).

    °Android SDK Command-line Tools (latest).

    °Android SDK Platform-Tools.

    °Configura ANDROID_HOME: Variable de entorno del sistema que apunta a la raíz de tu Android SDK (ej. C:\Users\TuUsuario\AppData\Local\Android\Sdk).

    °Añade las siguientes rutas a tu variable Path del sistema:

      -%ANDROID_HOME%\platform-tools

      -%ANDROID_HOME%\cmdline-tools\latest\bin

      -(Opcional, pero recomendado por compatibilidad): %ANDROID_HOME%\tools y %ANDROID_HOME%\tools\bin

      -Cierra y reabre TODAS las terminales después de modificar variables de entorno.

- Para iOS (Solo en macOS):

    °Xcode: Descarga e instala Xcode desde la App Store. Ábrelo una vez para completar la configuración inicial y aceptar las licencias.

    °Herramientas de Línea de Comandos de Xcode: En Terminal, ejecuta xcode-select --install.

    °Herramientas Globales (ya instaladas si seguiste el paso 1):

    °npm install -g @ionic/cli cordova native-run cordova-res

- Pasos para Compilar y Ejecutar
    °Asegúrate de estar en la raíz de tu proyecto Ionic en la terminal para todos estos comandos.

    °Limpieza Inicial (Recomendado si hay problemas o cambios de entorno):
    °Si encuentras errores durante la compilación, a menudo ayuda empezar de cero con las plataformas. Ejecuta la terminal como Administrador en Windows.

      rm -rf node_modules platforms www package-lock.json # En Windows, puedes usar 'rd /s /q node_modules platforms www' y borrar package-lock.json manualmente.
      npm install

- Añadir la Plataforma Android:
    °Este comando configura la estructura del proyecto nativo para Android. Ejecuta la terminal como Administrador en Windows.

      ionic cordova platform add android

    °Si ves advertencias sobre tags <splash>, puedes ignorarlas por ahora.

    °Si te sale un error EPERM, confirma que tu terminal se ejecuta como administrador.

- Añadir la Plataforma iOS (solo en macOS):

      ionic cordova platform add ios

- Construir los Archivos Web de tu Aplicación:
    °Este paso compila tu aplicación Angular (HTML, CSS, JS) en la carpeta www/.

      ionic build --prod

    °El flag --prod genera una versión optimizada para mejor rendimiento.

- Preparar la Plataforma Nativa:
    °Este comando copia los archivos de www/ a la estructura de la plataforma nativa y realiza otras configuraciones.

      ionic cordova prepare android
      ionic cordova prepare ios # Para iOS

    °Si encuentras el error "Could not find an installed version of Gradle":

    °Abre Android Studio y selecciona File > Open.

    °Navega a la ruta de tu proyecto Ionic (ej. D:\dev\ionic_projects\to-do-list\) y selecciona específicamente la carpeta platforms\android.

    °Android Studio importará el proyecto y realizará una sincronización de Gradle. Este proceso descargará y configurará la versión de Gradle necesaria. Espera pacientemente a que termine cualquier descarga o configuración. Acepta cualquier actualización de Gradle o sus plugins que te sugiera.

    °Una vez que la sincronización se complete sin errores en Android Studio, cierra Android Studio e intenta el ionic cordova prepare de nuevo.

- Para Android (Depuración):

      ionic cordova build android --debug --prod

    °El APK generado se encontrará en platforms/android/app/build/outputs/apk/debug/app-debug.apk.

- Para iOS (Depuración en macOS):

      ionic cordova build ios --debug --prod

    °El proyecto Xcode para depuración estará en platforms/ios/.

- Ejecutar en Emulador o Dispositivo:

- Para Android:

    °En Emulador: Asegúrate de tener un emulador Android configurado y corriendo en Android Studio (AVD Manager).

      ionic cordova emulate android --prod

    °En Dispositivo: Conecta tu dispositivo Android con la "Depuración USB" activada.

      ionic cordova run android --device --prod

- Para iOS (en macOS):

    °En Emulador/Simulador:

      ionic cordova emulate ios --prod

    °En Dispositivo: Requiere una cuenta de desarrollador Apple y configuración de "Code Signing" en Xcode.

      ionic cordova run ios --device --prod
