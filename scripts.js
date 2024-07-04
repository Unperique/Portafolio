document.addEventListener('DOMContentLoaded', () => {
    const myEmail = 'andresfelipemoralesmejia@gmail.com';
    let selectedLanguage = localStorage.getItem('selectedLanguage') || 'es';

    const loadLanguage = (lang) => {
        fetch(`${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Se pudo cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                updateContent(data);
                updateHeader(data);
                setupFormListeners();
            })
            .catch(error => console.error('Error al cargar archivo JSON:', error));
    };

    const updateContent = (data) => {
        document.getElementById('about').innerHTML = `
            <img src="Images/yo.jpg" alt="Foto de Andres Felipe Morales Mejia" class="profile-photo">
            <h1>${data.about.title}</h1>
            <p>${data.about.content}</p>
            <h1>${data.about.hobbies_title}</h1>
            <p>${data.about.hobbies_content}</p>
        `;

        document.getElementById('projects').innerHTML = data.projects.items.map(item => `
            <div class="project">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        `).join('');

        document.getElementById('skills').innerHTML = `
            <h1>${data.skills.soft_skills.title}</h1>
            <ul>
                ${data.skills.soft_skills.items.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            <h1>${data.skills.technical_skills.title}</h1>
            <div class="languages">
                ${data.skills.technical_skills.items.map(language => `
                    <img src="Images/${language.toLowerCase()}.png" alt="${language}">
                `).join('')}
            </div>
        `;

        document.getElementById('contact').innerHTML = `
            <h1>${data.contact.title}</h1>
            <form id="contact-form">
                <label for="name">${data.contact.form_labels.name}</label>
                <input type="text" id="name" name="name">
                <label for="email">${data.contact.form_labels.email}</label>
                <input type="email" id="email" name="email">
                <label for="message">${data.contact.form_labels.message}</label>
                <textarea id="message" name="message"></textarea>
                <button type="submit" id="send-email">${data.contact.buttons.submit}</button>
                <button type="button" id="copy-email">${data.contact.buttons.copy_email}</button>
                <div class="contact-links">
                    <a href="https://github.com/Unperique" target="_blank">
                        <img src="Images/github.png" alt="GitHub">
                    </a>
                    <a href="https://www.linkedin.com/in/andres-felipe-morales-20b944213/" target="_blank">
                        <img src="Images/linkedin.png" alt="LinkedIn">
                    </a>
                </div>
            </form>
        `;
    };

    const updateHeader = (data) => {
        const headerNav = document.querySelector('header nav ul');
        headerNav.innerHTML = data.header.nav_links.map(link => `<li><a href="#${link.id}">${link.text}</a></li>`).join('');

        const langSelect = document.getElementById('lang-select');
        if (data.header.language_select && data.header.language_select.options) {
            langSelect.innerHTML = data.header.language_select.options.map(option => `<option value="${option.value}">${option.text}</option>`).join('');
            langSelect.previousElementSibling.textContent = data.header.language_select.label;
        }
    };

    const setupFormListeners = () => {
        const sendEmailButton = document.getElementById('send-email');
        const copyEmailButton = document.getElementById('copy-email');

        sendEmailButton.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Por favor completa todos los campos.');
                return;
            }

            const mailtoLink = `mailto:${myEmail}?subject=Mensaje de ${name}&body=${encodeURIComponent(message)}%0A%0ADe: ${name} (${email})`;
            window.location.href = mailtoLink;
        });

        copyEmailButton.addEventListener('click', () => {
            navigator.clipboard.writeText(myEmail)
                .then(() => alert('Correo copiado al portapapeles'))
                .catch(() => alert('Error al copiar el correo'));
        });
    };

    // Cargar idioma por defecto al inicio
    loadLanguage(selectedLanguage);

    // Manejar cambio de idioma
    document.getElementById('lang-select').addEventListener('change', function() {
        selectedLanguage = this.value;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        loadLanguage(selectedLanguage);
    });
});
