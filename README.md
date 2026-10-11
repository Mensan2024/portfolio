# Moréno CODJIA — Portfolio professionnel

Portfolio statique, responsive et prêt à être publié avec **GitHub Pages**. Aucun build ni dépendance npm requis.

## Contenu

- `index.html` — sections, catalogue de 35 projets planifiés, parcours, vidéo et contact.
- `styles.css` — identité visuelle et mise en page responsive.
- `script.js` — menu mobile, filtres de projets, animations d'apparition et intégration vidéo.
- `assets/favicon.svg` — icône du site.

## Prévisualiser localement

Depuis le dossier du projet :

```bash
python3 -m http.server 8000
```

Ouvrir ensuite <http://localhost:8000>.

## Publier sur GitHub Pages

1. Créer un dépôt public, par exemple `portfolio` ou `Mensan2024.github.io`.
2. Copier les fichiers du projet à la racine du dépôt.
3. Faire un commit et pousser vers GitHub :

```bash
git init
git add .
git commit -m "feat: launch professional portfolio"
git branch -M main
git remote add origin https://github.com/Mensan2024/portfolio.git
git push -u origin main
```

4. Dans GitHub : **Settings → Pages → Build and deployment → Deploy from a branch**.
5. Sélectionner `main` et `/ (root)`, puis enregistrer. L'URL sera affichée dans la section Pages.

Si le dépôt s'appelle exactement `Mensan2024.github.io`, GitHub Pages peut publier le site à la racine de ce domaine utilisateur. Sinon, l'URL sera généralement `https://mensan2024.github.io/portfolio/`.

## Ajouter la vidéo de présentation

1. Filmer une vidéo de 60 à 90 secondes en français, puis ajouter des sous-titres anglais si possible.
2. Publier la vidéo sur YouTube (publique ou non répertoriée selon le niveau de confidentialité souhaité).
3. Ouvrir `script.js` et remplacer la valeur vide :

```js
const VIDEO_YOUTUBE_ID = "";
```

par l'identifiant de la vidéo, par exemple :

```js
const VIDEO_YOUTUBE_ID = "AbCdEf12345";
```

L'identifiant est la partie après `v=` dans une URL YouTube standard. Ne coller que l'identifiant, pas toute l'URL.

## Catalogue actuel

Le portfolio affiche 35 projets planifiés répartis en six domaines : 5 Linux/serveurs, 5 Windows Server, 5 Full Stack, 5 développement web (dont WordPress), 10 cybersécurité et 5 Python. Ils constituent une feuille de route, et non une liste de réalisations terminées. Après chaque réalisation, ajouter les preuves, tests, captures expurgées et dépôt correspondant.

## Ajouter un projet chaque jour

Pour chaque nouveau projet :

1. Créer un dépôt séparé avec un nom descriptif (`linux-hardening-lab`, `ospf-enterprise-lab`, etc.).
2. Ajouter un `README.md` contenant : problème, objectifs, architecture, prérequis, étapes, tests, résultats, limites et références.
3. Ajouter uniquement des captures expurgées de secrets et données personnelles.
4. Dans `index.html`, dupliquer une carte `.project-card`, choisir sa catégorie (`linux`, `windows`, `fullstack`, `web`, `security` ou `python`), puis renseigner le titre, la description et les technologies.
5. Garder le statut « PLANIFIÉ » jusqu’au début du travail, puis le mettre à jour avec honnêteté lorsque le projet avance. Ajouter un lien GitHub réel seulement lorsque le dépôt existe.
6. Mettre à jour les nombres/labels si nécessaire et pousser le commit.

## Avant publication

- Vérifier le numéro de téléphone et les coordonnées que tu souhaites rendre publics ; le site utilise actuellement l'adresse e-mail et le compte GitHub indiqués dans le CV fourni.
- Ajouter une vraie photo professionnelle seulement si tu le souhaites.
- Mettre à jour le lien LinkedIn dans `index.html` avec ton profil exact.
- Ajouter un lien vers un CV PDF **expurgé des coordonnées de références personnelles** si tu veux le rendre téléchargeable.
- Ne publier aucune configuration client, adresse IP sensible, mot de passe, clé API, donnée interne ou capture contenant des informations confidentielles.
- Les projets « À documenter » / « À construire » sont des pistes proposées : ne les présenter comme terminés qu'après réalisation et validation.
- Vérifier les dates de formation et d'expérience avant mise en ligne, notamment la mention du Master 2 et de la soutenance.

## Accessibilité et vie privée

Le site comprend un lien d'évitement, des libellés de navigation, une prise en charge de `prefers-reduced-motion` et charge la vidéo uniquement lorsqu'un identifiant valide est configuré. Google Fonts est chargé depuis un service externe ; retirer les liens Google Fonts du `<head>` si tu préfères une version sans requêtes vers ce fournisseur.
