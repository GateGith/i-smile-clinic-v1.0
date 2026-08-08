'use strict';

document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (!form) return;

const submitButton =
    form.querySelector('button[type="submit"]');

const setStatus = (message, type) => {

    if (!status) return;

    status.textContent = message;
    status.className =
        `form-status ${type || ''}`;

};

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }

    if (submitButton) {

        submitButton.disabled = true;
        submitButton.classList.add('is-loading');
        submitButton.dataset.originalText =
            submitButton.innerHTML;

        submitButton.innerHTML =
            '<span>Envoi en cours...</span>';
    }

    setStatus('', '');

    const formData = new FormData(form);

    try {

        const response = await fetch(
            form.action,
            {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        setStatus(
            'Votre demande a bien été envoyée. Nous vous recontacterons rapidement.',
            'success'
        );

        form.reset();

    } catch (error) {

        console.error(
            'Form error:',
            error
        );

        setStatus(
            'Une erreur est survenue. Veuillez nous contacter directement par téléphone ou WhatsApp.',
            'error'
        );

    } finally {

        if (submitButton) {

            submitButton.disabled = false;
            submitButton.classList.remove(
                'is-loading'
            );

            submitButton.innerHTML =
                submitButton.dataset.originalText ||
                'Envoyer la demande';
        }
    }
});

});
