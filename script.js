(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.project-card[data-category]')];
  filters.forEach(filter => filter.addEventListener('click', () => {
    const category = filter.dataset.filter;
    filters.forEach(button => button.classList.toggle('active', button === filter));
    cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ---------------------------------------------------------------
  // Sélecteur de thème de couleur
  // ---------------------------------------------------------------
  const picker = document.querySelector('.theme-picker');
  const themeToggle = picker ? picker.querySelector('.theme-toggle') : null;
  const swatches = [...document.querySelectorAll('[data-theme-choice]')];

  const setTheme = name => {
    if (name === 'mint') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', name);
    swatches.forEach(s => s.classList.toggle('active', s.dataset.themeChoice === name));
    try { localStorage.setItem('theme', name); } catch (e) {}
  };

  let savedTheme = 'mint';
  try { savedTheme = localStorage.getItem('theme') || 'mint'; } catch (e) {}
  setTheme(savedTheme);

  if (picker && themeToggle) {
    const closePicker = () => {
      picker.classList.remove('open');
      themeToggle.setAttribute('aria-expanded', 'false');
    };
    themeToggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = picker.classList.toggle('open');
      themeToggle.setAttribute('aria-expanded', String(open));
    });
    swatches.forEach(s => s.addEventListener('click', () => {
      setTheme(s.dataset.themeChoice);
      closePicker();
    }));
    document.addEventListener('click', e => { if (!picker.contains(e.target)) closePicker(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePicker(); });
  }

  // Optional: replace with the 11-character ID of your YouTube presentation.
  const VIDEO_YOUTUBE_ID = '';
  const frame = document.getElementById('video-frame');
  if (frame && /^[A-Za-z0-9_-]{11}$/.test(VIDEO_YOUTUBE_ID)) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${VIDEO_YOUTUBE_ID}`;
    iframe.title = 'Présentation professionnelle de Moréno CODJIA';
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
  }
})();