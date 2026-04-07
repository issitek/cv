# CV Web Moderno 🚀

Un sitio web de CV profesional con diseño moderno, animaciones suaves, modo oscuro/claro y totalmente responsive.

## 📁 Estructura del Proyecto

```
cv/
├── index.html          # Estructura principal del CV
├── css/
│   └── styles.css      # Estilos modernos con CSS variables
├── js/
│   └── main.js         # Interactividad y animaciones
├── server.py           # Servidor Python (alternativa)
├── server.pl           # Servidor Perl (recomendado)
├── CV.pdf              # Tu CV original
└── README.md           # Este archivo
```

## 🎨 Características

- ✅ **Diseño moderno y minimalista** con gradientes y sombras suaves
- 🌓 **Modo oscuro/claro** toggle interactivo con persistencia
- 📱 **Totalmente responsive** para móvil, tablet y desktop
- ✨ **Animaciones al scroll** usando Intersection Observer
- ⌨️ **Efecto de typing** en el subtítulo del hero
- 📊 **Barras de habilidades** con animación de progreso
- 🔢 **Contadores animados** para estadísticas
- 🎯 **Navegación suave** y menú hamburguesa para móvil
- 🔝 **Botón volver arriba** que aparece al hacer scroll

## 🚀 Instrucciones para Completar tu CV

### Paso 1: Editar la Información Personal

Abre `index.html` y reemplaza los marcadores `[...]` con tu información real del PDF:

#### Sección Hero (Inicio)
```html
<h1 class="hero-title">
    <span class="name">[TU NOMBRE COMPLETO]</span>
</h1>
<h2 class="hero-subtitle">
    <span class="typing-text">[TU CARGO / PROFESIÓN]</span>
</h2>
<p class="hero-description">
    [COPIA AQUÍ TU RESUMEN PROFESIONAL]
</p>
```

#### Sección Sobre Mí
```html
<div class="stat-card">
    <span class="stat-number">[NÚMERO]</span>  <!-- Ej: 5 -->
    <span class="stat-label">Años de Experiencia</span>
</div>

<div class="info-item">
    <i class="fas fa-phone"></i>
    <span>[TU TELÉFONO]</span>
</div>
```

#### Sección Experiencia
```html
<div class="timeline-item">
    <h3 class="timeline-title">[CARGO]</h3>
    <h4 class="timeline-company">[EMPRESA]</h4>
    <p class="timeline-description">
        [DESCRIPCIÓN DE FUNCIONES]
    </p>
</div>
```

#### Sección Habilidades
```html
<div class="skill-item">
    <span class="skill-name">[NOMBRE HABILIDAD]</span>
    <span class="skill-percentage">[X]%</span>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="[X]"></div>
    </div>
</div>
```

### Paso 2: Agregar tu Foto (Opcional)

1. Coloca tu foto en el directorio raíz (ej: `foto.jpg`)
2. En `index.html`, reemplaza el placeholder:
```html
<div class="image-placeholder">
    <i class="fas fa-user"></i>
    <span>Tu Foto</span>
</div>
```
Con:
```html
<img src="foto.jpg" alt="Tu Nombre" class="profile-photo">
```

### Paso 3: Actualizar Links de Redes Sociales

Busca y actualiza los `href="#"` en:
- Hero section (hero-social)
- Footer (footer-social)
- Contacto

## ▶️ Ejecutar el Servidor

### Opción 1: Servidor Perl (Recomendado - Ya disponible)
```bash
cd /home/dev/share/html/cv
perl server.pl
```
Visita: http://localhost:8000

### Opción 2: Servidor Python (Si tienes Python instalado)
```bash
python3 server.py
```
O:
```bash
python server.py
```
Visita: http://localhost:8000

### Opción 3: Servidor HTTP simple (Python one-liner)
```bash
cd /home/dev/share/html/cv
python3 -m http.server 8000
```

### Opción 4: Abrir Directamente
Puedes abrir `index.html` directamente en tu navegador, aunque algunas características pueden no funcionar igual.

## 🛠️ Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #6366f1;    /* Indigo - cambia a tu color favorito */
    --secondary-color: #10b981;  /* Emerald */
    --accent-color: #f59e0b;     /* Amber */
}
```

### Cambiar Fuentes
El CV usa Google Fonts (Inter y Poppins). Puedes cambiarlas en el `<head>` de `index.html`.

### Agregar/Quitar Secciones
El HTML está estructurado semanticamente. Puedes:
- Agregar más items de experiencia copiando `.timeline-item`
- Agregar más habilidades copiando `.skill-item`
- Agregar más certificaciones copiando `.certification-card`

## 📱 Vista Previa

El CV incluye:
- **Navegación fija** que cambia al hacer scroll
- **Menú hamburguesa** en móviles
- **Animaciones suaves** al hacer hover
- **Transiciones** entre tema claro y oscuro
- **Efecto parallax** en la sección hero

## 🌐 Navegadores Soportados

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## 📄 Licencia

Este CV es de uso personal. Personalízalo libremente para tu uso profesional.

---

**¿Necesitas ayuda?** Abre el archivo `index.html` en un editor de texto y busca los corchetes `[...]` para encontrar rápidamente qué reemplazar.
