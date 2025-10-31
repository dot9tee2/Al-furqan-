/**
 * Injects a floating WhatsApp button (with heartbeat animation)
 * and adds a WhatsApp CTA to the navbar and mobile menu.
 */
document.addEventListener('DOMContentLoaded', () => {
  const whatsappUrl = 'https://wa.me/96892949051?text=Hello%20Al-furqan%2C%20I%27d%20like%20to%20chat.';

  // Avoid duplicate injection if script runs twice
  if (document.querySelector('.wa-float')) return;

  // Inject minimal styles (heartbeat + positioning + nav CTA)
  const style = document.createElement('style');
  style.textContent = `
    .wa-float{position:fixed;right:20px;bottom:96px;z-index:9999}
    .wa-btn{width:56px;height:56px;border-radius:9999px;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 20px rgba(37,211,102,.35);animation:wa-heartbeat 1.6s ease-in-out infinite;transition:transform .2s ease}
    .wa-btn:hover{transform:scale(1.06)}
    @keyframes wa-heartbeat{0%,100%{transform:scale(1)}25%{transform:scale(1.08)}50%{transform:scale(1)}75%{transform:scale(1.08)}}
    .wa-nav-btn{background:#25D366;color:#fff;padding:.5rem 1rem;border-radius:.5rem;display:inline-flex;align-items:center;gap:.5rem;white-space:nowrap}
    .wa-nav-btn:hover{background:#1ebe57}
  `;
  document.head.appendChild(style);

  // Floating WhatsApp button (bottom-right)
  const floatAnchor = document.createElement('a');
  floatAnchor.href = whatsappUrl;
  floatAnchor.target = '_blank';
  floatAnchor.rel = 'noopener';
  floatAnchor.className = 'wa-float';
  floatAnchor.setAttribute('aria-label', 'Chat on WhatsApp');
  floatAnchor.title = 'Chat on WhatsApp';
  floatAnchor.innerHTML = "<div class='wa-btn'><i class='bx bxl-whatsapp' style='font-size:28px'></i></div>";
  document.body.appendChild(floatAnchor);

  // Add WhatsApp CTA to desktop navbar (append to the nav list)
  const desktopNav = document.querySelector('header ul.lg\\:flex');
  if (desktopNav && !desktopNav.querySelector('.wa-nav-btn')) {
    const navItem = document.createElement('li');
    navItem.innerHTML = `<a href="${whatsappUrl}" target="_blank" rel="noopener" class="wa-nav-btn"><i class='bx bxl-whatsapp text-xl'></i><span>WhatsApp</span></a>`;
    desktopNav.appendChild(navItem);
  }

  // Add WhatsApp link to mobile menu
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.querySelector('a[data-wa-link]')) {
    const mobileLink = document.createElement('a');
    mobileLink.href = whatsappUrl;
    mobileLink.target = '_blank';
    mobileLink.rel = 'noopener';
    mobileLink.setAttribute('data-wa-link', 'true');
    mobileLink.className = 'block text-white bg-[#25D366] hover:bg-[#1ebe57] transition-colors px-4 py-2 rounded';
    mobileLink.innerHTML = "<i class='bx bxl-whatsapp mr-2'></i> WhatsApp";
    mobileMenu.appendChild(mobileLink);
  }
});


