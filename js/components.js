/**
 * Loads Header and Footer components dynamically.
 * Automatically adjusts paths based on window.basePath.
 */
async function loadComponents() {
    // Default to current directory if not set in the HTML file
    const basePath = window.basePath || './';
    const componentsPath = basePath + 'components/';

    // Helper to fix paths in the loaded HTML
    // Converts src="assets/..." to src="../assets/..." based on basePath
    const fixPaths = (html) => {
        return html.replace(
            /(href|src)="(?!(http|#|mailto:|tel:|\/))([^"]+)"/g, 
            '$1="' + basePath + '$3"'
        );
    };

    // Load Header
    try {
        const headerResponse = await fetch(componentsPath + 'header.html');
        if (headerResponse.ok) {
            let headerHtml = await headerResponse.text();
            document.getElementById('header-placeholder').innerHTML = fixPaths(headerHtml);
            
            // Initialize mobile menu (moved from index.js)
            const navToggle = document.querySelector('#mobile-menu-toggle');
            const navMenu = document.querySelector('#mobile-menu');
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                });
                document.addEventListener('click', (e) => {
                    if (navMenu.classList.contains('active') && 
                        !navMenu.contains(e.target) && 
                        !navToggle.contains(e.target)) {
                        navMenu.classList.remove('active');
                    }
                });
            }

            // Optional: Highlight current page link
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const links = document.querySelectorAll('nav ul li a, .mobile-menu a');
            links.forEach(link => {
                // Simple check: if href matches current page (ignoring ./ prefix)
                const href = link.getAttribute('href').replace(/^(\.\/|\.\.\/)/, '');
                if (href === currentPath || (currentPath === 'index.html' && href === '')) {
                    link.classList.add('text-bronze');
                }
            });
        }
    } catch (e) {
        console.error('Error loading header:', e);
    }

    // Load Footer
    try {
        const footerResponse = await fetch(componentsPath + 'footer.html');
        if (footerResponse.ok) {
            let footerHtml = await footerResponse.text();
            document.getElementById('footer-placeholder').innerHTML = fixPaths(footerHtml);
        }
    } catch (e) {
        console.error('Error loading footer:', e);
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);

