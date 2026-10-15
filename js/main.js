/**
 * CV Moderno - JavaScript
 * Interactividad, animaciones y funcionalidades
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavbar();
    initScrollAnimations();
    initTypingEffect();
    initSkillBars();
    initScrollToTop();
    initSmoothScroll();
    initActiveNavLink();
});

// THEME TOGGLE
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    const icon = themeBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    themeBtn.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// NAVBAR
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.background = getComputedStyle(document.body).getPropertyValue('--bg-primary') + 'ee';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = '';
            navbar.style.boxShadow = '';
        }
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// SCROLL ANIMATIONS
function initScrollAnimations() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skills-category')) animateSkillBars();
                if (entry.target.classList.contains('stat-card')) animateCounter(entry.target);
            }
        });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.section-header, .timeline-item, .education-card, .skills-category, .certification-card, .contact-item, .about-stats, .about-text, .stat-card');
    animatedElements.forEach(el => { el.classList.add('fade-in'); observer.observe(el); });
}

// TYPING EFFECT
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    const texts = [typingElement.textContent, 'Desarrollador Full Stack', 'Especialista Odoo', 'Ingeniero de Software'];
    let textIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;
    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        setTimeout(type, typingSpeed);
    }
    setTimeout(type, 1000);
}

// SKILL BARS
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0';
        bar.dataset.target = progress;
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const target = bar.dataset.target;
            if (target) bar.style.width = target + '%';
        }, index * 100);
    });
}

// COUNTER
function animateCounter(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    if (!numberElement) return;
    const finalValue = parseInt(numberElement.textContent);
    if (isNaN(finalValue)) return;
    let currentValue = 0;
    const duration = 2000;
    const increment = finalValue / (duration / 16);
    function updateCounter() {
        currentValue += increment;
        if (currentValue < finalValue) {
            numberElement.textContent = Math.floor(currentValue);
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = finalValue;
        }
    }
    updateCounter();
}

// SCROLL TO TOP
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) scrollBtn.classList.add('visible');
        else scrollBtn.classList.remove('visible');
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// SMOOTH SCROLL
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({ top: target.offsetTop - navbarHeight, behavior: 'smooth' });
            }
        });
    });
}

// ACTIVE NAV LINK
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionId = section.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) link.classList.add('active');
                });
            }
        });
    });
}

// PARALLAX
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) { func.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); }
    };
}
window.addEventListener('scroll', throttle(() => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero && scrolled < hero.offsetHeight) hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
}, 10));

// ============================================================
// PDF DOWNLOAD - Generar PDF con JavaScript puro (jspdf)
// ============================================================
function downloadPDF() {
    const btn = document.querySelector('button[onclick="downloadPDF()"]');
    if (!btn) { console.error('Botón no encontrado'); return; }
    
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
    btn.disabled = true;
    
    // Cargar jsPDF dinámicamente
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => generatePDF(btn, originalText);
    script.onerror = () => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('Error al cargar librería. Usa Ctrl+P para imprimir.');
    };
    document.head.appendChild(script);
}

function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}

async function generatePDF(btn, originalText) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const marginLeft = 15;
        const marginTop = 15;
        const pageWidth = 210;
        const pageHeight = 297;
        const contentWidth = pageWidth - marginLeft * 2;
        let y = marginTop;
        
        // Colores
        const primaryColor = '#6366f1';
        const textColor = '#1f2937';
        const grayColor = '#6b7280';
        
        // ==================== HEADER CON FOTO ====================
        const photo = await loadImage('img/Para_cv.jpg');
        let textCenterX = pageWidth / 2;
        const photoH = 30;
        if (photo) {
            const photoW = 18;
            doc.addImage(photo, 'JPEG', marginLeft, marginTop, photoW, photoH);
            doc.setDrawColor(primaryColor);
            doc.setLineWidth(0.5);
            doc.rect(marginLeft, marginTop, photoW, photoH);
            textCenterX = (marginLeft + photoW + 5 + (pageWidth - marginLeft)) / 2;
        }
        
        doc.setFontSize(22);
        doc.setTextColor(textColor);
        doc.setFont('helvetica', 'bold');
        doc.text('José Ángel Ávila Cruz', textCenterX, y + 5, { align: 'center' });
        y += 10;
        
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'normal');
        doc.text('Desarrollador de Software Senior', textCenterX, y, { align: 'center' });
        y += 7;
        
        doc.setFontSize(10);
        doc.setTextColor(grayColor);
        doc.text('angelip56@gmail.com | +52 55 1938 5839', textCenterX, y, { align: 'center' });
        y += 4;
        doc.text('Tlalnepantla de Baz, Estado de México', textCenterX, y, { align: 'center' });
        y += 6;
        
        // Línea divisoria por debajo del encabezado y la foto
        const dividerY = photo ? Math.max(y, marginTop + photoH + 3) : y;
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(marginLeft, dividerY, pageWidth - marginLeft, dividerY);
        y = dividerY + 8;
        
        // ==================== PERFIL ====================
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('PERFIL PROFESIONAL', marginLeft, y);
        y += 6;
        
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(marginLeft, y, pageWidth - marginLeft, y);
        y += 5;
        
        doc.setFontSize(10);
        doc.setTextColor(textColor);
        doc.setFont('helvetica', 'normal');
        const perfilParrafos = [
            'Desarrollador de Software Senior con experiencia en el diseño, desarrollo, integración y despliegue de soluciones empresariales, APIs y sistemas basados en arquitecturas de microservicios. Especializado en desarrollo backend con Python, FastAPI y Flask, integración de bases de datos relacionales y configuración de servicios en la nube mediante Amazon Web Services (AWS).',
            'Experiencia en el desarrollo de aplicaciones empresariales para la gestión de procesos administrativos, facturación electrónica CFDI 4.0, Carta Porte, seguimiento de operaciones, administración de gastos y automatización de flujos de trabajo. Experiencia en integración con servicios del SAT, procesamiento documental mediante OCR, automatizaciones con WhatsApp e incorporación de funcionalidades de inteligencia artificial.',
            'Trayectoria complementaria en desarrollo y personalización de módulos Odoo, procesamiento de información, visión por computadora y soluciones interactivas 3D. Enfoque en la resolución de problemas técnicos, integración de sistemas, mantenibilidad del software y desarrollo de soluciones alineadas con las necesidades operativas del negocio.'
        ];
        perfilParrafos.forEach(parrafo => {
            const lineas = doc.splitTextToSize(parrafo, contentWidth);
            doc.text(lineas, marginLeft, y);
            y += lineas.length * 5 + 3;
        });
        y += 2;
        
        // ==================== EXPERIENCIA ====================
        if (y > pageHeight - 60) { doc.addPage(); y = marginTop; }
        
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('EXPERIENCIA PROFESIONAL', marginLeft, y);
        y += 6;
        
        doc.setDrawColor(200, 200, 200);
        doc.line(marginLeft, y, pageWidth - marginLeft, y);
        y += 5;
        
        const liderTecnicoResp = [
            'Liderazgo y coordinación del equipo de desarrollo.',
            'Definición de arquitectura, estándares y buenas prácticas de código.',
            'Planificación, estimación y seguimiento de los proyectos.',
            'Revisión de código, mentoría y aseguramiento de la calidad.'
        ];
        const backendResp = [
            'Desarrollo backend con Python y frameworks web (FastAPI / Flask).',
            'Diseño e integración de bases de datos relacionales (PostgreSQL / MySQL).',
            'Construcción y documentación de APIs y servicios.',
            'Optimización, pruebas y mantenimiento del software.'
        ];
        
        const experiencias = [
            { cargo: 'Líder Técnico', empresa: 'Meustech', periodo: '2026', descripcion: 'Pedimento de importación con seguimiento aduanero, viáticos con interfaz de arrastrar y soltar, análisis de documentos con OCR, vacaciones, facturación CFDI 4.0 y Carta Porte. Arquitectura de microservicios en AWS Fargate (ECS), Python y FastAPI, PostgreSQL e integración con servicios del SAT.', responsabilidades: liderTecnicoResp },
            { cargo: 'Líder Técnico', empresa: 'Precitools', periodo: '2026', descripcion: 'Administración de gastos con reportes y aprobaciones, atención al cliente con chatbot y WhatsApp con integraciones de IA, facturación CFDI 4.0 y Carta Porte. Microservicios en AWS (Fargate, ECS y Lambda) con APIs en FastAPI y Flask.', responsabilidades: liderTecnicoResp },
            { cargo: 'Desarrollador Odoo', empresa: 'Tutum Technology', periodo: '2023 - 2025', descripcion: 'Módulos Odoo para proyectos empresariales: Administrador de archivos, Fibra Infraex, Administrador de personal Les Croissants. Soluciones personalizadas con Python y PostgreSQL.', responsabilidades: liderTecnicoResp },
            { cargo: 'Líder Técnico', empresa: 'Freelance / Proyectos Independientes', periodo: '2021 - 2023', descripcion: 'Aplicaciones de visualización de producto con Unity y Godot para e-commerce, con experiencias 3D interactivas.', responsabilidades: liderTecnicoResp },
            { cargo: 'Líder Técnico', empresa: 'Odoo Mexico', periodo: '2016 - Presente', descripcion: 'Addons y módulos completos, sistemas de facturación electrónica (CFDI) y descarga masiva de XML del SAT, con optimización de procesos de negocio.', responsabilidades: liderTecnicoResp },
            { cargo: 'Líder Técnico', empresa: 'Meus Technology SA de CV', periodo: '2021 - 2022', descripcion: 'Facturación electrónica y descarga masiva de XML del SAT, IA para análisis de video en tiempo real, Machine Learning, visión por computadora con OpenCV y modelos con TensorFlow.', responsabilidades: liderTecnicoResp },
            { cargo: 'Líder Técnico', empresa: 'Raj Digital SA de CV', periodo: '2019 - 2023', descripcion: 'Sistemas en la nube con arquitectura de microservicios, facturación, gestión de viáticos, OCR y automatizaciones en WhatsApp. Clústeres, Docker, Kubernetes y servicios AWS (Fargate, ECS, Lambda y S3).', responsabilidades: liderTecnicoResp },
            { cargo: 'Desarrollador Backend Python', empresa: 'DimexPDG', periodo: '2014 - 2018', descripcion: 'Cálculo de rotación en engranes industriales, análisis de recursos humanos y contabilidad con reportes para toma de decisiones.', responsabilidades: backendResp }
        ];
        
        experiencias.forEach(exp => {
            if (y > pageHeight - 40) { doc.addPage(); y = marginTop; }
            
            doc.setFontSize(10);
            doc.setTextColor(textColor);
            doc.setFont('helvetica', 'bold');
            doc.text(exp.cargo, marginLeft, y);
            
            doc.setFontSize(9);
            doc.setTextColor(primaryColor);
            const periodoWidth = doc.getTextWidth(exp.periodo);
            doc.text(exp.periodo, pageWidth - marginLeft - periodoWidth, y);
            y += 4;
            
            doc.setFontSize(9);
            doc.setTextColor(grayColor);
            doc.setFont('helvetica', 'normal');
            doc.text(exp.empresa, marginLeft, y);
            y += 4;
            
            doc.setFontSize(9);
            doc.setTextColor(textColor);
            const descLines = doc.splitTextToSize(exp.descripcion, contentWidth);
            doc.text(descLines, marginLeft, y);
            y += descLines.length * 4 + 2;
            
            if (exp.responsabilidades) {
                doc.setFontSize(8.5);
                exp.responsabilidades.forEach(resp => {
                    if (y > pageHeight - 20) { doc.addPage(); y = marginTop; }
                    const respLines = doc.splitTextToSize('• ' + resp, contentWidth - 4);
                    doc.text(respLines, marginLeft + 4, y);
                    y += respLines.length * 4;
                });
            }
            y += 5;
        });
        
        // ==================== HABILIDADES ====================
        if (y > pageHeight - 50) { doc.addPage(); y = marginTop; }
        
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('HABILIDADES TÉCNICAS', marginLeft, y);
        y += 6;
        
        doc.setDrawColor(200, 200, 200);
        doc.line(marginLeft, y, pageWidth - marginLeft, y);
        y += 5;
        
        const skills = ['Python', 'JavaScript', 'Java', 'HTML5/CSS3', 'Odoo', 'FastAPI', 'Flask', 'Django', 'Microservicios', 'SQLAlchemy', 'Arquitectura Hexagonal', 'OpenCV', 'TensorFlow', 'Unity', 'Godot', 'GoLand', 'Mojo', 'PostgreSQL', 'MySQL', 'Redes', 'Telefonía IP', 'Antenas', 'Podman', 'Docker', 'Kubernetes', 'AWS', 'AWS Fargate', 'ECS', 'Lambda', 'Google Cloud Platform', 'Oracle Cloud', 'Consola GCP'];
        
        let col = 0;
        let row = 0;
        const colWidth = contentWidth / 2;
        
        doc.setFontSize(9);
        doc.setTextColor(textColor);
        
        skills.forEach((skill, index) => {
            const x = marginLeft + (col * colWidth);
            doc.text('• ' + skill, x, y + (row * 5));
            col++;
            if (col >= 2) { col = 0; row++; }
        });
        
        y += (Math.ceil(skills.length / 2) + 1) * 5 + 10;
        
        // ==================== FORMACIÓN ====================
        if (y > pageHeight - 50) { doc.addPage(); y = marginTop; }
        
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('FORMACIÓN ACADÉMICA', marginLeft, y);
        y += 6;
        
        doc.setDrawColor(200, 200, 200);
        doc.line(marginLeft, y, pageWidth - marginLeft, y);
        y += 5;
        
        const formacion = [
            { titulo: 'Maestría en Ciencias de la Computación', institucion: 'Universidad (En curso)', periodo: '2023 - Presente' },
            { titulo: 'Ingeniería en Tecnología de la Información', institucion: 'Universidad Tecnológica Fidel Velázquez', periodo: '2012 - 2018' },
            { titulo: 'Técnico Superior Universitario (Redes)', institucion: 'Universidad Tecnológica Fidel Velázquez', periodo: '2012 - 2014' }
        ];
        
        formacion.forEach(f => {
            doc.setFontSize(10);
            doc.setTextColor(textColor);
            doc.setFont('helvetica', 'bold');
            doc.text(f.titulo, marginLeft, y);
            y += 4;
            
            doc.setFontSize(9);
            doc.setTextColor(grayColor);
            doc.setFont('helvetica', 'normal');
            doc.text(f.institucion + ' | ' + f.periodo, marginLeft, y);
            y += 6;
        });
        
        // ==================== IDIOMAS ====================
        y += 5;
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('IDIOMAS', marginLeft, y);
        y += 6;
        
        doc.setDrawColor(200, 200, 200);
        doc.line(marginLeft, y, pageWidth - marginLeft, y);
        y += 5;
        
        doc.setFontSize(10);
        doc.setTextColor(textColor);
        doc.setFont('helvetica', 'normal');
        doc.text('Inglés: Técnico (Nivel Intermedio)', marginLeft, y);
        
        // Guardar PDF
        doc.save('CV_Jose_Angel_Avila_Cruz.pdf');
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        
    } catch (error) {
        console.error('Error generando PDF:', error);
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('Error al generar PDF. Usa Ctrl+P para imprimir y guarda como PDF.');
    }
}

// Alternativa: imprimir
function printCV() {
    window.print();
}