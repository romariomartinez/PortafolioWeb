const btn = document.getElementById('button');
const sectionAll = document.querySelectorAll('section[id]');
const inputName = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');

/* ===== Loader =====*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})

/*===== Header =====*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('abajo', window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('not-active');
        document.querySelector('.nav_menu').classList.remove('active');
        document.querySelector('.nav_menu').classList.add('not-active');
    }
    else {
        this.classList.add('active');
        this.classList.remove('not-active');
        document.querySelector('.nav_menu').classList.remove('not-active');
        document.querySelector('.nav_menu').classList.add('active');
    }
});

/*===== Cambio de idioma =====*/
const changeLanguage = async language => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for(const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }
}

flagsElement.addEventListener('click', (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
})

/*===== class active por secciones =====*/
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sectionAll.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
        }
        else {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

/*===== Boton y función ir arriba =====*/
window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');
    }
    else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let currentSlide = 1; // Índice de la imagen actual

function openModal(imageFiles) {
    const modal = document.getElementById("myModal");
    const modalImagesContainer = document.getElementById("modalImagesContainer");

    // Limpia el contenedor de imágenes del modal
    modalImagesContainer.innerHTML = '';

    // Añade cada imagen al contenedor del modal
    imageFiles.forEach(imageFile => {
        const img = document.createElement('img');
        img.src = `./assets/images/${imageFile}`; // Cambia "ruta/a/" a la ruta real de tus imágenes
        img.classList.add('carousel-image'); // Clase para las imágenes
        modalImagesContainer.appendChild(img);
    });

    // Muestra la primera imagen
    showSlide(currentSlide);

    modal.style.display = "block"; // Muestra el modal
}

function showSlide(index) {
    const images = document.querySelectorAll('#modalImagesContainer img');

    // Asegúrate de que el índice esté dentro del rango
    if (index >= images.length) {
        currentSlide = 0; // Volver al inicio
    } else if (index < 0) {
        currentSlide = images.length - 1; // Volver al final
    } else {
        currentSlide = index;
    }

    // Oculta todas las imágenes y muestra la activa
    images.forEach((img, idx) => {
        img.classList.remove('active');
        if (idx === currentSlide) {
            img.classList.add('active');
        }
    });
}

function changeSlide(direction, event) {
    event.stopPropagation(); // Evita que el clic en los botones cierre el modal
    showSlide(currentSlide + direction);
}


function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none"; // Oculta el modal
}

// Cierra el modal cuando se hace clic en la 'X'
const closeBtn = document.querySelector('.close');
closeBtn.onclick = closeModal;



//./assets/images/

