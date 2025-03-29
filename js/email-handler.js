// Initialize EmailJS with your public key
(function() {
    emailjs.init("RN3zHAc-0qWTu4CtP"); // Public key
})();

// Function to handle form submission
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

            // Send email using EmailJS
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
            console.error('Form submission error:', error);
            showNotification('An error occurred. Please try again.', 'error');
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Function to show notifications
function showNotification(message, type = 'success') {
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification-toast fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

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