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

  // Portrait : légère inclinaison 3D qui suit la souris (ordinateur uniquement)
  const portrait = document.querySelector('.portrait');
  if (portrait && window.matchMedia('(hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    portrait.addEventListener('mousemove', e => {
      const r = portrait.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      portrait.style.setProperty('--rx', `${(x * 10).toFixed(2)}deg`);
      portrait.style.setProperty('--ry', `${(-y * 10).toFixed(2)}deg`);
    });
    portrait.addEventListener('mouseleave', () => {
      portrait.style.setProperty('--rx', '0deg');
      portrait.style.setProperty('--ry', '0deg');
    });
  }

  // ---------------------------------------------------------------
  // Effets modernes : apparition au défilement, barre de progression,
  // lueur qui suit la souris sur les cartes, texte qui s'écrit seul
  // ---------------------------------------------------------------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    document.documentElement.classList.add('js');
    const revealIO = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); }
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.reveal').forEach(el => {
      const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      el.style.setProperty('--i', Math.min(sibs.indexOf(el), 6));
      revealIO.observe(el);
    });
  }

  const bar = document.querySelector('.scroll-progress');
  if (bar) {
    const upd = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(window.scrollY / h, 1) : 0})`;
    };
    upd();
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
  }

  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('pointermove', e => {
      const card = e.target.closest && e.target.closest('.expertise-card, .real-card, .project-card, .stat-row > div, .education-panel, .skill');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  const typed = document.querySelector('.typed');
  if (typed) {
    const words = (typed.dataset.words || '').split('|').filter(Boolean);
    if (reduceMotion || !words.length) { typed.textContent = words[0] || ''; }
    else {
      let w = 0, c = 0, del = false;
      const step = () => {
        const word = words[w];
        c += del ? -1 : 1;
        typed.textContent = word.slice(0, c);
        let wait = del ? 35 : 75;
        if (!del && c === word.length) { del = true; wait = 1500; }
        else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
        setTimeout(step, wait);
      };
      step();
    }
  }

  // Bandeau défilant : s'adapte à la largeur de l'écran
  const tickerTrack = document.querySelector('.ticker-track');
  const tickerGroup = tickerTrack ? tickerTrack.querySelector('.ticker-group') : null;
  if (tickerGroup) {
    const buildTicker = () => {
      tickerTrack.querySelectorAll('.ticker-group[aria-hidden]').forEach(g => g.remove());
      const gw = tickerGroup.getBoundingClientRect().width;
      if (!gw) return;
      const total = Math.max(2, 2 * Math.ceil(window.innerWidth / gw)); // nombre pair de groupes
      for (let n = 1; n < total; n++) {
        const clone = tickerGroup.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        tickerTrack.appendChild(clone);
      }
      tickerTrack.style.setProperty('--ticker-duration', `${Math.round((gw * total / 2) / 55)}s`);
    };
    let tickerTimer;
    const rebuild = () => { clearTimeout(tickerTimer); tickerTimer = setTimeout(buildTicker, 150); };
    buildTicker();
    window.addEventListener('load', buildTicker);
    window.addEventListener('resize', rebuild);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildTicker);
  }

  // Compteurs animés (page projets)
  const counters = [...document.querySelectorAll('[data-count]')];
  if (counters.length && 'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const end = +en.target.dataset.count, t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / 1200, 1);
        en.target.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: .6 });
    counters.forEach(c => io.observe(c));
  }

  // ---------------------------------------------------------------
  // Vidéo YouTube
  // Renseignez le lien OU l'identifiant dans index.html :
  //   <div class="video-frame" id="video-frame" data-youtube="https://youtu.be/XXXXXXXXXXX">
  // Formats acceptés : watch?v=…, youtu.be/…, /embed/…, /shorts/… ou l'ID seul.
  // ---------------------------------------------------------------
  const extractYoutubeId = value => {
    const input = (value || '').trim();
    if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
    try {
      const url = new URL(input);
      const host = url.hostname.replace(/^www\.|^m\./, '');
      let id = '';
      if (host === 'youtu.be') id = url.pathname.slice(1).split('/')[0];
      else if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
        id = url.searchParams.get('v') || '';
        if (!id) {
          const m = url.pathname.match(/\/(?:embed|shorts|live|v)\/([A-Za-z0-9_-]{11})/);
          if (m) id = m[1];
        }
      }
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : '';
    } catch (e) { return ''; }
  };

  const frame = document.getElementById('video-frame');
  if (frame) {
    const raw = frame.dataset.youtube;
    const id = extractYoutubeId(raw);
    const watchUrl = id ? `https://www.youtube.com/watch?v=${id}` : '';

    const showNotice = (title, text, href) => {
      const box = document.createElement('div');
      box.className = 'video-placeholder';
      box.innerHTML = '<div class="video-play">▶</div><h3></h3><p></p>';
      box.querySelector('h3').textContent = title;
      box.querySelector('p').textContent = text;
      if (href) {
        const a = document.createElement('a');
        a.className = 'button button-primary video-fallback';
        a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.textContent = 'Regarder sur YouTube ↗';
        box.appendChild(a);
      }
      frame.replaceChildren(box);
    };

    if (!id) {
      console.warn('[Vidéo] data-youtube est vide ou invalide :', raw);
      if (raw && raw.trim()) {
        showNotice('Lien YouTube non reconnu', 'Vérifiez la valeur de data-youtube dans index.html.');
      }
    } else if (location.protocol === 'file:') {
      // YouTube refuse l'intégration sur une page ouverte en double-clic (erreur 153)
      showNotice('Vidéo de présentation', 'Aperçu local : la lecture intégrée fonctionnera une fois le site en ligne.', watchUrl);
    } else {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?rel=0`;
      iframe.title = 'Présentation professionnelle de Moréno CODJIA';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
      const under = frame.parentElement.querySelector('.video-under');
      if (under) {
        const link = document.createElement('a');
        link.href = watchUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
        link.textContent = 'Ouvrir sur YouTube ↗';
        under.appendChild(link);
      }
    }
  }
})();
