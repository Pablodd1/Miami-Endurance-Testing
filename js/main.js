// Language Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';
    
    // Language switch handler
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLang) {
                switchLanguage(lang);
            }
        });
    });
    
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update active button
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        // Update all elements with language data attributes
        const translatableElements = document.querySelectorAll('[data-en][data-es]');
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });
        
        // Update document language
        document.documentElement.lang = lang;
        
        // Store preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        switchLanguage(savedLang);
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all others
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.parentElement.classList.remove('active');
            });
            
            // Toggle current
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
                item.classList.add('active');
            }
        });
    });
    
    // Training Zone Calculator
    const calculateBtn = document.getElementById('calculate-zones');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateZones);
    }
    
    function calculateZones() {
        const maxHR = parseInt(document.getElementById('max-hr').value);
        
        if (!maxHR || maxHR < 100 || maxHR > 250) {
            alert(currentLang === 'en' ? 'Please enter a valid maximum heart rate (100-250 bpm)' : 'Por favor ingresa una frecuencia cardíaca máxima válida (100-250 lpm)');
            return;
        }
        
        // Calculate zones
        const zones = {
            zone1: { low: Math.round(maxHR * 0.5), high: Math.round(maxHR * 0.6) },
            zone2: { low: Math.round(maxHR * 0.6), high: Math.round(maxHR * 0.7) },
            zone3: { low: Math.round(maxHR * 0.7), high: Math.round(maxHR * 0.8) },
            zone4: { low: Math.round(maxHR * 0.8), high: Math.round(maxHR * 0.9) },
            zone5: { low: Math.round(maxHR * 0.9), high: maxHR }
        };
        
        // Update display with animation
        Object.keys(zones).forEach((zone, index) => {
            setTimeout(() => {
                const el = document.getElementById(`${zone}-range`);
                el.style.opacity = '0';
                setTimeout(() => {
                    el.textContent = `${zones[zone].low}-${zones[zone].high} bpm`;
                    el.style.opacity = '1';
                }, 150);
            }, index * 100);
        });
    }
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = currentLang === 'en' ? 
                'Thank you! We will contact you shortly.' : 
                '¡Gracias! Te contactaremos pronto.';
            alert(msg);
            this.reset();
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(163,177,198,0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Scroll animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.neumorph-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});
