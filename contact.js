document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire

    // Récupère les valeurs des champs
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (name && email && message) {
      alert(`Merci ${name}, votre message a été envoyé avec succès !`);
      contactForm.reset(); // Réinitialise le formulaire
    } else {
      alert("Veuillez remplir tous les champs du formulaire.");
    }
  });
});

// Fonction pour remonter en haut de la page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
