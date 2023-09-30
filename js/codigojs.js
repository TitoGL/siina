document.addEventListener("DOMContentLoaded", function() {
    centerLogo();
    window.addEventListener("resize", centerLogo);
    window.addEventListener("scroll", applyZoomEffectOnScroll);
    window.addEventListener("scroll", applyZoomEffectOnMapaOnScroll);
    window.addEventListener("scroll", moveWavesOnScroll);
    window.addEventListener("scroll", moveEarthAndCityOnScroll); // Añade este listener
    window.addEventListener("scroll", moveAlertaOnScroll);
    window.addEventListener("scroll", applyParallaxEffectOnScroll);
    window.addEventListener("scroll", applyTitleParallaxEffectOnScroll);
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('scroll', handleFadeInOnScroll);
    
    // Agrega un event listener para el botón de menú tipo hamburguesa
    const menuToggleBtn = document.querySelector('.menu-toggle');
    menuToggleBtn.addEventListener('click', toggleMenu);
    cloneWaves();

// Función para centrar el logo en la barra de navegación
function centerLogo() {
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');
    const menuLeft = document.querySelector('.menu-left');
    const menuRight = document.querySelector('.menu-right');

    const navWidth = nav.offsetWidth;
    const logoWidth = logo.offsetWidth;
    const menuLeftWidth = menuLeft.offsetWidth;
    const menuRightWidth = menuRight.offsetWidth;

    const totalWidth = menuLeftWidth + logoWidth + menuRightWidth;
    const margin = (navWidth - totalWidth) / 2;

    logo.style.marginLeft = `${margin}px`;
}

// Función para activar/desactivar el menú en dispositivos móviles
function toggleMenu() {
    const menuContainer = document.querySelector('.menu-container');
    const menuLeft = document.querySelector('.menu-left');
    const menuRight = document.querySelector('.menu-right');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuContainer.classList.contains('active')) {
        menuContainer.classList.add('active');
        menuToggle.innerHTML = "&times;"; 

        while (menuLeft.firstChild) {
            menuContainer.appendChild(menuLeft.firstChild);
        }
        while (menuRight.firstChild) {
            menuContainer.appendChild(menuRight.firstChild);
        }
    } else {
        menuContainer.classList.remove('active');
        menuToggle.innerHTML = "&#9776;"; 

        while (menuContainer.firstChild) {
            menuLeft.appendChild(menuContainer.firstChild);
        }
        while (menuContainer.firstChild) {
            menuRight.appendChild(menuContainer.firstChild);
        }
    }
}

// Función para aplicar el efecto de zoom a onda_sismica.svg y hacer que letra_estarPreparadoEsLaMejorSolucion.svg aparezca gradualmente
function applyZoomEffectOnScroll() {
    let scrollPosition = window.scrollY;

    // Para onda_sismica.svg
    let waves = document.querySelectorAll(".wave");
    waves.forEach((wave, index) => {
        let delay = index * 500;
        let scaleValue = 1 + (scrollPosition - delay) * 0.01;
        if (scaleValue < 1) scaleValue = 1;
        wave.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;

        let opacityValue = 2 - scaleValue;
        if (opacityValue < 0) opacityValue = 0;
        wave.style.opacity = opacityValue;
    });

    // Para letra_estarPreparadoEsLaMejorSolucion.svg en escritorio
    if (window.innerWidth > 767) {
        let letra = document.getElementById("letra");
        let scaleValueLetra = 0.25 + scrollPosition * 0.0001;  
        if (scaleValueLetra > 0.5) scaleValueLetra = 0.5;
        letra.style.transform = `translate(-50%, -50%) scale(${scaleValueLetra})`;

        let opacityValueLetra = 1 - scrollPosition * 0.001;  
        if (opacityValueLetra < 0) opacityValueLetra = 0;  
        letra.style.opacity = opacityValueLetra;
    } else {
        // Aseguramos que la letra se muestre en celulares
        let letra = document.getElementById("letra");
        letra.style.opacity = 1;
        letra.style.transform = `translate(-50%, -50%) scale(1)`; // Establecemos una escala de 1 para dispositivos móviles
    }
     // Para alerta_sismica.svg
     let alerta = document.getElementById("alerta");
     let opacityValueAlerta = (scrollPosition - 1000) * 0.002;  // Retrasamos la aparición durante 2 segundos (2000ms)
     if (opacityValueAlerta < 0) opacityValueAlerta = 0;  // Aseguramos que no sea negativo
     if (opacityValueAlerta > 1) opacityValueAlerta = 1;  
     alerta.style.opacity = opacityValueAlerta;
    
}

// Función para clonar las ondas y crear el efecto de infinitud
function cloneWaves() {
    let waveContainer = document.querySelector(".hero");
    for (let i = 0; i < 10; i++) {  // Cambiamos el número de ondas clonadas a 10
        let clonedWave = document.getElementById("onda-sismica").cloneNode(true);
        clonedWave.id = "";
        clonedWave.classList.add("wave");
        waveContainer.appendChild(clonedWave);
    }
}

// Función para mover las ondas al hacer scroll
function moveWavesOnScroll() {
    let scrollPosition = window.scrollY;
    let waves = document.querySelectorAll(".wave");
    waves.forEach((wave, index) => {
        let delay = index * 500;  // Añadimos un retraso basado en el índice de la onda
        wave.style.transform = `translate(-50%, -50%) scale(${2 + (scrollPosition - delay) * 0.01})`;
    });
    // Aseguramos que tierra.svg no tenga movimiento
    let tierra = document.getElementById("tierra");
    tierra.style.position = 'fixed';
    tierra.style.top = '50%';
    tierra.style.left = '50%';
}

   // Inicia el movimiento después de 2 segundos para tierra.svg
   setTimeout(() => {
    document.getElementById("tierra").dataset.canMove = "true";
}, 1000);

// Inicia el movimiento después de 3 segundos para ciudad.svg
setTimeout(() => {
    document.getElementById("ciudad").dataset.canMove = "true";
}, 2000);
});

// Función para mover tierra.svg y ciudad.svg con el scroll
function moveEarthAndCityOnScroll() {
    let scrollPosition = window.scrollY;
    let tierra = document.getElementById("tierra");
    let ciudad = document.getElementById("ciudad");

    // Esto creará un movimiento oscilatorio de izquierda a derecha de 100px más rápido
    let movement = Math.sin(scrollPosition / 500) * 100; 

    if (tierra.dataset.canMove === "true") {
        tierra.style.transform = `translateX(calc(-50% + ${movement}px))`;
    }

    if (ciudad.dataset.canMove === "true") {
        ciudad.style.transform = `translateX(calc(-50% - ${movement}px))`;  // Movimiento opuesto para ciudad.svg
    }
}
// Función para mover alerta_sismica.svg cuando el usuario ingrese a la sección "productos"
function moveAlertaOnScroll() {
    let scrollPosition = window.scrollY;
    let productosPosition = document.querySelector('.productos').offsetTop;
    let alerta = document.getElementById("alerta");

    // Factor de desplazamiento
    let moveFactor = window.innerWidth <= 767 ? 0.25 : 0.55; // 0.25 para móviles, 0.55 para escritorio

    if (scrollPosition >= productosPosition) {
        let moveValue = (scrollPosition - productosPosition) * moveFactor;

        if (window.innerWidth <= 767) { // Si es un dispositivo móvil
            alerta.style.transform = `translateY(${moveValue}px)`;
        } else { // Si es escritorio
            if (moveValue > 350) moveValue = 350; // Limitamos el movimiento a 350px
            alerta.style.transform = `translateX(${moveValue}px) translateY(-50%)`;
        }
    } else {
        alerta.style.transform = `translateX(0px) translateY(-50%)`;
    }
}

// Función para aplicar el efecto parallax y movimiento horizontal a mexico_mapa.svg
function applyParallaxEffectOnScroll() {
    let scrollPosition = window.scrollY;
    let productosPosition = document.querySelector('.productos').offsetTop;
    let mexicoMap = document.getElementById("mexico-map");

    if (scrollPosition >= productosPosition) {
        let moveValueVertical = (scrollPosition - productosPosition) * 0.5; // Ajusta el factor 0.5 según la intensidad del efecto parallax vertical deseado
        let moveValueHorizontal = (scrollPosition - productosPosition) * -0.5; // Ajusta el factor -0.5 para mover la imagen hacia la izquierda
        mexicoMap.style.transform = `translate(calc(-50% + ${moveValueHorizontal}px), calc(-50% + ${moveValueVertical}px))`;
    } else {
        mexicoMap.style.transform = `translate(-50%, -50%)`;
    }
}
// Función para aplicar el efecto parallax y hacer que el título, subtítulo y texto aparezcan gradualmente
function applyTitleParallaxEffectOnScroll() {
    let scrollPosition = window.scrollY;
    let productosPosition = document.querySelector('.productos').offsetTop;
    let tituloProductos = document.querySelector('.titulo-productos');
    let subtituloProductos = document.querySelector('.subtitulo-productos');
    let textoProductos = document.querySelector('.texto-productos');  // Referencia al texto

    if (scrollPosition >= productosPosition) {
        let moveValue = (scrollPosition - productosPosition) * 0.9; // Efecto parallax
        let opacityValue = (scrollPosition - productosPosition) * 0.01; 
        if (opacityValue > 1) opacityValue = 1; 

        tituloProductos.style.transform = `translate(-50%, calc(-50% + ${moveValue}px))`;
        tituloProductos.style.opacity = opacityValue;

        subtituloProductos.style.transform = `translate(-50%, calc(-50% + ${moveValue}px))`;
        subtituloProductos.style.opacity = opacityValue;

        textoProductos.style.transform = `translate(-50%, calc(-50% + ${moveValue}px))`;  // Mismo movimiento para el texto
        textoProductos.style.opacity = opacityValue;  // Mismo efecto de aparición para el texto
    } else {
        tituloProductos.style.transform = `translate(-50%, -50%)`;
        tituloProductos.style.opacity = 0;

        subtituloProductos.style.transform = `translate(-50%, -50%)`;
        subtituloProductos.style.opacity = 0;

        textoProductos.style.transform = `translate(-50%, -50%)`;  // Reset del movimiento del texto
        textoProductos.style.opacity = 0;  // Reset de la opacidad del texto
    }
}
// Función Acordeon
function toggleAcordeon(btn) {
    var content = btn.nextElementSibling;
  
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  // Función para manejar el efecto parallax en logo_naranja.svg
function handleParallax() {
    // Obtener la cantidad de scroll
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Cambiar la posición de la imagen en relación con el scroll
    document.querySelector('.logo-naranja').style.transform = 'translateY(' + (-scrollTop * 0.5) + 'px)';
}
// Difuminado de acordeon
function handleFadeInOnScroll() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Para la imagen caracteristicas.svg
    const img = document.querySelector('.caracteristicas-img');
    const imgPosition = img.getBoundingClientRect().top + scrollY;
    const imgVisibilityPoint = imgPosition - windowHeight + 100; // Ajusta el 100 según cuándo quieres que comience a aparecer

    if (scrollY > imgVisibilityPoint) {
        let opacity = (scrollY - imgVisibilityPoint) / 150; // Ajusta el 300 según la velocidad de aparición
        if (opacity > 1) opacity = 1;
        img.style.opacity = opacity;
    }

    // Para todos los botones con toggleAcordeon
    const buttons = document.querySelectorAll('button[onclick="toggleAcordeon(this)"]');
    buttons.forEach(button => {
        const btnPosition = button.getBoundingClientRect().top + scrollY;
        const btnVisibilityPoint = btnPosition - windowHeight + 100; // Ajusta el 100 según cuándo quieres que comience a aparecer

        if (scrollY > btnVisibilityPoint) {
            let opacity = (scrollY - btnVisibilityPoint) / 150; // Ajusta el 300 según la velocidad de aparición
            if (opacity > 1) opacity = 1;
            button.style.opacity = opacity;
        }
    });
}
// Función para aplicar el efecto de zoom a mapa_naranja.svg
function applyZoomEffectOnMapaOnScroll() {
    let scrollPosition = window.scrollY;
    let diferenciacionPosition = document.querySelector('.diferenciacion').offsetTop;
    let mapa = document.querySelector(".mapa-naranja-img");

    if (scrollPosition >= diferenciacionPosition) {
        let scaleValue = 1 + (scrollPosition - diferenciacionPosition) * 0.005; // Ajusta este valor según la velocidad de zoom que desees
        if (scaleValue > 1.5) scaleValue = 1.5; // Limitamos el zoom a 1.5 veces
        mapa.style.transform = `scale(${scaleValue})`;
    } else {
        mapa.style.transform = `scale(1)`;
    }
}