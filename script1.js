// Typing effect for dynamic text
const typingTarget = document.querySelector('.typing-text span');
const words = ["Software Developer", "Cybersecurity Enthusiast", "Python Programmer"];
let wordIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (!typingTarget) return;

    if (charIndex < words[wordIndex].length) {
        typingTarget.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 120);
    } else {
        setTimeout(deleteEffect, 900);
    }
}

function deleteEffect() {
    if (!typingTarget) return;

    if (charIndex > 0) {
        typingTarget.textContent = typingTarget.textContent.slice(0, -1);
        charIndex--;
        setTimeout(deleteEffect, 70);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 400);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();

    // Smooth scrolling only for internal hash links
    document.querySelectorAll("nav a[href^='#']").forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });
});
