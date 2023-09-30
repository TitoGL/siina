// Referencias a los elementos del DOM
let aguja = document.querySelector('.aguja');
let sismografo = document.querySelector('.sismografo');
let alertaSismica = document.querySelector('.alerta-sismica');

// Variables de control
let oscilacionAnterior = 50; // Posición central inicial
let incremento = 0.5; // Incremento inicial
let oscilacionMaxima = 1; // Oscilación máxima inicial
let contador = 0; // Contador para controlar el período de tiempo
let enCalma = true; // Estado para controlar si la oscilación está en "calma"
let vibrar = false; // Variable para controlar si la imagen debe vibrar

// Función que se ejecuta cada 50ms
setInterval(() => {
    // Si está en "calma", mantenemos la oscilación entre -1% y 1%
    if (enCalma) {
        oscilacionMaxima = 1;
        contador++;
        if (contador > 200) { // Después de 200 ciclos (aproximadamente 10 segundos), salimos del estado de "calma"
            enCalma = false;
            contador = 0;
        }
    } else {
        // Aumentamos la oscilación máxima gradualmente hasta 50 y luego la reducimos a 1
        if (oscilacionMaxima < 50 && incremento > 0) {
            oscilacionMaxima += 0.5;
        } else if (oscilacionMaxima > 1 && incremento < 0) {
            oscilacionMaxima -= 0.5;
        }

        // Si alcanza los límites de oscilación, invertimos el incremento y reiniciamos el contador y el estado de "calma"
        if (oscilacionMaxima >= 50 || oscilacionMaxima <= 1) {
            incremento = -incremento;
            enCalma = true;
            contador = 0;
        }
    }

    // Generamos una oscilación aleatoria dentro de los límites
    let oscilacionActual = 50 + (Math.random() * oscilacionMaxima * 2 - oscilacionMaxima);

    // Actualizamos la posición de la aguja
    aguja.style.top = `${oscilacionActual}%`;
    
    // Crear un segmento de línea para "pintar" la oscilación
    let segmento = document.createElement('div');
    segmento.style.position = 'absolute';
    segmento.style.right = '80px'; // Inicia donde termina la aguja
    segmento.style.top = `${Math.min(oscilacionAnterior, oscilacionActual)}%`; // Comienza en la posición menor entre anterior y actual
    segmento.style.width = '1px'; // Segmento delgado
    segmento.style.height = Math.abs(oscilacionActual - oscilacionAnterior) + '%'; // Altura basada en la diferencia de oscilaciones
    segmento.style.backgroundColor = '#000';
    sismografo.appendChild(segmento);

    // Mover todos los segmentos hacia la izquierda
    let segmentos = document.querySelectorAll('.sismografo > div');
    segmentos.forEach(seg => {
        seg.style.right = (parseFloat(seg.style.right) + 2) + 'px';
    });

    // Comprobar si la oscilación es alta
    if (oscilacionActual > 60 || oscilacionActual < 40) {
        vibrar = true;
        // Agregar un retraso de 3 segundos antes de activar la vibración
        setTimeout(() => {
            if (vibrar) {
                alertaSismica.style.animation = 'vibracion 0.1s infinite';
            }
        }, );
    } else {
        vibrar = false;
        alertaSismica.style.animation = 'none';
    }

    // Guardamos la oscilación actual para la próxima iteración
    oscilacionAnterior = oscilacionActual;

}, 50);


// Función de Slider para Monitoreo
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

leftArrow.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    updateSlider();
});

rightArrow.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide >= slides.length) currentSlide = 0;
    updateSlider();
});

function updateSlider() {
    const slider = document.querySelector('.slider');
    const slideWidth = slides[0].offsetWidth;
    const offset = -(slideWidth + 20) * currentSlide; // 20 is the margin
    slider.style.transform = `translateX(${offset}px)`;
}

// Función de fondo en Monitoreo para mapa claro
document.addEventListener("scroll", function() {
    let section = document.querySelector(".monitoreo");
    let sectionTop = section.offsetTop;
    let sectionHeight = section.offsetHeight;
    let offset = window.scrollY;
    let parallaxSpeed = 0.5;

    // Solo aplica el efecto parallax cuando el usuario está dentro de la sección "Monitoreo"
    if (offset > sectionTop && offset < (sectionTop + sectionHeight)) {
        let relativeOffset = offset - sectionTop;
        section.style.backgroundPosition = `0px ${1 - relativeOffset * parallaxSpeed}px`;
    }
});

//Sección Monitoreo: Función para detectar cuando estos elementos entran en la ventana de visualización 
document.addEventListener("scroll", function() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    fadeInElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);
        
        if (isVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
});

//Sección Blog
document.querySelectorAll('.blog-article button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Redireccionando al artículo completo...');
    });
});