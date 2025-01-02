// Typing effect for dynamic text
const typingText = document.querySelector('.typing-text span');
const words = ["Software Developer", "Cybersecurity Enthusiast", "Python Programmer"];
let wordIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < words[wordIndex].length) {
        typingText.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 150);
    } else {
        setTimeout(deleteEffect, 1000);
    }
}

function deleteEffect() {
    if (charIndex > 0) {
        typingText.textContent = typingText.textContent.slice(0, -1);
        charIndex--;
        setTimeout(deleteEffect, 100);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();

    // Smooth scrolling for navigation links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});
