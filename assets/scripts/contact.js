// Contact form functionality with Discord webhook integration and validation
const DISCORD_CONFIG = {
    WEBHOOK_URL: "https://discord.com/api/webhooks/1399877995803574432/-oPFZcMQHWnflyu8YJXp6GLefhGi9KER2fbarRTctONIfXUEUBUI-jGqhiFt3gf4h7CN"
};

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formFields = contactForm.querySelectorAll('input, textarea');
    
    // Form validation states
    const validationStates = {
        title: { isValid: false, message: '' },
        subject: { isValid: false, message: '' },
        email: { isValid: false, message: '' },
        message: { isValid: false, message: '' }
    };
    
    // Validation rules
    const validationRules = {
        title: {
            required: true,
            minLength: 3,
            maxLength: 100,
            pattern: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-_.,!?()]+$/
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 200,
            pattern: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\-_.,!?()]+$/
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000
        }
    };
    
    // Validation messages
    const validationMessages = {
        title: {
            required: 'Tytuł jest wymagany',
            minLength: 'Tytuł musi mieć co najmniej 3 znaki',
            maxLength: 'Tytuł nie może przekraczać 100 znaków',
            pattern: 'Tytuł zawiera niedozwolone znaki'
        },
        subject: {
            required: 'Temat jest wymagany',
            minLength: 'Temat musi mieć co najmniej 5 znaków',
            maxLength: 'Temat nie może przekraczać 200 znaków',
            pattern: 'Temat zawiera niedozwolone znaki'
        },
        email: {
            required: 'Adres e-mail jest wymagany',
            pattern: 'Wprowadź poprawny adres e-mail'
        },
        message: {
            required: 'Wiadomość jest wymagana',
            minLength: 'Wiadomość musi mieć co najmniej 10 znaków',
            maxLength: 'Wiadomość nie może przekraczać 1000 znaków'
        }
    };
    
    // Validate single field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        const messages = validationMessages[fieldName];
        
        // Check required
        if (rules.required && (!value || value.trim() === '')) {
            return { isValid: false, message: messages.required };
        }
        
        // Check min length
        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: messages.minLength };
        }
        
        // Check max length
        if (rules.maxLength && value.length > rules.maxLength) {
            return { isValid: false, message: messages.maxLength };
        }
        
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: messages.pattern };
        }
        
        return { isValid: true, message: '' };
    }
    
    // Update field appearance based on validation
    function updateFieldAppearance(field, isValid, message) {
        const control = field.closest('.control');
        const help = control.nextElementSibling;
        
        // Remove existing validation classes
        field.classList.remove('is-success', 'is-danger');
        if (help && help.classList.contains('help')) {
            help.remove();
        }
        
        // Add appropriate classes
        if (isValid) {
            field.classList.add('is-success');
        } else {
            field.classList.add('is-danger');
            
            // Add help message
            const helpElement = document.createElement('p');
            helpElement.className = 'help is-danger';
            helpElement.textContent = message;
            control.parentNode.insertBefore(helpElement, control.nextSibling);
        }
    }
    
    // Real-time validation
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            const fieldName = field.name;
            const value = field.value.trim();
            const validation = validateField(fieldName, value);
            
            validationStates[fieldName] = validation;
            updateFieldAppearance(field, validation.isValid, validation.message);
        });
        
        field.addEventListener('input', () => {
            const fieldName = field.name;
            const value = field.value.trim();
            
            // Only show success state if field has been touched and is valid
            if (value && field.classList.contains('is-danger')) {
                const validation = validateField(fieldName, value);
                if (validation.isValid) {
                    updateFieldAppearance(field, true, '');
                }
            }
        });
    });
    
    // Check if form is valid
    function isFormValid() {
        return Object.values(validationStates).every(state => state.isValid);
    }
    
    // Show form status
    function showFormStatus(message, isSuccess = true) {
        const statusDiv = document.createElement('div');
        statusDiv.className = `notification ${isSuccess ? 'is-success' : 'is-danger'}`;
        statusDiv.innerHTML = `
            <button class="delete" onclick="this.parentElement.remove()"></button>
            ${message}
        `;
        
        const formContainer = contactForm.parentNode;
        formContainer.insertBefore(statusDiv, contactForm);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.remove();
            }
        }, 5000);
    }
    
    // Send message to Discord webhook
    async function sendEmail(formData) {
        // Check if Discord webhook is configured
        if (DISCORD_CONFIG.WEBHOOK_URL === "YOUR_DISCORD_WEBHOOK_URL") {
            // Use mailto fallback if Discord webhook is not configured
            try {
                const mailtoLink = `mailto:realinfinity2003@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                    `Tytuł: ${formData.title}\n\nWiadomość:\n${formData.message}\n\nOd: ${formData.email}`
                )}`;
                
                window.location.href = mailtoLink;
                
                return { 
                    success: true, 
                    message: 'E-mail został otwarty w Twojej aplikacji e-mail (Discord webhook nie jest skonfigurowany)' 
                };
            } catch (error) {
                return { 
                    success: false, 
                    message: 'Wystąpił błąd podczas wysyłania e-maila. Spróbuj ponownie później.' 
                };
            }
        }
        
        try {
            // Create Discord embed
            const embed = {
                title: "📧 Nowa wiadomość kontaktowa",
                color: 0x5439cc, // Your brand color
                fields: [
                    {
                        name: "👤 Od",
                        value: formData.email,
                        inline: true
                    },
                    {
                        name: "📝 Tytuł",
                        value: formData.title,
                        inline: true
                    },
                    {
                        name: "📋 Temat",
                        value: formData.subject,
                        inline: false
                    },
                    {
                        name: "💬 Wiadomość",
                        value: formData.message.length > 1024 
                            ? formData.message.substring(0, 1021) + "..." 
                            : formData.message,
                        inline: false
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: "Portfolio Contact Form"
                }
            };
            
            // Send to Discord webhook
            const response = await fetch(DISCORD_CONFIG.WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: "Portfolio Contact Bot",
                    avatar_url: "https://cdn.discordapp.com/avatars/123456789/avatar.png", // Optional: replace with your bot avatar
                    embeds: [embed]
                })
            });
            
            if (response.ok) {
                return { 
                    success: true, 
                    message: 'Wiadomość została wysłana pomyślnie! Otrzymasz odpowiedź w ciągu 24 godzin.' 
                };
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Discord Webhook Error:', error);
            
            // Fallback to mailto if Discord webhook fails
            try {
                const mailtoLink = `mailto:realinfinity2003@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                    `Tytuł: ${formData.title}\n\nWiadomość:\n${formData.message}\n\nOd: ${formData.email}`
                )}`;
                
                window.location.href = mailtoLink;
                
                return { 
                    success: true, 
                    message: 'E-mail został otwarty w Twojej aplikacji e-mail (fallback)' 
                };
            } catch (fallbackError) {
                return { 
                    success: false, 
                    message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' 
                };
            }
        }
    }
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let allValid = true;
        formFields.forEach(field => {
            const fieldName = field.name;
            const value = field.value.trim();
            const validation = validateField(fieldName, value);
            
            validationStates[fieldName] = validation;
            updateFieldAppearance(field, validation.isValid, validation.message);
            
            if (!validation.isValid) {
                allValid = false;
            }
        });
        
        if (!allValid) {
            showFormStatus('Proszę poprawić błędy w formularzu', false);
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.classList.add('is-loading');
        submitButton.disabled = true;
        
        // Prepare form data
        const formData = {
            title: contactForm.querySelector('input[name="title"]').value.trim(),
            subject: contactForm.querySelector('input[name="subject"]').value.trim(),
            email: contactForm.querySelector('input[name="email"]').value.trim(),
            message: contactForm.querySelector('textarea[name="message"]').value.trim()
        };
        
        try {
            const result = await sendEmail(formData);
            
            if (result.success) {
                showFormStatus(result.message, true);
                contactForm.reset();
                
                // Clear validation states
                Object.keys(validationStates).forEach(key => {
                    validationStates[key] = { isValid: false, message: '' };
                });
                
                // Clear field appearances
                formFields.forEach(field => {
                    field.classList.remove('is-success', 'is-danger');
                    const help = field.closest('.control').nextElementSibling;
                    if (help && help.classList.contains('help')) {
                        help.remove();
                    }
                });
            } else {
                showFormStatus(result.message, false);
            }
        } catch (error) {
            showFormStatus('Wystąpił nieoczekiwany błąd', false);
        } finally {
            // Reset button state
            submitButton.classList.remove('is-loading');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
    
    // Character counter for textarea
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        const counter = document.createElement('p');
        counter.className = 'help';
        counter.textContent = '0/1000 znaków';
        messageTextarea.parentNode.appendChild(counter);
        
        messageTextarea.addEventListener('input', () => {
            const length = messageTextarea.value.length;
            const maxLength = 1000;
            counter.textContent = `${length}/${maxLength} znaków`;
            
            if (length > maxLength * 0.9) {
                counter.classList.add('is-warning');
            } else {
                counter.classList.remove('is-warning');
            }
            
            if (length > maxLength) {
                counter.classList.add('is-danger');
            } else {
                counter.classList.remove('is-danger');
            }
        });
    }
}); 