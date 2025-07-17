// Toggle navigation menu visibility
function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('active');
}

// Filter Projects by Category
function filterProjects(category) {
    document.querySelectorAll('section[aria-labelledby="projects-heading"] article').forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
}

// Lightbox Effect for Project Images
function openLightbox(src, alt) {
    let modal = document.getElementById('lightbox-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lightbox-modal';
        modal.style.position = 'fixed';
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 1000;
        modal.innerHTML = `
            <img src="${src}" alt="${alt}" style="max-width:90vw;max-height:80vh;border-radius:8px;">
            <button id="close-lightbox" style="position:absolute;top:2em;right:2em;font-size:2em;background:none;color:#fff;border:none;cursor:pointer;">&times;</button>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.id === 'close-lightbox') {
                modal.remove();
            }
        });
    }
}

// Attach event listener to hamburger icon
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Smooth scrolling for internal navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Optionally close menu on mobile after click
                document.querySelector('nav ul').classList.remove('active');
            }
        });
    });

    // Lightbox event for project images
    document.querySelectorAll('.project-image').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    // Contact form validation
    const form = document.querySelector('form[action="#"]');
    if (form) {
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');

        // Helper to show error
        function showError(input, message) {
            let error = input.parentElement.querySelector('.error-message');
            if (!error) {
                error = document.createElement('span');
                error.className = 'error-message';
                error.style.color = 'red';
                error.style.fontSize = '0.95em';
                input.parentElement.appendChild(error);
            }
            error.textContent = message;
        }

        // Helper to clear error
        function clearError(input) {
            const error = input.parentElement.querySelector('.error-message');
            if (error) error.textContent = '';
        }

        // Real-time validation
        nameInput.addEventListener('input', function () {
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required.');
            } else {
                clearError(nameInput);
            }
        });

        emailInput.addEventListener('input', function () {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required.');
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
            } else {
                clearError(emailInput);
            }
        });

        messageInput.addEventListener('input', function () {
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required.');
            } else {
                clearError(messageInput);
            }
        });

        // On submit
        form.addEventListener('submit', function (e) {
            let valid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required.');
                valid = false;
            }
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required.');
                valid = false;
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value.trim())) {
                    showError(emailInput, 'Please enter a valid email address.');
                    valid = false;
                }
            }
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required.');
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
            } else {
                alert('Thank you for your message!');
            }
        });
    }
});
