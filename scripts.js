document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const sendEmailButton = document.getElementById('send-email');
    const copyEmailButton = document.getElementById('copy-email');
    const myEmail = 'andresfelipemoralesmejia@gmail.com';

    sendEmailButton.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name === '' || email === '' || message === '') {
            alert('Por favor completa todos los campos.');
            return;
        }

        const mailtoLink = `mailto:${myEmail}?subject=Mensaje de ${name}&body=${encodeURIComponent(message)}%0A%0ADe: ${name} (${email})`;
        window.location.href = mailtoLink;
    });

    copyEmailButton.addEventListener('click', () => {
        navigator.clipboard.writeText(myEmail).then(() => {
            alert('Correo copiado al portapapeles');
        }, () => {
            alert('Error al copiar el correo');
        });
    });
});
