const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

function showFormMessage(message, type) {
    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;
    formMessage.className = type;
}

function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}

export function initContactForm() {
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const fullName = document.querySelector("#full-name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value;
        const message = document.querySelector("#message").value.trim();

        if (fullName === "") {
            showFormMessage("Please enter your name.", "error-message");
            return;
        }

        if (email === "") {
            showFormMessage("Please enter your email address.", "error-message");
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage("Please enter a valid email address.", "error-message");
            return;
        }

        if (subject === "") {
            showFormMessage("Please choose a subject.", "error-message");
            return;
        }

        if (message === "") {
            showFormMessage("Please write a message.", "error-message");
            return;
        }

        showFormMessage("Message sent successfully!", "success-message");
        contactForm.reset();
    });
}