'use strict';

document.addEventListener('DOMContentLoaded', () => {

const galleryItems =
    document.querySelectorAll(
        '.gallery-editorial-grid img'
    );

if (!galleryItems.length) return;

let currentIndex = 0;

/* ================================
   CREATE LIGHTBOX
================================= */

const lightbox =
    document.createElement('div');

lightbox.className =
    'gallery-lightbox';

lightbox.innerHTML = `
    <button
        class="gallery-lightbox-close"
        type="button"
        aria-label="Fermer"
    >
        <i class="fas fa-times"></i>
    </button>

    <button
        class="gallery-lightbox-prev"
        type="button"
        aria-label="Image précédente"
    >
        <i class="fas fa-chevron-left"></i>
    </button>

    <div class="gallery-lightbox-content">

        <img
            class="gallery-lightbox-image"
            src=""
            alt=""
        >

        <div class="gallery-lightbox-caption"></div>

    </div>

    <button
        class="gallery-lightbox-next"
        type="button"
        aria-label="Image suivante"
    >
        <i class="fas fa-chevron-right"></i>
    </button>

    <div class="gallery-lightbox-counter"></div>
`;

document.body.appendChild(lightbox);

const image =
    lightbox.querySelector(
        '.gallery-lightbox-image'
    );

const caption =
    lightbox.querySelector(
        '.gallery-lightbox-caption'
    );

const counter =
    lightbox.querySelector(
        '.gallery-lightbox-counter'
    );

const closeButton =
    lightbox.querySelector(
        '.gallery-lightbox-close'
    );

const prevButton =
    lightbox.querySelector(
        '.gallery-lightbox-prev'
    );

const nextButton =
    lightbox.querySelector(
        '.gallery-lightbox-next'
    );


/* ================================
   UPDATE IMAGE
================================= */

const showImage = index => {

    if (!galleryItems.length) return;

    if (index < 0) {
        currentIndex =
            galleryItems.length - 1;
    } else if (
        index >= galleryItems.length
    ) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const item =
        galleryItems[currentIndex];

    image.src =
        item.currentSrc ||
        item.src;

    image.alt =
        item.alt || '';

    const parent =
        item.closest(
            '.gallery-item-large, .gallery-item-medium, .gallery-item-small'
        );

    const captionElement =
        parent
            ? parent.querySelector('.caption')
            : null;

    caption.textContent =
        captionElement
            ? captionElement.textContent
            : item.alt || '';

    counter.textContent =
        `${currentIndex + 1} / ${galleryItems.length}`;
};


/* ================================
   OPEN
================================= */

galleryItems.forEach((item, index) => {

    item.style.cursor = 'zoom-in';

    item.addEventListener(
        'click',
        () => {

            currentIndex = index;

            showImage(currentIndex);

            lightbox.classList.add(
                'active'
            );

            document.body.classList.add(
                'lightbox-open'
            );

        }
    );
});


/* ================================
   CLOSE
================================= */

const closeLightbox = () => {

    lightbox.classList.remove(
        'active'
    );

    document.body.classList.remove(
        'lightbox-open'
    );

    image.src = '';

};

closeButton.addEventListener(
    'click',
    closeLightbox
);


lightbox.addEventListener(
    'click',
    event => {

        if (
            event.target === lightbox
        ) {
            closeLightbox();
        }

    }
);


/* ================================
   NAVIGATION
================================= */

prevButton.addEventListener(
    'click',
    event => {

        event.stopPropagation();

        showImage(
            currentIndex - 1
        );

    }
);


nextButton.addEventListener(
    'click',
    event => {

        event.stopPropagation();

        showImage(
            currentIndex + 1
        );

    }
);


/* ================================
   KEYBOARD
================================= */

document.addEventListener(
    'keydown',
    event => {

        if (
            !lightbox.classList.contains(
                'active'
            )
        ) {
            return;
        }

        if (
            event.key === 'Escape'
        ) {
            closeLightbox();
        }

        if (
            event.key === 'ArrowLeft'
        ) {
            showImage(
                currentIndex - 1
            );
        }

        if (
            event.key === 'ArrowRight'
        ) {
            showImage(
                currentIndex + 1
            );
        }
    }
);

});
