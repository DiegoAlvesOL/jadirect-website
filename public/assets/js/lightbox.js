// Lightbox, expande a foto clicada em uma galeria em tela cheia

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('[data-full]');

    let lastFocusedElement = null;

    function openLightbox(item) {
        lastFocusedElement = item;
        lightboxImage.src = item.dataset.full;
        lightboxImage.alt = item.querySelector('img').alt;
        lightbox.hidden = false;
        closeButton.focus();
        document.addEventListener('keydown', handleKeydown);
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightboxImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        lightboxImage.alt = 'Expanded photo';
        document.removeEventListener('keydown', handleKeydown);
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    }

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => openLightbox(item));
    });

    closeButton.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
});