/**
 * Email Handler Module
 * Handles form submissions and email sending functionality using EmailJS
 * @author Your Name
 * @version 1.0.0
 */

/**
 * Initialize EmailJS with your public key
 * Note: Replace the public key with your own from EmailJS dashboard
 */
(function() {
    emailjs.init("RN3zHAc-0qWTu4CtP"); // Public key
})();

/**
 * Handles form submission and sends email using EmailJS
 * @param {string} formId - The ID of the form element to handle
 * @param {string} templateId - The EmailJS template ID to use
 * @throws {Error} If form or submit button is not found
 */
function handleFormSubmit(formId, templateId) {
    // Get the form element
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`Form with ID "${formId}" not found`);
        return;
    }

    // Remove any existing event listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    /**
     * Form submission event handler
     * @param {Event} e - The form submission event
     */
    newForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        if (!submitButton) {
            console.error('Submit button not found');
            return;
        }
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="bx bx-loader-alt animate-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            // Get form data
            const formData = new FormData(this);
            const templateParams = {};
            
            // Convert FormData to template parameters
            formData.forEach((value, key) => {
                templateParams[key] = value;
            });

            // Add timestamp to the template params
            templateParams.time = new Date().toLocaleString();

            /**
             * Send email using EmailJS
             * @param {string} serviceId - The EmailJS service ID
             * @param {string} templateId - The EmailJS template ID
             * @param {Object} templateParams - The parameters to use in the template
             */
            emailjs.send('service_yl31or9', templateId, templateParams)
                .then(function(response) {
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                    newForm.reset();
                })
                .catch(function(error) {
                    // Show error message
                    showNotification('Failed to send message. Please try again.', 'error');
                    console.error('EmailJS Error:', error);
                })
                .finally(function() {
                    // Reset button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
        } catch (error) {
            // Handle any unexpected errors
            showNotification('An unexpected error occurred. Please try again.', 'error');
            console.error('Form submission error:', error);
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

/**
 * Shows a notification message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success' or 'error')
 */
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white z-50`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Export functions for use in other files
window.handleFormSubmit = handleFormSubmit;
window.showNotification = showNotification;

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize a form with retry
    function initializeFormWithRetry(formId, templateId, maxRetries = 5) {
        let retries = 0;
        
        function tryInitialize() {
            const form = document.getElementById(formId);
            if (form) {
                console.log(`Successfully initialized form: ${formId}`);
                handleFormSubmit(formId, templateId);
            } else {
                retries++;
                if (retries < maxRetries) {
                    console.log(`Form ${formId} not found, retrying... (${retries}/${maxRetries})`);
                    setTimeout(tryInitialize, 500);
                } else {
                    // Don't log an error since the form might not exist on this page
                    console.log(`Form ${formId} not found on this page`);
                }
            }
        }
        
        tryInitialize();
    }

    // Check which form exists on the current page and initialize only that one
    const servicesForm = document.getElementById('contact-form-content');
    const contactForm = document.getElementById('contactForm');

    if (servicesForm) {
        console.log('Initializing services form...');
        initializeFormWithRetry('contact-form-content', 'services_template_id');
    }

    if (contactForm) {
        console.log('Initializing contact form...');
        initializeFormWithRetry('contactForm', 'contact_template_id');
    }
}); 