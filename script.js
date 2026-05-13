document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter-text');
    const sectors = ['Agriculture', 'Industry', 'Energy', 'Infrastructure', 'Digital Economy'];
    let sectorIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentSector = sectors[sectorIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentSector.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentSector.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentSector.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            sectorIndex = (sectorIndex + 1) % sectors.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typewriterElement) {
        type();
    }

    // 3. Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };
        
        updateCount();
    }

    // 4. Countdown Timer
    const countdownDate = new Date('June 14, 2026 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').textContent = "SUMMIT HAS STARTED";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // 5. Scroll Reveal (Simple Implementation)
    const revealElements = document.querySelectorAll('.sector-card, .exp-item, .speaker-card, .message-content');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(el);
    });

    // 6. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');

            if (isOpen) {
    document.body.style.overflow = 'hidden'; // Prevent scrolling background when menu is open
} else {
    document.body.style.overflow = ''; 
}

            navLinks.style.display = isOpen ? 'flex' : '';
            navLinks.style.position = isOpen ? 'absolute' : '';
            navLinks.style.top = isOpen ? '100%' : '';
            navLinks.style.left = isOpen ? '0' : '';
            navLinks.style.width = isOpen ? '100%' : '';
            navLinks.style.flexDirection = isOpen ? 'column' : '';
            navLinks.style.backgroundColor = isOpen ? 'var(--deep-green)' : '';
            navLinks.style.padding = isOpen ? '20px 30px' : '';
            navLinks.style.textAlign = isOpen ? 'left' : '';
            navLinks.style.gap = isOpen ? '0' : '';
            navLinks.style.borderTop = isOpen ? '1px solid rgba(212,175,55,0.2)' : '';

            // On very small screens, inject Register Now into the dropdown
            const mobileRegister = navLinks.querySelector('.mobile-register-btn');
            if (isOpen && window.innerWidth <= 480) {
                if (!mobileRegister) {
                    const li = document.createElement('li');
                    li.style.marginTop = '16px';
                    li.style.paddingTop = '16px';
                    li.style.borderTop = '1px solid rgba(212,175,55,0.2)';
                    li.innerHTML = '<a href="#" class="btn btn-emerald mobile-register-btn" style="display:inline-block;width:100%;text-align:center;">Register Now</a>';
                    navLinks.appendChild(li);
                }
            } else if (!isOpen) {
                const injected = navLinks.querySelector('li:has(.mobile-register-btn)');
                if (injected) injected.remove();
            }

            if (isOpen) {
                // Style the links inside the menu
                navLinks.querySelectorAll('li').forEach(li => {
                    if (!li.querySelector('.mobile-register-btn')) {
                        li.style.padding = '12px 0';
                        li.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
                    }
                });
            }
        });

        // Close menu when a link is clicked
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('mobile-open');
                navLinks.style.display = '';
            }
        });
    }
});
