import type { Dict } from "./schema";

const EMAIL = "gigikakauridze1302@gmail.com";

export const es: Dict = {
  ui: {
    htmlLang: "es",
    nav: { home: "Inicio", about: "Acerca de", disclosure: "Divulgación" },
    langLabel: "Idioma",
    skipToContent: "Saltar al contenido",
    backToPosts: "← Todos los artículos",
    latest: "Lo más reciente",
    footerTagline:
      "Financiado por los lectores: algunos enlaces son de afiliados.",
    footerAbout: "Acerca de",
    footerDisclosure: "Divulgación de afiliados",
    footerContact: "Contacto",
    affiliateNotice:
      "Este artículo contiene enlaces de afiliados. Si te registras a través de uno, este sitio puede ganar una comisión sin coste adicional para ti. Las recomendaciones se basan en pruebas prácticas, no en el importe de la comisión — consulta la [divulgación completa](~/disclosure/).",
    articleFooter: `Correcciones y peticiones: [${EMAIL}](mailto:${EMAIL}).`,
    signup: {
      label: "Recibe nuevas reseñas y benchmarks por correo",
      placeholder: "tu@ejemplo.com",
      button: "Suscribirse",
      note: "Un correo cuando se publica un nuevo benchmark o reseña. Sin spam, sin compartir tu dirección. Cancela cuando quieras.",
    },
    postKind: { Comparison: "Comparativa", Tutorial: "Tutorial" },
    postTitle: {
      "digitalocean-vs-vultr":
        "DigitalOcean vs Vultr: la comparativa de un desarrollador",
      "deploy-node-app-hetzner":
        "Despliega una app Node.js en un VPS de Hetzner con Docker",
    },
    postBlurb: {
      "digitalocean-vs-vultr":
        "Precios, especificaciones, rendimiento, facilidad de uso y soporte comparados entre DigitalOcean y Vultr — y cuál elijo yo, y cuándo.",
      "deploy-node-app-hetzner":
        "Un tutorial paso a paso: crea un servidor en Hetzner Cloud, refuérzalo, instala Docker y publica una app Node.js con HTTPS automático.",
    },
  },

  home: {
    title: "Reseñas de VPS para desarrolladores — Host or Die",
    description:
      "Reseñas de hosting VPS y en la nube hechas por un desarrollador: el mismo despliegue y los mismos benchmarks en cada proveedor — CPU, disco, red, arranque. Sin rankings patrocinados.",
    eyebrow: "Independiente · basado en benchmarks",
    h1Lead: "Reseñas de hosting VPS y en la nube",
    h1Accent: "para desarrolladores",
    lead: "Despliego aplicaciones reales en servidores reales, ejecuto la misma batería de benchmarks en cada uno — CPU, E/S de disco, rendimiento de red, tiempo de arranque — y cuento lo que realmente pasó.",
    intro:
      "Ningún proveedor paga por aparecer en este sitio y ninguna reseña está patrocinada. Algunos enlaces son de afiliados, y así se paga la factura del hosting; eso nunca cambia las cifras ni la recomendación. Así funcionan las pruebas: [la metodología](~/about/), y aquí está la [divulgación de afiliados](~/disclosure/).",
  },

  about: {
    title: "Metodología de benchmarks de VPS — Host or Die",
    description:
      "Cómo se prueba cada VPS aquí: las herramientas exactas, las métricas (CPU, disco, red, arranque), la máquina de pruebas y las reglas que mantienen honestos los rankings.",
    h1: "Acerca de y metodología",
    metaLine: "Por Gigi · desarrollador de backend e infraestructura",
    blocks: [
      { k: "h2", t: "Quién escribe esto" },
      {
        k: "p",
        t: 'Soy Gigi, desarrollador de backend e infraestructura. Llevo casi una década desplegando aplicaciones web, APIs y procesos en segundo plano en servidores Linux — bare metal, VPS y las grandes nubes — y manteniéndolos en marcha. Elegir dónde alojar un proyecto siempre acababa en la misma búsqueda frustrante: páginas de marketing llenas de adjetivos, benchmarks que nunca revelaban su configuración y listas "top 10" ordenadas por comisión de afiliado.',
      },
      {
        k: "p",
        t: "Host or Die es mi intento de crear el recurso que yo quería: cada proveedor sometido al mismo despliegue y a las mismas mediciones, con el método escrito para que puedas reproducirlo o encontrarle fallos. Si una cifra parece incorrecta, dímelo y la vuelvo a medir.",
      },
      { k: "h2", t: "Cómo se prueba cada proveedor" },
      {
        k: "p",
        t: "Cada reseña parte de una cuenta limpia y un servidor nuevo con la configuración por defecto del proveedor. Salvo que la reseña diga lo contrario, la máquina de pruebas es el plan más barato con al menos 1 vCPU y 1 GB de RAM, con <b>Ubuntu 24.04 LTS</b>, en la región más cercana a mí geográficamente. La creo dos veces, en días distintos, y promedio los resultados.",
      },
      { k: "h3", t: "La carga de trabajo" },
      {
        k: "p",
        t: "Primero va un despliegue representativo: una API Node.js en Docker frente a PostgreSQL, más un proxy inverso Nginx con un certificado de Let's Encrypt. Esto revela la fricción del mundo real — velocidad de descarga de imágenes, tiempo de build, si el panel de control te pelea — antes de recoger cualquier cifra sintética. Mi [guía paso a paso para desplegar una app Node.js con Docker en un VPS de Hetzner](~/deploy-node-app-hetzner/) recorre el mismo tipo de despliegue.",
      },
      { k: "h3", t: "Las mediciones" },
      {
        k: "table",
        head: ["Métrica", "Herramienta", "Qué te dice"],
        rows: [
          [
            "CPU, un núcleo y varios",
            "<c>sysbench cpu</c>, <c>stress-ng</c>, <c>7z b</c>",
            'Cómputo sostenido para builds, atención de peticiones y trabajos en segundo plano; si una vCPU "compartida" se estrangula bajo carga.',
          ],
          [
            "E/S de disco",
            "<c>fio</c> (lectura/escritura aleatoria 4K, secuencial 1M)",
            'Rendimiento de base de datos, cargas con muchos logs y qué tan honesta es la etiqueta "NVMe".',
          ],
          [
            "Rendimiento de red",
            "<c>iperf3</c> contra endpoints de terceros, <c>speedtest-cli</c>",
            "Salida real hacia otras regiones, no solo el propio espejo de test de velocidad del proveedor.",
          ],
          [
            "Tiempo de arranque y aprovisionamiento",
            "<c>systemd-analyze</c>, marcas de tiempo de la API, reloj de pared",
            "Con qué rapidez puedes escalar o reemplazar un nodo caído.",
          ],
          [
            "Latencia",
            "<c>ping</c>, <c>mtr</c>, TTFB desde tres continentes",
            "Calidad de ruta y peering, no solo la distancia en un mapa.",
          ],
        ],
      },
      { k: "h3", t: "También anotado, pero sin puntuar" },
      {
        k: "ul",
        items: [
          "Tiempo desde el registro hasta una sesión SSH utilizable.",
          "Si IPv6, red privada, snapshots y firewalls están incluidos o se facturan aparte.",
          "Cuota de salida/ancho de banda y el precio por GB excedido.",
          "Soporte: se abre un ticket real en cada reseña y se registra el tiempo de respuesta y su utilidad.",
          "Comportamiento de facturación — topes por hora, mínimos y lo difícil que es destruir del todo un recurso para que deje de cobrar.",
        ],
      },
      { k: "h2", t: "Reglas básicas" },
      {
        k: "ul",
        items: [
          "<b>Sin reseñas patrocinadas.</b> A ningún proveedor se le da aprobación del texto, un embargo ni acceso previo a una puntuación.",
          "<b>Los enlaces de afiliado nunca mueven el ranking.</b> Donde existe un enlace de referido, se usa; donde no, el proveedor se cubre igual. Consulta la [página de divulgación](~/disclosure/).",
          "<b>Las cifras incluyen su configuración.</b> Plan, región, fecha, kernel y versiones de las herramientas se publican con cada resultado para que puedas repetirlo.",
          "<b>Las reseñas se revisan.</b> Los proveedores cambian hardware y precios; las actualizaciones se añaden con fecha en lugar de editar en silencio.",
        ],
      },
      {
        k: "p",
        t: "Puedes ver el método aplicado de principio a fin en la [comparativa DigitalOcean vs Vultr](~/digitalocean-vs-vultr/). ¿Has visto un error o quieres que pruebe un proveedor? Escribe a [" +
          EMAIL +
          "](mailto:" +
          EMAIL +
          ").",
      },
    ],
  },

  disclosure: {
    title: "Divulgación de afiliados — Host or Die",
    description:
      "Cómo gana dinero Host or Die: algunos enlaces salientes son de afiliados y pagan una comisión sin coste extra para ti. Los rankings se basan en pruebas, no en pagos.",
    h1: "Divulgación de afiliados",
    blocks: [
      {
        k: "p",
        t: "<b>Este sitio gana comisiones por algunos de sus enlaces, sin coste adicional para ti.</b> Si haces clic en ciertos enlaces a un proveedor de hosting y luego te registras o contratas un plan, Host or Die puede recibir una tarifa de referido. Pagas el mismo precio que si fueras directamente al proveedor — en algunos casos menos, cuando un enlace de referido lleva un crédito de bienvenida.",
      },
      { k: "h2", t: "Qué cambia esto en el contenido — nada" },
      {
        k: "p",
        t: "Las recomendaciones de este sitio se basan en pruebas prácticas y en los resultados de benchmark descritos en la [metodología](~/about/). No se basan en qué empresa paga más, ni en si paga siquiera. En concreto:",
      },
      {
        k: "ul",
        items: [
          "Los proveedores sin programa de afiliados se reseñan y recomiendan exactamente en los mismos términos que los que sí lo tienen.",
          "Las tasas de comisión nunca son un factor en un veredicto, una puntuación ni el orden en que aparecen los proveedores.",
          "A ningún proveedor se le da pago, hosting gratis, aprobación del texto ni acceso previo a una reseña a cambio de cobertura.",
          "Cuando una recomendación cambia porque cambiaron las pruebas, el veredicto antiguo permanece visible con una actualización fechada.",
        ],
      },
      { k: "h2", t: "Dónde aparecen los enlaces de afiliado" },
      {
        k: "p",
        t: 'Los enlaces de afiliado pueden aparecer dentro de comparativas y tutoriales, en secciones claramente marcadas de "dónde registrarse" y en el pie de página del sitio. Toda página que los contenga lleva un aviso de divulgación arriba, no solo esta página. Los enlaces meramente informativos — documentación, páginas de estado, código fuente, páginas de precios citadas como referencia — no son enlaces de afiliado.',
      },
      { k: "h2", t: "Programas en los que participa este sitio" },
      {
        k: "p",
        t: "Host or Die gana comisión de referido a través de programas de afiliados gestionados directamente por proveedores de hosting y a través de la red de afiliados [Awin](https://www.awin.com/). Cuando una recomendación lleva un enlace de afiliado, el proveedor al que apunta se nombra en el aviso de divulgación al principio de esa página.",
      },
      {
        k: "p",
        t: "A fecha de septiembre de 2026, este sitio tiene una relación de afiliado activa con <b>DigitalOcean</b> (vía Awin) y una relación de referido con <b>Vultr</b>. Los enlaces a Hetzner y a cualquier otro proveedor mencionado no son enlaces de afiliado: Hetzner cerró su programa de referidos en 2026 y no hay acuerdo con los demás. Esta sección se actualiza a medida que eso cambie.",
      },
      { k: "h2", t: "FTC y normativa publicitaria" },
      {
        k: "p",
        t: "Esta divulgación se ofrece para cumplir las <i>Guías sobre el uso de recomendaciones y testimonios en la publicidad</i> de la Comisión Federal de Comercio de EE. UU. (16 CFR Parte 255) y la normativa equivalente en otros lugares, incluido el CAP Code del Reino Unido. La intención es simple: siempre debes saber cuándo un enlace puede hacer ganar dinero a este sitio.",
      },
      { k: "h2", t: "Preguntas" },
      {
        k: "p",
        t: "Escribe a [" + EMAIL + "](mailto:" + EMAIL + ") y te responderé.",
      },
      { k: "p", t: "<i>Última actualización: 4 de septiembre de 2026.</i>" },
    ],
  },

  dovv: {
    title: "DigitalOcean vs Vultr: comparativa para desarrolladores (2026)",
    description:
      "¿DigitalOcean o Vultr? Comparativa práctica de precios, especificaciones, rendimiento real, soporte y facilidad de uso — y cuál elegir, y cuándo.",
    h1: "DigitalOcean vs Vultr: la comparativa de un desarrollador",
    metaLine:
      "Comparativa · publicado el 12 de agosto de 2026 · actualizado el 4 de septiembre de 2026 · precios verificados en agosto de 2026",
    blocks: [
      { k: "affiliateNotice" },
      {
        k: "p",
        t: "DigitalOcean y Vultr están en la misma parte del mercado: instancias VPS Linux no gestionadas, facturadas por hora con un tope mensual, pensadas para desarrolladores cómodos con una terminal. Son tan parecidas que la decisión suele reducirse a tres cosas — cuánta cobertura geográfica necesitas, si quieres complementos gestionados de primera parte y cuánto te importa exprimir el máximo cómputo por dólar.",
      },
      {
        k: "p",
        t: "Mantengo ambas cuentas en marcha de forma continua y despliego la misma pila de referencia (una API Node.js en Docker frente a PostgreSQL, tras Nginx con un certificado de Let's Encrypt) en cada una — el mismo montaje que cubre mi [tutorial de Node.js en Hetzner con Docker](~/deploy-node-app-hetzner/). Este artículo es la parte cualitativa — precios, funciones, flujo de trabajo, soporte. Las cifras de benchmark sintético tienen su propia sección más abajo; consulta la [metodología](~/about/) para saber cómo se recogen.",
      },
      {
        k: "verdict",
        heading: "Veredicto rápido",
        head: ["Si quieres…", "Elige", "Porque"],
        rows: [
          [
            "La mejor documentación, UI pulida, servicios gestionados de primera parte",
            "DigitalOcean",
            "App Platform, bases de datos gestionadas y una biblioteca de tutoriales que cubre casi todo lo que te encuentres.",
          ],
          [
            "Más cómputo y NVMe por dólar",
            "Vultr",
            "Los planes High Frequency / High Performance empiezan con NVMe a un precio de entrada menor que los Droplets SSD de DigitalOcean.",
          ],
          [
            "Regiones poco habituales (Sudamérica, África, más de Asia)",
            "Vultr",
            "~32 ubicaciones frente a las ~15 de DigitalOcean, incluidas Johannesburgo, São Paulo y varias ciudades más de Asia.",
          ],
          [
            "SO personalizado por subida de ISO, bare metal o GPU fraccionadas",
            "Vultr",
            "DigitalOcean no permite subir ISO; su oferta de bare metal y GPU es más limitada.",
          ],
          [
            "Una cuenta de equipo con roles y facturación predecible",
            "DigitalOcean",
            "Funciones de equipo/RBAC más maduras y ancho de banda compartido entre Droplets.",
          ],
        ],
        note: "<b>Versión corta:</b> si publicas una app web típica y valoras la documentación y los complementos gestionados, DigitalOcean es el camino más cómodo. Si quieres rendimiento puro por dólar, una región rara o hardware que DigitalOcean no vende, gana Vultr. Ninguna es una mala elección.",
      },
      { k: "h2", t: "Precios y especificaciones" },
      {
        k: "p",
        t: "Ambos proveedores facturan por hora y con tope mensual, miden el ancho de banda saliente con una cuota por plan y un excedente de aproximadamente 0,01 $/GB, y cobran aparte el almacenamiento en bloque y los snapshots. Los planes de entrada quedan así:",
      },
      {
        k: "table",
        head: ["Plan", "vCPU / RAM", "Disco", "Transferencia", "Precio/mes"],
        rows: [
          ["DigitalOcean Basic Droplet", "1 / 512 MB", "10 GB SSD", "0,5 TB", "~4 $"],
          ["DigitalOcean Basic Droplet", "1 / 1 GB", "25 GB SSD", "1 TB", "~6 $"],
          ["DigitalOcean Basic Droplet", "2 / 4 GB", "80 GB SSD", "4 TB", "~24 $"],
          ["Vultr Cloud Compute (Regular)", "1 / 1 GB", "25 GB SSD", "1 TB", "~5 $"],
          ["Vultr High Frequency", "1 / 1 GB", "32 GB NVMe", "1 TB", "~6 $"],
          ["Vultr High Performance", "2 / 4 GB", "128 GB NVMe", "3 TB", "~24 $"],
        ],
      },
      {
        k: "p",
        t: "El patrón: los Droplets base de DigitalOcean son SSD, no NVMe, y no puedes comprar una máquina NVMe en la parte baja de la gama. Las líneas High Frequency y High Performance de Vultr ponen NVMe y núcleos a más frecuencia a un dólar de los planes normales, y por eso Vultr suele salir mejor en precio-rendimiento. DigitalOcean responde con ancho de banda <i>compartido</i> entre todos los Droplets de la cuenta, así que una flota con tráfico desigual desperdicia menos cuota.",
      },
      { k: "p", t: "Algunas partidas que pillan a la gente por sorpresa:" },
      {
        k: "ul",
        items: [
          "<b>Los snapshots no son gratis en ninguno.</b> Ambos cobran unos 0,05–0,06 $ por GB-mes; las copias automáticas añaden ~20 % al precio de la instancia.",
          "<b>Los planes más baratos de Vultr son a veces solo IPv6</b> o tienen stock regional limitado. Una IPv4 dedicada es un extra en el nivel más bajo.",
          "<b>La protección DDoS</b> viene incluida en los Load Balancers de DigitalOcean; en Vultr es un extra de ~10 $/mes por instancia.",
          'Los precios del hosting cambian. Toma la tabla de arriba como "verificada en agosto de 2026" y confírmalos en la página de precios de cada proveedor antes de comprometerte.',
        ],
      },
      { k: "h2", t: "Rendimiento" },
      {
        k: "p",
        t: "Ambos proveedores usan hardware de generación actual en sus regiones principales, y para una carga web normal en los planes de entrada no notarás diferencia en una prueba a ciegas. Se separan bajo carga sostenida y en trabajo intensivo de disco. Aquí está dónde queda cada uno, tras ejecutar la [carga de prueba estándar](~/about/) más tráfico de producción en ambos durante un periodo prolongado.",
      },
      {
        k: "p",
        t: "<b>CPU.</b> Las líneas High Frequency y High Performance de Vultr usan núcleos a más frecuencia que un Droplet base de DigitalOcean, así que el trabajo de un solo hilo — renderizado de plantillas, serialización JSON, la mayoría de la atención de peticiones — termina más rápido por dólar en esos niveles. En los planes compartidos normales las dos están parejas, y ambas estrangulan una vCPU ruidosa bajo una carga larga al 100 %, algo esperable a este precio.",
      },
      {
        k: "p",
        t: "<b>Disco.</b> Aquí está la diferencia más clara. Los Droplets Basic de DigitalOcean son SSD; los planes High Frequency y High Performance de Vultr son NVMe, y se nota en E/S aleatoria 4K — el patrón de acceso que genera de verdad una base de datos relacional. Para una máquina de Postgres o MySQL con presupuesto ajustado, los niveles NVMe de Vultr son mejor hardware.",
      },
      {
        k: "p",
        t: "<b>Red.</b> Prácticamente empate. Ambos tienen buen peering desde sus regiones principales, se mantienen cerca del máximo en transferencias entre continentes y mostraron una estabilidad de ruta comparable durante una semana de monitorización.",
      },
      {
        k: "p",
        t: "<b>Aprovisionamiento.</b> Ambos crean una instancia utilizable en bastante menos de un minuto vía API. Vultr suele ser unos segundos más rápido en dejar la máquina lista para SSH; ninguno es tan lento como para importar, salvo que hagas autoescalado agresivo.",
      },
      {
        k: "p",
        t: "Las tablas de benchmark completas — plan exacto, región, kernel, versiones de herramientas y salida en bruto de los comandos — se publican en la reseña individual de cada proveedor cuando se completa esa ronda. La [metodología](~/about/) enumera todos los comandos usados.",
      },
      { k: "h2", t: "Facilidad de uso y flujo de trabajo" },
      {
        k: "p",
        t: 'Esta es la mayor fortaleza de DigitalOcean. El panel de control es limpio y rápido, la CLI <c>doctl</c> y la API están bien documentadas, el proveedor de Terraform es de primera parte y está al día, y la biblioteca de tutoriales es sinceramente la mejor del sector — para un montón de problemas del tipo "cómo configuro X en Ubuntu", el primer resultado de búsqueda es un artículo de DigitalOcean que de verdad funciona. Si prefieres no gestionar una base de datos ni un pipeline de despliegue, <b>App Platform</b> (su PaaS) y PostgreSQL / MySQL / Redis / Kafka gestionados están a un clic e integrados con el resto de la cuenta.',
      },
      {
        k: "p",
        t: 'El panel de Vultr es funcional y ha recuperado mucho terreno. Hace cosas que DigitalOcean no: <b>subir una ISO personalizada</b> e instalar el SO que quieras, aprovisionar <b>bare metal</b> desde el mismo panel y lanzar instancias con <b>GPU fraccionada</b>. Su API y su proveedor de Terraform son sólidos. Lo más flojo es el ecosistema que lo rodea — menos apps de un clic en el marketplace, menos documentación y complementos gestionados un paso por detrás de los de DigitalOcean en acabado. Para el simple "dame una máquina Linux rápida en la región X", esa diferencia no importa; para "dame un Postgres gestionado, un PaaS y un balanceador que se conozcan entre sí", sí.',
      },
      { k: "h2", t: "Soporte" },
      {
        k: "p",
        t: "Ambos ofrecen soporte por tickets 24/7 en todos los planes sin necesidad de un nivel de pago para abrir un ticket. En mi experiencia los tiempos de primera respuesta son similares — normalmente bastante menos de una hora para cualquier cosa que parezca urgente. Vultr incluye soporte por tickets en todos los planes por defecto; DigitalOcean vende planes de soporte Standard y Premium (con precio como porcentaje del gasto mensual) que añaden SLA más rápidos y, en Premium, acceso por Slack y una revisión de arquitectura. Para la mayoría de desarrolladores en solitario y equipos pequeños el soporte gratuito de cualquiera de los dos es suficiente, y la documentación de DigitalOcean evita muchos tickets que abrirías de otro modo.",
      },
      { k: "h2", t: "Pros y contras" },
      {
        k: "pros",
        groups: [
          {
            title: "DigitalOcean — a favor",
            items: [
              "Documentación y tutoriales de referencia",
              "UI pulida, CLI/API/Terraform maduros",
              "App Platform de primera parte + bases de datos gestionadas",
              "Ancho de banda compartido entre la cuenta",
              "Mejores funciones de equipo / control de acceso por roles",
            ],
          },
          {
            title: "DigitalOcean — en contra",
            items: [
              "Los Droplets base son SSD, no NVMe",
              "Sin opción NVMe en la gama baja",
              "~15 regiones — sin Sudamérica ni África",
              "Sin subida de ISO personalizada",
              "Oferta limitada de bare metal / GPU",
            ],
          },
          {
            title: "Vultr — a favor",
            items: [
              "NVMe + núcleos a alta frecuencia cerca del precio de entrada",
              "~32 ubicaciones, incluidas regiones raras",
              "Subida de ISO personalizada; instala cualquier SO",
              "Bare metal y GPU fraccionadas en el mismo panel",
              "Soporte por tickets en todos los planes",
            ],
          },
          {
            title: "Vultr — en contra",
            items: [
              "Documentación / comunidad más pequeña",
              "Complementos gestionados menos pulidos que los de DigitalOcean",
              "El nivel más barato puede ser solo IPv6 / con stock limitado",
              "La protección DDoS es un extra de pago",
              "Menos apps de un clic en el marketplace",
            ],
          },
        ],
      },
      { k: "h2", t: "Recomendación" },
      {
        k: "p",
        t: "<b>Elige DigitalOcean si</b> vas a desplegar una app web o API típica y valoras la documentación, la consola pulida y tener Postgres gestionado, un balanceador o el PaaS App Platform a un clic. El flujo de trabajo es más cómodo de principio a fin, y para la mayoría de los equipos ese tiempo ahorrado vale más que los pocos dólares al mes que Vultr recorta de la factura.",
      },
      {
        k: "p",
        t: "<b>Elige Vultr si</b> los detalles te empujan ahí: quieres el máximo de CPU y NVMe por dólar, necesitas una región en la que DigitalOcean no opera, necesitas arrancar una ISO personalizada, o quieres bare metal o una GPU fraccionada sin salir del panel. Las instancias High Frequency y High Performance son de verdad hardware más rápido que un Droplet base, no solo una etiqueta más barata.",
      },
      {
        k: "p",
        t: "¿Sigues dudando? Ambos facturan por hora sin mínimo, así que la respuesta honesta es ejecutar tu propia carga en cada uno durante unos días y quedarte con el que se sintió mejor. Nada de esto es una decisión que no puedas revertir en una tarde.",
      },
      {
        k: "p",
        t: "Una nota sobre la parte de divulgación: el programa de afiliados de DigitalOcean paga a lo largo del primer año de un cliente, lo que encaja con cómo se usan de verdad estas cuentas — montas algo y lo dejas funcionando. Si te inclinas por DigitalOcean tras leer esto, [empieza aquí](aff:do).",
      },
      {
        k: "callout",
        label: "Crédito de Vultr",
        body: "Vultr tiene ahora mismo una promoción: regístrate [con este enlace](aff:vultr) y obtienes 300 $ de crédito para probar la plataforma tú mismo — sin condiciones más allá de vincular un método de pago. Es una oferta por tiempo limitado y puede no estar siempre activa; si el importe que ves al entrar es distinto, por eso es.",
      },
      { k: "h2", t: "Dónde registrarse" },
      {
        k: "p",
        t: "Los dos enlaces de abajo llevan seguimiento: DigitalOcean es un enlace de afiliado (vía Awin), Vultr es un enlace de referido. Si creas una cuenta a través de uno, este sitio puede ganar una comisión sin coste para ti. Consulta la [divulgación](~/disclosure/).",
      },
      {
        k: "ul",
        items: [
          "[Crear una cuenta de DigitalOcean](aff:do) — las cuentas nuevas suelen empezar con crédito gratis.",
          "[Crear una cuenta de Vultr](aff:vultr) — ahora mismo 300 $ de crédito de prueba (ver la nota de arriba).",
        ],
      },
      {
        k: "p",
        t: "¿Prefieres no usar un enlace con seguimiento? Ir directamente a <c>digitalocean.com</c> o <c>vultr.com</c> te cuesta lo mismo y la reseña vale igual.",
      },
    ],
  },

  hetzner: {
    title: "Despliega una app Node.js en un VPS de Hetzner con Docker",
    description:
      "Tutorial para copiar y pegar: crea un VPS en Hetzner, refuérzalo, instala Docker y despliega una app Node.js con HTTPS automático vía Caddy. Probado en Ubuntu 24.04.",
    h1: "Despliega una app Node.js en un VPS de Hetzner con Docker",
    metaLine:
      "Tutorial · publicado el 26 de agosto de 2026 · actualizado el 4 de septiembre de 2026 · probado en Ubuntu 24.04 LTS",
    blocks: [
      {
        k: "p",
        t: "Hetzner Cloud es mi opción por defecto para máquinas de producción pequeñas y medianas: un <c>CAX11</c> Arm (2 vCPU, 4 GB RAM, 40 GB NVMe) cuesta unos 3,29 €/mes y un <c>CX22</c> x86 con las mismas especificaciones unos 3,79 €/mes, ambos en NVMe rápido. Este recorrido lleva un servidor recién creado a una app Node.js servida por HTTPS y en marcha. Todos los comandos se ejecutaron en un <c>CX22</c> con Ubuntu 24.04 limpio. Si aún estás eligiendo proveedor, mi [comparativa DigitalOcean vs Vultr](~/digitalocean-vs-vultr/) explica cómo se comparan las opciones principales.",
      },
      { k: "h2", t: "Con qué acabarás" },
      {
        k: "ul",
        items: [
          "Un servidor Ubuntu 24.04 reforzado (usuario sudo no root, SSH solo con clave, firewall).",
          "Docker Engine + plugin Compose desde el repositorio oficial de Docker.",
          "Una app Express en contenedor que se reinicia al arrancar la máquina.",
          "Caddy por delante, terminando TLS con un certificado de Let's Encrypt que se renueva solo.",
        ],
      },
      { k: "h2", t: "Requisitos previos" },
      {
        k: "ul",
        items: [
          "Un par de claves SSH en tu máquina (<c>ssh-keygen -t ed25519</c> si no lo tienes).",
          "Un nombre de dominio al que puedas añadir un registro DNS (necesario para el HTTPS del paso 9).",
          "Soltura básica con la terminal. No hace falta saber Docker de antemano.",
        ],
      },
      { k: "h2", t: "1. Crear el servidor" },
      {
        k: "p",
        t: "[Regístrate en Hetzner Cloud](aff:hetzner) y crea un nuevo <b>Project</b>. En el proyecto:",
      },
      {
        k: "ol",
        items: [
          "<b>Security → SSH keys → Add SSH key</b>. Pega el contenido de tu <c>~/.ssh/id_ed25519.pub</c>.",
          "<b>Servers → Add Server</b>. Elige: la ubicación más cercana a tus usuarios (Núremberg, Falkenstein, Helsinki, Ashburn, Hillsboro, Singapur); imagen <b>Ubuntu 24.04</b>; tipo <c>CX22</c> (x86) o <c>CAX11</c> (Arm) — este tutorial construye la imagen en el servidor, así que sirve cualquiera; la clave SSH que acabas de añadir; nombre <c>app-01</c>.",
          "Créalo y copia la dirección IPv4 pública del servidor.",
        ],
      },
      {
        k: "p",
        t: "Opcional pero recomendable: en <b>Firewalls</b>, crea un firewall de Hetzner Cloud que permita solo TCP entrante <c>22</c>, <c>80</c> y <c>443</c>, y adjúntalo al servidor. Es una segunda capa por delante del firewall del host que configuramos en el paso 5.",
      },
      { k: "h2", t: "2. Primer acceso y actualización del sistema" },
      {
        k: "p",
        t: "Conéctate como <c>root</c> usando la clave que instaló Hetzner:",
      },
      { k: "code", ref: "firstLogin" },
      {
        k: "p",
        t: "El <c>reboot</c> carga cualquier kernel nuevo. Espera ~20 segundos y vuelve a entrar por SSH.",
      },
      { k: "h2", t: "3. Crear un usuario no root" },
      {
        k: "p",
        t: "Trabajar y ejecutar contenedores como root es un riesgo innecesario. Crea un usuario con sudo:",
      },
      { k: "code", ref: "createUser" },
      {
        k: "p",
        t: "Abre una <i>nueva</i> terminal (deja la sesión de root abierta como red de seguridad) y confirma que el nuevo usuario funciona:",
      },
      { k: "code", ref: "verifyUser" },
      { k: "h2", t: "4. Reforzar SSH" },
      {
        k: "p",
        t: "Desactiva el acceso de root y la autenticación por contraseña. Pon los ajustes en un archivo drop-in para que una futura actualización de <c>openssh-server</c> no los pise:",
      },
      { k: "code", ref: "hardenSsh" },
      {
        k: "p",
        t: "En Ubuntu 24.04 SSH se activa por socket; si el reinicio de arriba no surte efecto, ejecuta <c>sudo systemctl restart ssh.socket</c>. Prueba en una nueva terminal <b>antes</b> de cerrar tu sesión de trabajo: <c>ssh deploy@YOUR_SERVER_IP</c> debe seguir funcionando y <c>ssh root@YOUR_SERVER_IP</c> debe quedar rechazado.",
      },
      { k: "h2", t: "5. Firewall del host" },
      {
        k: "p",
        t: "Permite SSH, HTTP y HTTPS; deniega todo lo demás entrante:",
      },
      { k: "code", ref: "firewall" },
      { k: "h2", t: "6. Instalar Docker" },
      {
        k: "p",
        t: "Usa el repositorio APT oficial de Docker, no el paquete más antiguo de la distribución:",
      },
      { k: "code", ref: "installDocker" },
      {
        k: "p",
        t: "Que el contenedor <c>hello-world</c> imprima un mensaje de éxito significa que el motor está en marcha.",
      },
      { k: "h2", t: "7. La aplicación" },
      {
        k: "p",
        t: "Crea el proyecto en el servidor (o constrúyelo en local y súbelo con <c>git clone</c> / <c>scp</c>). Es una API Express mínima con un health check.",
      },
      { k: "code", ref: "mkProject" },
      { k: "file", name: "package.json" },
      { k: "code", ref: "packageJson" },
      { k: "file", name: "app.js" },
      { k: "code", ref: "appJs" },
      {
        k: "p",
        t: "<c>Dockerfile</c> — multietapa para que la imagen final lleve solo dependencias de producción, y se ejecuta como el usuario no root <c>node</c> integrado.",
      },
      { k: "code", ref: "dockerfile" },
      {
        k: "p",
        t: "<c>npm ci</c> necesita un lockfile. Genera uno una vez (en local o en el servidor) con <c>npm install</c>, que crea <c>package-lock.json</c>. Luego añade <c>.dockerignore</c>:",
      },
      { k: "code", ref: "dockerignore" },
      { k: "h2", t: "8. Construir y ejecutar (HTTP)" },
      {
        k: "p",
        t: "Comprobación rápida de que el contenedor funciona antes de añadir TLS:",
      },
      { k: "code", ref: "buildRun" },
      {
        k: "p",
        t: "Visita <c>http://YOUR_SERVER_IP</c> en un navegador — deberías obtener el JSON. Luego párala, porque el paso 9 necesita el puerto 80:",
      },
      { k: "code", ref: "rmContainer" },
      { k: "h2", t: "9. HTTPS con Caddy" },
      {
        k: "p",
        t: "Primero apunta el DNS al servidor: crea un <b>registro A</b> para tu dominio (por ejemplo <c>app.example.com</c>) hacia <c>YOUR_SERVER_IP</c> y espera a que resuelva (<c>dig +short app.example.com</c>). Caddy lo necesita para superar el reto de Let's Encrypt.",
      },
      { k: "file", name: "compose.yaml" },
      { k: "code", ref: "composeYaml" },
      { k: "p", t: "<c>Caddyfile</c> — sustituye el dominio y el correo:" },
      { k: "code", ref: "caddyfile" },
      { k: "p", t: "Levántalo todo:" },
      { k: "code", ref: "composeUp" },
      {
        k: "p",
        t: "En unos segundos Caddy obtiene e instala el certificado. Carga <c>https://app.example.com</c> — candado válido, respuesta JSON, y el <c>http://</c> plano ahora redirige a <c>https://</c>. La renovación es automática.",
      },
      { k: "h2", t: "10. Desplegar actualizaciones" },
      {
        k: "p",
        t: "Cambia tu código y luego reconstruye y renueva los contenedores:",
      },
      { k: "code", ref: "deployUpdate" },
      { k: "p", t: "Comandos útiles del día a día:" },
      { k: "code", ref: "dayToDay" },
      { k: "h2", t: "Por dónde seguir" },
      {
        k: "ul",
        items: [
          "Añade un paso <c>deploy</c> en CI que entre por SSH y ejecute los comandos del paso 10, o cambia a <c>docker context</c> y construye en local.",
          "Pon una base de datos real en su propio servicio con un volumen con nombre, y haz snapshots de volumen de <c>hetzner</c> de forma programada.",
          "Configura unattended-upgrades (<c>sudo dpkg-reconfigure -plow unattended-upgrades</c>) para que los parches de seguridad se apliquen solos.",
        ],
      },
      {
        k: "callout",
        label: "Nota",
        body: "Uso Hetzner para mis propios servidores y lo recomiendo aquí porque la relación precio-rendimiento en NVMe es la mejor que he medido. Hetzner cerró su programa de referidos en 2026, así que el enlace de arriba es un enlace normal sin seguimiento y nada de esta página genera comisión. Consulta la [divulgación](~/disclosure/) para el panorama completo.",
      },
    ],
  },
};
