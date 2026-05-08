document.querySelectorAll('.faq').forEach(faq => {
  faq.addEventListener('click', () => {
    faq.querySelector('p').classList.toggle('hidden');
  });
});
