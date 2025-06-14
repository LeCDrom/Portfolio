let currentSection = 'home';  // section active au départ

const bgPositions = {
    home: 0,
    about: 100,
    portfolio: 200,
    competences: 300
};

function showSection(sectionId, preserveBackground = false) {

    if (sectionId === currentSection) {
        return;
    }

    // Ne change la position du fond que si preserveBackground est false
    if (!preserveBackground) {
        // Récupère la position cible du fond
        let targetPosition = bgPositions[sectionId] || 0;
        // Applique la position du fond
        document.body.style.backgroundPosition = `0 ${targetPosition}px`;
    }

    // Met à jour la section courante
    currentSection = sectionId;

    // 1) Masquer toutes les sections
    document.querySelectorAll('.section').forEach(sec =>
        sec.classList.remove('active')
    );
    document.querySelectorAll('.home').forEach(sec =>
        sec.classList.remove('active')
    );

    // 2) Afficher la section demandée
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    // 3) Retirer 'active' de tous les liens de navigation (seulement ceux dans .nav-links)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));

    // 4) Ajouter 'active' aux liens correspondants dans .nav-links
    document
        .querySelectorAll(`.nav-links a[onclick="showSection('${sectionId}')"]`)
        .forEach(link => link.classList.add('active'));

    // 5) Fermer le menu mobile si besoin
    const navLinksContainer = document.getElementById('navLinks');
    if (navLinksContainer) {
        navLinksContainer.classList.remove('mobile-active');
    }
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('mobile-active');
}

document.addEventListener('DOMContentLoaded', function () {
    // Gérer les liens "CV", "GitHub" et "email"
    const links = document.querySelectorAll('a[href="#"]');

    links.forEach(link => {
        const icon = link.querySelector('.material-symbols-rounded');
        if (!icon) return;

        const text = icon.textContent.trim();

        if (text === 'description') {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                window.open('https://drive.google.com/file/d/1Tu7h8K9AwTFlKVgLSBJ0MAUF1RTDBmN7/view?usp=sharing', '_blank').focus();
            });
        }

        if (text === 'code') {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                window.open('https://github.com/LeCDrom', '_blank').focus();
            });
        }

        if (text === 'email') {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                window.open('https://mail.google.com/mail/?view=cm&fs=1&to=dairincome@gmail.com', '_blank').focus();
            });
        }
    });

    // Add animation effects to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.sae-card, .content-card, .skill-category').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
        observer.observe(card);
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function () {
    const heroTitle = document.querySelector('.typewriter');
    // Vérifie si la largeur de l'écran est supérieure à 510px
    if (heroTitle && window.innerWidth > 510) {
        typeWriter(heroTitle, 'Côme Dairin', 100);
    } else if (heroTitle) {
        // Sinon, affiche directement le texte sans l'effet
        heroTitle.innerHTML = 'Côme Dairin';
    }
});

// Add hover effects to SAE cards
document.addEventListener('DOMContentLoaded', function () {
    const saeCards = document.querySelectorAll('.sae-card');

    saeCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            // this.style.boxShadow = '0 10px 25px rgba(146, 109, 142, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            // this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Fonction pour gérer l'ouverture des détails SAE
function openSaeDetail(saeId) {
    // Cacher tous les containers de détails
    document.querySelectorAll('.sae-detail-container').forEach(container => {
        container.classList.remove('active');
    });
    
    // Afficher le bon container
    const targetContainer = document.getElementById(`sae-details-${saeId}`);
    if (targetContainer) {
        targetContainer.classList.add('active');
    }
    
    // Afficher la section sae-details SANS changer le background
    showSection('sae-details', true);  // preserveBackground = true
    
    // Faire défiler vers le haut de la page
    window.scrollTo(0, 0);
}

// Modifier les event listeners des SAE cards
document.addEventListener('DOMContentLoaded', function() {
    // Exemple pour les SAE cards - adapter selon vos IDs réels
    const saeCards = document.querySelectorAll('.sae-card');
    saeCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Adapter la logique selon comment vous identifiez vos SAE
            // Exemple : si data-sae="11" sur la card
            const saeId = card.getAttribute('data-sae') || `1${index + 1}`;
            openSaeDetail(saeId);
        });
    });
});
