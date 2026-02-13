// ===== MAIN APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    // ===== INITIALIZE COMPONENTS =====
    initNavbar();
    initScrollReveal();
    initParticles();
    initStars();
    initMusicToggle();
    initThemeToggle();
    initChoices();
    initEasterEgg();
    initSmoothScroll();
    initLoveLetterAnimation();
    
    // ===== NAVBAR SCROLL EFFECT =====
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.fade-reveal, .blur-reveal, .reveal-item, .reveal-text');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Untuk paragraph dengan delay bertingkat
                    if (entry.target.classList.contains('reveal-text')) {
                        const paragraphs = document.querySelectorAll('.letter-paragraph');
                        paragraphs.forEach((p, index) => {
                            p.style.setProperty('--i', index + 1);
                        });
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => observer.observe(el));
        
        // Trigger untuk hero section
        setTimeout(() => {
            document.querySelectorAll('.hero-section .fade-reveal, .hero-section .blur-reveal')
                .forEach(el => el.classList.add('revealed'));
        }, 100);
    }
    
    // ===== HERO PARTICLES =====
    function initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 6 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 8;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.background = `rgba(255, ${Math.floor(200 + Math.random() * 55)}, ${Math.floor(180 + Math.random() * 75)}, ${0.3 + Math.random() * 0.5})`;
            
            container.appendChild(particle);
        }
    }
    
    // ===== BACKGROUND STARS =====
    function initStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 3;
            
            star.style.position = 'absolute';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.background = 'white';
            star.style.borderRadius = '50%';
            star.style.opacity = Math.random() * 0.7 + 0.3;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
            star.style.animationDelay = `${delay}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // ===== MUSIC TOGGLE =====
    function initMusicToggle() {
        const toggle = document.getElementById('musicToggle');
        const audio = document.getElementById('bgMusic');
        const icon = toggle?.querySelector('.music-icon');
        
        if (!toggle || !audio) return;
        
        audio.volume = 0.3;
        audio.load();
        
        let isPlaying = false;
        
        toggle.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                icon.textContent = '🔈';
            } else {
                audio.play().catch(e => {
                    console.log('Audio play failed:', e);
                });
                icon.textContent = '🔊';
            }
            isPlaying = !isPlaying;
        });
        
        const startBtn = document.getElementById('startJourney');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (!isPlaying) {
                    audio.play().catch(() => {});
                    icon.textContent = '🔊';
                    isPlaying = true;
                }
                
                document.getElementById('timeline').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // ===== THEME TOGGLE =====
    function initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            toggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
        });
    }
    
    // ===== ANIMASI BUKA SURAT =====
    function initLoveLetterAnimation() {
        const envelopeContainer = document.getElementById('envelopeContainer');
        const letterContentContainer = document.getElementById('letterContentContainer');
        const openBtn = document.getElementById('openLetterBtn');
        const envelope = document.querySelector('.envelope');
        const envelopeFlap = document.querySelector('.envelope-flap');
        
        if (!envelopeContainer || !letterContentContainer || !openBtn || !envelope) return;
        
        function openLetter() {
            if (envelopeFlap) {
                envelopeFlap.classList.add('open');
            }
            
            envelope.style.animation = 'none';
            envelope.style.transform = 'scale(0.8) translateY(-50px)';
            envelope.style.opacity = '0';
            
            openBtn.style.transform = 'scale(0)';
            openBtn.style.opacity = '0';
            
            setTimeout(() => {
                envelopeContainer.style.display = 'none';
                letterContentContainer.classList.remove('hidden');
                createMiniConfetti();
            }, 600);
        }
        
        envelope.addEventListener('click', openLetter);
        openBtn.addEventListener('click', openLetter);
    }
    
    // ===== INTERACTIVE CHOICES =====
    function initChoices() {
        const yesBtn = document.getElementById('choiceYes');
        const veryYesBtn = document.getElementById('choiceVeryYes');
        const response = document.getElementById('responseMessage');
        
        if (!yesBtn || !veryYesBtn || !response) return;
        
        function handleChoice() {
            yesBtn.style.display = 'none';
            veryYesBtn.style.display = 'none';
            
            response.classList.remove('hidden');
            
            createConfetti();
            
            document.querySelector('.ending-section').style.background = 'radial-gradient(circle at center, rgba(212, 175, 122, 0.2), transparent 70%)';
            
            const heart = document.querySelector('.response-heart');
            if (heart) {
                heart.classList.add('heartbeat');
            }
        }
        
        yesBtn.addEventListener('click', handleChoice);
        veryYesBtn.addEventListener('click', handleChoice);
    }
    
    // ===== CONFETTI =====
    function createConfetti() {
        const colors = ['#ecc5c0', '#d4af7a', '#fbe4d0', '#ffd1d1', '#9e4a5c'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                const left = Math.random() * 100;
                const size = Math.random() * 10 + 5;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const rotation = Math.random() * 360;
                const delay = Math.random() * 2;
                
                confetti.style.left = `${left}%`;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.background = color;
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.style.animationDelay = `${delay}s`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 30);
        }
    }
    
    function createMiniConfetti() {
        const colors = ['#d4af7a', '#ecc5c0', '#fbe4d0'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti mini';
                
                const left = 50 + (Math.random() - 0.5) * 40;
                const size = Math.random() * 6 + 3;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                confetti.style.left = `${left}%`;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.background = color;
                confetti.style.animation = 'confettiFall 3s ease-in forwards';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 50);
        }
    }
    
    // ===== EASTER EGG =====
    function initEasterEgg() {
        const star = document.getElementById('easterStar');
        if (!star) return;
        
        let clickCount = 0;
        
        star.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 1) {
                const msg = document.createElement('div');
                msg.textContent = '⭐ Aku serius loh. ⭐';
                msg.style.position = 'fixed';
                msg.style.bottom = '100px';
                msg.style.right = '20px';
                msg.style.background = 'var(--card-bg)';
                msg.style.padding = '1rem';
                msg.style.borderRadius = '12px';
                msg.style.border = '2px solid var(--gold-soft)';
                msg.style.zIndex = '2000';
                msg.style.animation = 'fadeIn 0.3s';
                msg.style.color = '#fff';
                
                document.body.appendChild(msg);
                
                setTimeout(() => {
                    msg.remove();
                }, 3000);
            } else if (clickCount >= 3) {
                alert('❤️ Kamu benar-benar special, Chel ❤️');
                createConfetti();
                clickCount = 0;
            }
        });
    }
    
    // ===== SMOOTH SCROLL =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ===== ACTIVE NAV LINK =====
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== PARALLAX =====
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero-section');
        
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // ===== RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const container = document.getElementById('particles');
            if (container) {
                container.innerHTML = '';
                initParticles();
            }
        }, 250);
    });
    
    console.log('✨ Website untuk Chelsea siap! ✨');
});