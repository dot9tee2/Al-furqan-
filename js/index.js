// Mobile Navigation Toggle
const navToggle = document.querySelector('.bx-menu');
const navMenu = document.querySelector('ul');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('flex');
        navMenu.classList.toggle('flex-col');
        navMenu.classList.toggle('absolute');
        navMenu.classList.toggle('top-16');
        navMenu.classList.toggle('left-0');
        navMenu.classList.toggle('w-full');
        navMenu.classList.toggle('bg-white');
        navMenu.classList.toggle('p-4');
        navMenu.classList.toggle('shadow-md');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'w-full', 'bg-white', 'p-4', 'shadow-md');
        }
    });
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Create particles for background effect
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 6 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesContainer.appendChild(particle);
    }
    
    // Animate particles to match bronze color scheme
    gsap.to('.particle', {
        opacity: 0.7,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
    });
    
    // Random floating animation for particles
    document.querySelectorAll('.particle').forEach(particle => {
        gsap.to(particle, {
            x: `${Math.random() * 100 - 50}px`,
            y: `${Math.random() * 100 - 50}px`,
            duration: Math.random() * 10 + 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
    
    // Hero section animations
    const heroTl = gsap.timeline();
    
    // Glow effect animation
    heroTl.to('.signboard-glow', {
        opacity: 0.8,
        duration: 1.5,
        ease: "power2.inOut"
    }, 0);
    
    // Animate bronze title with shimmer effect
    heroTl.to('#title-line1', {
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
    }, 0.3);
    
    heroTl.to('#title-line2', {
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
    }, 0.7);
    
    // Create the bronze shimmer effect cycling
    const shimmerTl = gsap.timeline({repeat: -1, repeatDelay: 3});
    document.querySelectorAll('.bronze-shimmer').forEach((shimmer, i) => {
        shimmerTl.fromTo(shimmer, 
            {left: '-100%'},
            {left: '200%', duration: 2, ease: "power1.inOut"}, 
            i * 0.5);
    });
    
    // Text fade in with special effect
    heroTl.to('#hero-text', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, 1.2);
    
    // Buttons fade in
    heroTl.to('#btn-products, #btn-contact', {
        opacity: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out"
    }, 1.5);
    
    // Features fade in
    heroTl.to('#feature-1, #feature-2, #feature-3', {
        opacity: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out"
    }, 1.8);
    
    // Scroll indicator fade in
    heroTl.to('#scroll-indicator', {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
    }, 2.2);
    
    // Add light traces that follow mouse movement (signboard lighting effect)
    const heroSection = document.querySelector('.hero-parallax');
    
    heroSection.addEventListener('mousemove', (e) => {
        // Update glow position based on mouse
        const glowElement = document.querySelector('.signboard-glow');
        const xPos = (e.clientX / window.innerWidth) * 100;
        const yPos = (e.clientY / window.innerHeight) * 100;
        
        gsap.to('.signboard-glow', {
            background: `radial-gradient(circle at ${xPos}% ${yPos}%, rgba(169, 108, 54, 0.3), transparent 70%)`,
            duration: 0.5
        });
    });
    
    // Parallax effect on scroll
    gsap.to('.parallax-layer', {
        y: (i, el) => -ScrollTrigger.maxScroll(window) * 0.2,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-parallax",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Fade out elements on scroll
    gsap.to('.hero-content', {
        y: -50,
        opacity: 0.5,
        scrollTrigger: {
            trigger: ".hero-parallax",
            start: "top top",
            end: "center top",
            scrub: true
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible');
            scrollTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'invisible');
            scrollTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// About section animations
const aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animate decorative elements
aboutTl.fromTo(".about-circle", {
    scale: 0,
    opacity: 0,
}, {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    stagger: 0.3,
    ease: "elastic.out(1, 0.5)"
}, 0);

// Title animation
aboutTl.to("#about-title", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
}, 0.2);

// Text paragraphs with highlighted words
aboutTl.to("#about-text-1", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
}, 0.8)
.to("#about-text-2", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
}, 1.1);

// Special text reveal effect for highlighted words
gsap.fromTo(".text-reveal span", {
    y: "100%",
    opacity: 0
}, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: "#about-text-1",
        start: "top 70%"
    }
});

// Cards animation with staggered elements and sequence
gsap.set(".about-card", {opacity: 0, y: 30});
gsap.set(".icon-wrapper", {scale: 0});
gsap.set(".card-line", {width: 0});

// Create a staggered animation for each card
document.querySelectorAll(".about-card").forEach((card, index) => {
    const cardTl = gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: "top 85%"
        }
    });
    
    // Main card animation
    cardTl.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
    })
    // Icon animation with bounce effect
    .to(card.querySelector(".icon-wrapper"), {
        scale: 1,
        duration: 0.6,
        ease: "back.out(2.5)"
    }, "-=0.3")
    // Line reveal animation
    .to(card.querySelector(".card-line"), {
        width: "60%",
        duration: 0.4,
        ease: "power1.inOut"
    }, "-=0.2");
});

// Enhanced hover animation for cards with rotation and glow
document.querySelectorAll(".about-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            y: -15,
            rotationY: 5,
            rotationX: -3,
            scale: 1.03,
            boxShadow: "0 15px 30px rgba(127, 84, 52, 0.15), 0 0 15px rgba(127, 84, 52, 0.05)",
            borderColor: "rgba(127, 84, 52, 0.6)",
            duration: 0.4,
            ease: "power2.out"
        });
        
        // Animate icon on hover
        gsap.to(card.querySelector(".icon-wrapper"), {
            scale: 1.15,
            backgroundColor: "rgba(169, 108, 54, 0.2)",
            duration: 0.3
        });
        
        // Animate line width on hover
        gsap.to(card.querySelector(".card-line"), {
            width: "80%",
            duration: 0.3
        });
    });
    
    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            y: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            borderColor: "rgba(127, 84, 52, 0.2)",
            duration: 0.4,
            ease: "power2.out"
        });
        
        // Reset icon on hover out
        gsap.to(card.querySelector(".icon-wrapper"), {
            scale: 1,
            backgroundColor: "rgba(169, 108, 54, 0.1)",
            duration: 0.3
        });
        
        // Reset line width on hover out
        gsap.to(card.querySelector(".card-line"), {
            width: "60%",
            duration: 0.3
        });
    });
});

// Add parallax effect to the decorative circles
gsap.to(".about-circle", {
    y: (i, el) => (i === 0 ? -30 : 30),
    scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
    }
});

// Products section animations
const productsTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#products",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animate decorative circles
productsTl.fromTo(".product-circle", {
    scale: 0,
    opacity: 0
}, {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    stagger: 0.3,
    ease: "elastic.out(1, 0.5)"
}, 0);

// Title animation
productsTl.to("#products-title", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
}, 0.2);

// Staggered product cards animation
productsTl.to(".product-card", {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "back.out(1.2)"
}, 0.8);

// Animate product card lines
gsap.to(".product-card-line", {
    width: "70%",
    duration: 0.6,
    ease: "power1.inOut",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".product-card",
        start: "top 75%"
    }
});

// Product overlay animation on hover
document.querySelectorAll(".product-card").forEach(card => {
    const overlay = card.querySelector(".product-overlay");
    const cardLine = card.querySelector(".product-card-line");
    const btn = card.querySelector(".product-btn");
    
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow: "0 15px 30px rgba(127, 84, 52, 0.15)",
            duration: 0.3
        });
        
        gsap.to(overlay, {
            opacity: 1,
            duration: 0.3
        });
        
        gsap.to(cardLine, {
            width: "100%",
            backgroundColor: "rgba(169, 108, 54, 0.5)",
            duration: 0.3
        });
        
        gsap.to(btn, {
            backgroundColor: "rgba(127, 84, 52, 0.1)",
            borderColor: "rgba(127, 84, 52, 0.8)",
            color: "rgba(127, 84, 52, 1)",
            duration: 0.3
        });
    });
    
    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            duration: 0.3
        });
        
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.3
        });
        
        gsap.to(cardLine, {
            width: "70%",
            backgroundColor: "rgba(127, 84, 52, 0.3)",
            duration: 0.3
        });
        
        gsap.to(btn, {
            backgroundColor: "transparent",
            borderColor: "rgba(127, 84, 52, 1)",
            color: "rgba(127, 84, 52, 1)",
            duration: 0.3
        });
    });
});

// Add parallax effect to the decorative circles
gsap.to(".product-circle", {
    y: (i, el) => (i === 0 ? -40 : 40),
    scrollTrigger: {
        trigger: "#products",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
    }
});

// Why Choose Us section animations
const whyTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#why-us",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animate decorative circles
whyTl.fromTo(".choose-circle", {
    scale: 0,
    opacity: 0
}, {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    ease: "elastic.out(1, 0.5)"
}, 0);

// Title animation
whyTl.to("#why-title", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
}, 0.2);

// Set up initial state
gsap.set(".why-card", {opacity: 0, y: 30});
gsap.set(".why-card .icon-wrapper", {scale: 0});
gsap.set(".why-card-line", {width: 0});

// Why cards animation
document.querySelectorAll(".why-card").forEach((card, index) => {
    const cardTl = gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: "top 85%"
        }
    });
    
    cardTl.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
    })
    .to(card.querySelector(".icon-wrapper"), {
        scale: 1,
        duration: 0.6,
        ease: "back.out(2.5)"
    }, "-=0.3")
    .to(card.querySelector(".why-card-line"), {
        width: "60%",
        duration: 0.4,
        ease: "power1.inOut"
    }, "-=0.2");
    
    // Hover animations
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            y: -10,
            boxShadow: "0 15px 30px rgba(127, 84, 52, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            duration: 0.3
        });
        
        gsap.to(card.querySelector(".icon-wrapper"), {
            scale: 1.15,
            backgroundColor: "rgba(169, 108, 54, 0.2)",
            duration: 0.3
        });
        
        gsap.to(card.querySelector(".why-card-line"), {
            width: "80%",
            duration: 0.3
        });
    });
    
    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            y: 0,
            boxShadow: "none",
            backgroundColor: "transparent",
            duration: 0.3
        });
        
        gsap.to(card.querySelector(".icon-wrapper"), {
            scale: 1,
            backgroundColor: "rgba(169, 108, 54, 0.1)",
            duration: 0.3
        });
        
        gsap.to(card.querySelector(".why-card-line"), {
            width: "60%",
            duration: 0.3
        });
    });
});

// Add parallax effect to the decorative circle
gsap.to(".choose-circle", {
    y: -30,
    scrollTrigger: {
        trigger: "#why-us",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
    }
});

// CTA Section Animations
const ctaTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#cta",
        start: "top 85%",
        toggleActions: "play none none none"
    }
});

// Animate decorative circles
ctaTl.fromTo(".cta-circle", {
    scale: 0,
    opacity: 0
}, {
    scale: 1,
    opacity: 0.7,
    duration: 1.2,
    stagger: 0.3,
    ease: "elastic.out(1, 0.5)"
}, 0);

// Title animation
ctaTl.to("#cta-title", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out"
}, 0.2);

// Button animations
ctaTl.to(["#cta-btn-1", "#cta-btn-2"], {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 0.6,
    ease: "back.out(1.5)"
}, 0.8);

// Add mouse movement effect on CTA section
const ctaSection = document.querySelector("#cta");
ctaSection.addEventListener("mousemove", (e) => {
    const xPos = (e.clientX / window.innerWidth) - 0.5;
    const yPos = (e.clientY / window.innerHeight) - 0.5;
    
    gsap.to(".cta-circle", {
        x: xPos * 30,
        y: yPos * 30,
        duration: 1
    });
});

// Add parallax effect to the decorative circles
gsap.to(".cta-circle", {
    y: (i, el) => (i === 0 ? -40 : 40),
    scrollTrigger: {
        trigger: "#cta",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
    }
});