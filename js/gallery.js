// Modal gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentImageIndex = 0;
    let modalImages = [];
    let modal = document.createElement('div');
    modal.className = 'gallery-modal';
    let modalContent = document.createElement('div');
    modalContent.className = 'gallery-modal-content';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function openModal(imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Portfolio Image';
        img.className = 'gallery-modal-image';
        
        modalContent.innerHTML = '';
        modalContent.appendChild(img);
        modal.style.display = 'flex';
        
        // Add loading state
        img.onload = function() {
            modalContent.style.opacity = '1';
        };
        
        // Add navigation controls
        const nav = document.createElement('div');
        nav.className = 'gallery-modal-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-modal-btn gallery-modal-prev';
        prevBtn.innerHTML = '←';
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + modalImages.length) % modalImages.length;
            openModal(modalImages[currentImageIndex]);
        });

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-modal-btn gallery-modal-next';
        nextBtn.innerHTML = '→';
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % modalImages.length;
            openModal(modalImages[currentImageIndex]);
        });

        const closeBtn = document.createElement('button');
        closeBtn.className = 'gallery-modal-btn gallery-modal-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', closeModal);

        nav.appendChild(prevBtn);
        nav.appendChild(closeBtn);
        nav.appendChild(nextBtn);
        modalContent.appendChild(nav);
    }

    function closeModal() {
        modalContent.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Initialize gallery for project pages only
    function initializeGallery() {
        // Get only project page images
        const projectPageImages = Array.from(document.querySelectorAll('.project-images img'));
        
        modalImages = projectPageImages.map(img => img.src);
        currentImageIndex = 0;

        // Make project page images clickable
        projectPageImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                currentImageIndex = modalImages.indexOf(img.src);
                openModal(img.src);
            });
        });
    }

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .gallery-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: display 0.3s;
        }

        .gallery-modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .gallery-modal-image {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            cursor: zoom-out;
        }

        .gallery-modal-nav {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            pointer-events: none;
        }

        .gallery-modal-btn {
            background: rgba(0, 0, 0, 0.5);
            border: none;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            font-size: 1.5rem;
            cursor: pointer;
            transition: background 0.2s;
            pointer-events: auto;
        }

        .gallery-modal-btn:hover {
            background: rgba(0, 0, 0, 0.7);
        }

        .gallery-modal-prev, .gallery-modal-next {
            padding: 0.5rem 1rem;
            font-size: 2rem;
        }

        .gallery-modal-close {
            font-size: 2rem;
            padding: 0.5rem 1.5rem;
        }

        /* Add hover effect for gallery images */
        .project-images img {
            cursor: zoom-in;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .project-images img:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);

    // Initialize gallery when the page loads
    initializeGallery();
});
