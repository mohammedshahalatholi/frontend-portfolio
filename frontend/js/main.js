// Smooth Scrolling and Navigation with Enhanced Animations
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open', !isActive);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Smooth scroll for navigation links (using event delegation for dynamically added links)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            const link = e.target;
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle?.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        }
    });

    // Enhanced scroll animations with IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay for staggered animations
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger delay
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards with enhanced animations
    const animateElements = document.querySelectorAll('.section, .skill-card, .project-card, .award-card, .hobby-card, .timeline-item, .skill-attribute-item, .stat-item, .testimonial-item');
    animateElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        }, { passive: true });
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 968) {
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    }, 250);
});

