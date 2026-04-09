// Typing effect for dynamic text
const typingContainer = document.querySelector('.typing-text span');
const words = ["Software Developer", "Cybersecurity Enthusiast", "Python Programmer"];
let wordIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (!typingContainer) return;

    if (charIndex < words[wordIndex].length) {
        typingContainer.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 120);
    } else {
        setTimeout(deleteEffect, 1000);
    }
}

function deleteEffect() {
    if (!typingContainer) return;

    if (charIndex > 0) {
        typingContainer.textContent = typingContainer.textContent.slice(0, -1);
        charIndex--;
        setTimeout(deleteEffect, 80);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (typingContainer) {
        typeEffect();
    }

    // Smooth scrolling only for same-page anchors
    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href") || "";
        if (href.startsWith("#")) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        }
    });
});
