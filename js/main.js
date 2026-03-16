/* ============================================
   FLUXO ENGENHARIA - Main JavaScript
   Navegacao, interacoes, conversao e acessibilidade
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = document.querySelector('.header__toggle');
  const nav = document.querySelector('.header__nav');
  const overlay = document.querySelector('.header__overlay');
  const header = document.querySelector('.header');
  const mobileDropdowns = [...document.querySelectorAll('.header__dropdown-toggle')];

  function closeMobileSubmenus() {
    mobileDropdowns.forEach((btn) => {
      const submenu = btn.nextElementSibling;
      submenu?.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('svg')?.style.removeProperty('transform');
    });
  }

  function openMenu() {
    if (!toggle || !nav) return;
    nav.classList.add('open');
    toggle.classList.add('active');
    overlay?.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!toggle || !nav) return;
    nav.classList.remove('open');
    toggle.classList.remove('active');
    overlay?.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    closeMobileSubmenus();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay?.addEventListener('click', closeMenu);

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (link.classList.contains('header__dropdown-toggle')) return;
        if (window.innerWidth < 1024) {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    });
  }

  mobileDropdowns.forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', (event) => {
      if (window.innerWidth >= 1024) return;

      event.preventDefault();
      const submenu = btn.nextElementSibling;
      const isOpen = submenu?.classList.contains('open');
      const svg = btn.querySelector('svg');

      closeMobileSubmenus();
      if (!isOpen) {
        submenu?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');

        if (svg) {
          svg.style.transform = 'rotate(180deg)';
        }
      }
    });
  });

  if (header) {
    const syncHeaderState = () => {
      header.classList.toggle('header--scrolled', window.scrollY > 10);
    };

    syncHeaderState();
    window.addEventListener('scroll', syncHeaderState, { passive: true });
  }

  const lightboxOverlay = document.getElementById('lightbox');
  const lightboxImg = lightboxOverlay?.querySelector('img');
  const lightboxClose = lightboxOverlay?.querySelector('.lightbox-close');

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('active');
    body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();

      if (!lightboxOverlay || !lightboxImg) return;

      const src = element.getAttribute('href') || element.getAttribute('data-lightbox');
      const preview = element.querySelector('img');

      lightboxImg.src = src || '';
      lightboxImg.alt = preview?.alt || 'Imagem ampliada';
      lightboxOverlay.classList.add('active');
      body.style.overflow = 'hidden';
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxOverlay?.addEventListener('click', (event) => {
    if (event.target === lightboxOverlay) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (lightboxOverlay?.classList.contains('active')) {
      closeLightbox();
    }

    if (nav?.classList.contains('open')) {
      closeMenu();
    }
  });

  function setupSlider({ items, indicators, backgrounds, previousButton, nextButton, intervalMs, datasetKey }) {
    if (!items.length || items.length < 2) return;

    let currentIndex = 0;
    let timerId;

    const updateSlide = (index) => {
      items[currentIndex]?.classList.remove('active');
      indicators[currentIndex]?.classList.remove('active');
      backgrounds[currentIndex]?.classList.remove('active');

      currentIndex = ((index % items.length) + items.length) % items.length;

      items[currentIndex]?.classList.add('active');
      indicators[currentIndex]?.classList.add('active');
      backgrounds[currentIndex]?.classList.add('active');
    };

    const restartAutoplay = () => {
      window.clearInterval(timerId);
      timerId = window.setInterval(() => updateSlide(currentIndex + 1), intervalMs);
    };

    indicators.forEach((indicator) => {
      indicator.addEventListener('click', () => {
        const targetIndex = Number.parseInt(indicator.dataset[datasetKey], 10);
        updateSlide(Number.isNaN(targetIndex) ? 0 : targetIndex);
        restartAutoplay();
      });
    });

    previousButton?.addEventListener('click', () => {
      updateSlide(currentIndex - 1);
      restartAutoplay();
    });

    nextButton?.addEventListener('click', () => {
      updateSlide(currentIndex + 1);
      restartAutoplay();
    });

    restartAutoplay();
  }

  // Hero background slideshow (apenas imagens, sem texto)
  setupSlider({
    items: [...document.querySelectorAll('.hero__bg')],
    indicators: [],
    backgrounds: [],
    intervalMs: 5000,
    datasetKey: 'bg'
  });


  document.querySelectorAll('.faq__item').forEach((item, index) => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    if (!question || !answer) return;

    const answerId = `faq-answer-${index + 1}`;
    question.setAttribute('aria-controls', answerId);
    question.setAttribute('aria-expanded', 'false');
    answer.id = answerId;
    answer.hidden = true;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq__item').forEach((faqItem) => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
        const faqAnswer = faqItem.querySelector('.faq__answer');
        if (faqAnswer) faqAnswer.hidden = true;
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });

  const filterButtons = document.querySelectorAll('.portfolio-filter');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterButtons.length && portfolioCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        portfolioCards.forEach((card) => {
          const shouldShow = filter === 'todos' || card.dataset.sector === filter;
          card.classList.toggle('hidden', !shouldShow);
        });
      });
    });
  }

  const phoneInput = document.getElementById('telefone');

  if (phoneInput) {
    const formatPhone = (value) => {
      const digits = value.replace(/\D/g, '').slice(0, 11);

      if (digits.length <= 2) return digits;
      if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    };

    phoneInput.addEventListener('input', () => {
      phoneInput.value = formatPhone(phoneInput.value);
    });
  }

  const contactForm = document.querySelector('[data-contact-form]');
  const formStatus = document.getElementById('form-status');

  const setFormStatus = (message, type = 'info') => {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form-status is-visible is-${type}`;
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const phone = String(contactForm.getAttribute('data-whatsapp') || '').replace(/\D/g, '');

      const payload = {
        nome: String(formData.get('nome') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        telefone: String(formData.get('telefone') || '').trim(),
        origem: String(formData.get('origem') || 'Nao informado').trim(),
        mensagem: String(formData.get('mensagem') || '').trim()
      };

      if (!payload.nome || !payload.email || !payload.telefone || !payload.mensagem || !phone) {
        setFormStatus('Preencha os campos obrigatorios para continuar.', 'info');
        return;
      }

      const message = [
        'Ola, equipe Fluxo Engenharia.',
        '',
        'Gostaria de solicitar atendimento tecnico.',
        '',
        `Nome: ${payload.nome}`,
        `Email: ${payload.email}`,
        `Telefone: ${payload.telefone}`,
        `Origem do contato: ${payload.origem}`,
        '',
        'Mensagem:',
        payload.mensagem
      ].join('\n');

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      setFormStatus('Abrindo o WhatsApp com sua mensagem estruturada...', 'success');

      const popup = window.open(whatsappUrl, '_blank', 'noopener');
      if (!popup) {
        window.location.href = whatsappUrl;
      }
    });
  }

  document.querySelectorAll('.footer__bottom p').forEach((paragraph) => {
    paragraph.innerHTML = paragraph.innerHTML.replace(/\b2025\b/g, String(new Date().getFullYear()));
  });

  const animatedElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((element) => observer.observe(element));
  } else {
    animatedElements.forEach((element) => element.classList.add('visible'));
  }

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length && 'IntersectionObserver' in window) {
    const formatNumber = (num) => {
      return num >= 1000 ? num.toLocaleString('pt-BR') : String(num);
    };

    const animateCounter = (element) => {
      const target = parseInt(element.dataset.count, 10);
      const duration = 2000;
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        element.textContent = formatNumber(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // Timeline scroll animation
  const timelineItems = document.querySelectorAll('.timeline__item');

  if ('IntersectionObserver' in window && timelineItems.length) {
    const timelineObserver = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px'
    });

    timelineItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 150}ms`;
      timelineObserver.observe(item);
    });
  }

});
