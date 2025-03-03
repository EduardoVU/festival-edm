let imagenIndex;

document.addEventListener('DOMContentLoaded', () => {
    navegacionFija();
    createGaleria();
    resaltarEnlace();
})

const navegacionFija = () => {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', () => {
        const { bottom } = sobreFestival.getBoundingClientRect();
        if (bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

const resaltarEnlace = () => {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');
        let actual;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('href') === `#${actual}`) {
                link.classList.add('active');
            }
        })
    })
}

const createGaleria = () => {
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('PICTURE');
        const contenedor = document.createElement('DIV');
        imagen.innerHTML = `
        <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
    `;
        contenedor.classList.add('galeria-contenedor');

        contenedor.appendChild(imagen)

        imagen.onclick = () => {
            mostrarImagen(i);
        }
        galeria.appendChild(contenedor);
    }
}

const mostrarImagen = (i) => {
    imagenIndex = i;
    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;

    // imagen.src = `src/img/gallery/full/${i}.jpg`;
    // imagen.alt = 'Imagen Galería'


    const modal = document.createElement('DIV');
    modal.classList.add('modal');

    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar')

    cerrarModalBtn.onclick = (e) => {
        e.stopPropagation();
        cerrarModal();
    }
    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    modal.onclick = cerrarModal;
    const body = document.querySelector('body');

    body.removeEventListener('keydown', handleKeyDown);
    body.addEventListener('keydown', handleKeyDown);
    body.classList.add('overflow-hidden');
    body.append(modal);
}

const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
        cerrarModal();
    } else if (e.code === 'ArrowRight') {
        imagenIndex = Math.min(++imagenIndex, 16);
        nextImage()
    } else if (e.code === 'ArrowLeft') {
        imagenIndex = Math.max(--imagenIndex, 1);
        nextImage()
    }
}

const nextImage = () => {
    const imagen = document.querySelector('.modal img');
    imagen.src = `src/img/gallery/full/${imagenIndex}.jpg`;
}

const cerrarModal = () => {
    const modal = document.querySelector('.modal');
    if (!modal) return;
    modal.classList.add('fade-out');
    const body = document.querySelector('body');

    body.removeEventListener('keydown', handleKeyDown)

    setTimeout(() => {
        body.classList.remove('overflow-hidden');
        modal?.remove();
    }, 500);
}