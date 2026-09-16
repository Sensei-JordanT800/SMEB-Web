# SMEB — Sitio web informativo

Sitio estático (HTML5 + CSS3 + JavaScript, sin frameworks ni backend) para el
proyecto SMEB (Sistema de Monitoreo de Embriones Bovinos), InnovaTecNM 2026.
Pensado para visitantes que llegan mediante un código QR desde el stand del
proyecto — mobile-first, ligero y sin dependencias externas.

## Estructura de archivos

```
smeb-web/
├── index.html          → todo el contenido y las 14 secciones del sitio
├── css/
│   └── styles.css      → variables de diseño (color, tipografía, espaciado) y estilos
├── js/
│   └── script.js       → menú móvil, animaciones de entrada, contadores, mapa anatómico
├── assets/
│   ├── images/         → fotografías generales (ej. hero)
│   ├── thermal/        → capturas termográficas reales (opcional)
│   ├── dashboard/       → captura de pantalla real del dashboard
│   ├── logos/          → logotipo de SMEB / institucionales
│   └── icons/          → favicon
└── README.md           → este archivo
```

Cada carpeta dentro de `assets/` tiene un archivo `LEEME.md` que explica
exactamente qué imagen va ahí y en qué parte de `index.html` se usa.

## Cómo ejecutar el sitio localmente

No requiere instalación de dependencias. Dos opciones:

**Opción 1 — abrir directamente**
Haz doble clic en `index.html` (funciona, pero algunos navegadores restringen
peticiones locales; si algo no carga, usa la opción 2).

**Opción 2 — servidor local simple (recomendado)**
Desde la carpeta `smeb-web/`:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador.

## Cómo publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (o usa uno existente) y sube el
   contenido de esta carpeta a la raíz del repositorio:
   ```bash
   git init
   git add .
   git commit -m "Sitio SMEB"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages**.
3. En "Source", selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. GitHub Pages publicará el sitio en unos minutos en:
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`
5. Genera un código QR que apunte a esa URL (cualquier generador de QR gratuito
   sirve) y colócalo en el stand. El QR debe llevar a la página de inicio, no
   a una sección interna, tal como pide el brief.

No se requiere backend, base de datos ni proceso de build: es HTML/CSS/JS puro.

## Dónde modificar cada cosa

- **Textos:** directamente en `index.html`. Cada sección tiene un comentario
  `<!-- SECCION NN — NOMBRE -->` que indica dónde empieza.
- **Colores:** en `css/styles.css`, dentro de `:root` (primeras líneas del
  archivo). Todos los colores del sitio están centralizados ahí.
- **Tipografía:** también en `:root`, variables `--font-display` y
  `--font-body`.
- **Enlaces al dashboard:** aparecen en tres lugares de `index.html` (hero,
  sección "Prototipo" y cierre). Busca `smeb.alexismorfinservices.com` para
  encontrarlos todos si la URL cambia.
- **Imágenes:** ver los archivos `LEEME.md` dentro de cada subcarpeta de
  `assets/`.
- **Navegación:** lista `<ul class="nav-links">` en la parte superior de
  `index.html`.

## Assets que todavía deben sustituirse o agregarse

- [ ] Fotografía real para el hero (`assets/images/cow-01.webp`)
- [ ] Captura de pantalla real del dashboard (`assets/dashboard/dashboard-main.webp`)
- [ ] Favicon (`assets/icons/favicon.ico`)
- [ ] Logotipo de SMEB y/o institucional (`assets/logos/`), si el equipo
      decide incluirlo — actualmente no se usa ningún logotipo en el sitio
- [ ] Capturas termográficas reales (opcional, `assets/thermal/`)
- [ ] URLs reales de Instagram/Facebook, si se van a publicar (hay un bloque
      comentado listo en la sección de cierre de `index.html`)
- [ ] Imagen para Open Graph (`og:image`, comentada en el `<head>`)

Mientras estos archivos no existan, el sitio muestra automáticamente una
ilustración o boceto de referencia en su lugar (nunca una fotografía generada
que aparente ser real) para que la maquetación se vea completa mientras se
consiguen los recursos definitivos.

## Datos que quedaron marcados como placeholder o pendientes de confirmación

- **Coordenadas del mapa anatómico interactivo** (sección "¿Qué observamos?"):
  son aproximadas sobre una ilustración esquemática propia, no sobre un
  dibujo anatómico validado por el equipo. Si tienen una referencia visual
  más precisa, se puede ajustar fácilmente (las posiciones están en
  `index.html`, como `style="left: X%; top: Y%;"` en cada botón
  `.anatomy-hotspot`).
- **Redes sociales:** no se incluyó ningún enlace porque el brief no
  proporcionó URLs reales; el bloque está listo pero comentado.
- **Cifras económicas:** no se incluyeron en ninguna sección, conforme al
  brief (sección 5 del brief: "Información que no debe aparecer").
- **Equipo:** no se incluyó ninguna sección de equipo, conforme al brief
  (sección 10 del brief: "NO incluir una sección pública del equipo").

## Decisiones de diseño importantes

- **Sistema de tres estados (Demostrado / Meta / Proyección):** implementado
  como un componente reutilizable (`.status-badge` en `css/styles.css`) con
  color y punto distintivo para cada variante. Se usa de forma consistente
  en cualquier sección donde aparece una cifra o afirmación sobre el estado
  del proyecto, incluyendo una variante con texto personalizado
  ("Arquitectura propuesta") en la sección "El viaje del dato", tal como
  pide el brief.
- **Sin fuentes externas:** la tipografía usa pilas de fuentes del sistema
  operativo (`Georgia` para títulos, fuente del sistema para texto) en vez de
  Google Fonts u otro servicio externo, para no agregar peticiones de red
  adicionales en conexiones móviles desde el stand.
- **Una sola paleta con propósito:** los colores de termografía (azul/naranja/
  rojo) se reservan exclusivamente para contenido relacionado con temperatura
  o datos térmicos (el "viaje del dato" y los puntos del mapa anatómico), no
  se usan como decoración general del sitio.
- **Mapa anatómico accesible:** los puntos interactivos son botones reales
  (no solo zonas con `:hover`), funcionan con teclado y con toque en móvil,
  y cada uno tiene texto alternativo para lectores de pantalla.
- **Animaciones:** limitadas a una aparición suave al hacer scroll y a los
  contadores numéricos de la sección "Resultados"; todas respetan
  `prefers-reduced-motion` y se desactivan si el visitante así lo configura
  en su dispositivo.
- **Sin librerías ni build step:** JavaScript vainilla, sin dependencias en
  `package.json` (no existe ese archivo porque no hace falta), para que el
  sitio se pueda publicar directamente en GitHub Pages sin proceso de
  compilación.
