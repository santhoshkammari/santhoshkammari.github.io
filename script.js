(() => {
    'use strict';

    // ===== Agent Network Particle Animation =====
    const canvas = document.getElementById('agent-canvas');
    const ctx = canvas.getContext('2d');
    let agents = [];
    let animationId;
    const AGENT_COUNT = 50;
    const CONNECTION_DIST = 150;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Agent {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw(color) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    function getParticleColors() {
        const style = getComputedStyle(document.documentElement);
        const rgb = style.getPropertyValue('--particle-color').trim();
        return {
            dot: `rgba(${rgb}, 0.6)`,
            line: (alpha) => `rgba(${rgb}, ${alpha})`
        };
    }

    function initAgents() {
        agents = [];
        for (let i = 0; i < AGENT_COUNT; i++) {
            agents.push(new Agent());
        }
    }

    function drawConnections(colors) {
        for (let i = 0; i < agents.length; i++) {
            for (let j = i + 1; j < agents.length; j++) {
                const dx = agents[i].x - agents[j].x;
                const dy = agents[i].y - agents[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(agents[i].x, agents[i].y);
                    ctx.lineTo(agents[j].x, agents[j].y);
                    ctx.strokeStyle = colors.line((1 - dist / CONNECTION_DIST) * 0.15);
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const colors = getParticleColors();

        agents.forEach(agent => {
            agent.update();
            agent.draw(colors.dot);
        });

        drawConnections(colors);
        animationId = requestAnimationFrame(animate);
    }

    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    function initTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            setTheme(saved);
        }
    }

    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ===== Mobile Navigation =====
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ===== Navbar Scroll Behavior =====
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    function handleNavScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    }

    // ===== Active Nav Link =====
    const sections = document.querySelectorAll('section[id], footer[id]');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    // ===== Scroll Animations =====
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ===== Scroll to Top =====
    const scrollTopBtn = document.getElementById('scroll-top');

    function handleScrollTop() {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Scroll Event (debounced) =====
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavScroll();
                updateActiveLink();
                handleScrollTop();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ===== Init =====
    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    function init() {
        initTheme();
        resizeCanvas();
        initAgents();
        animate();
        updateActiveLink();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
