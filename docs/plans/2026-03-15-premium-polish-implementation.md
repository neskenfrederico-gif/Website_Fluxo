# Premium Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign visual premium do site Fluxo Engenharia mantendo paleta de cores e base de codigo existente.

**Architecture:** Modificacoes progressivas nos 6 arquivos CSS + main.js + atualizacao do Google Fonts em todos os HTMLs. Cada task eh independente e testavel visualmente. Nao ha testes automatizados — verificacao eh visual no navegador.

**Tech Stack:** HTML5, CSS3 (custom properties, backdrop-filter, clamp, cubic-bezier), Vanilla JS, Google Fonts (Inter + Poppins)

---

## Task 1: Adicionar fonte Inter e atualizar tokens

**Files:**
- Modify: `css/tokens.css` (arquivo de variaveis — NAO foi possivel ler por permissao, mas existe e contem as variaveis CSS)
- Modify: `css/reset.css:26-28` (font-family do body)
- Modify: `index.html:19-22` (Google Fonts link)
- Modify: `empresa.html` (Google Fonts link)
- Modify: `contato.html` (Google Fonts link)
- Modify: `obras.html` (Google Fonts link)
- Modify: `servicos.html` (Google Fonts link)
- Modify: `404.html` (Google Fonts link)
- Modify: todos os arquivos em `projetos/` e `servicos/` e `setores/` (Google Fonts link)

**Step 1: Atualizar Google Fonts em todos os HTMLs**

Em TODOS os arquivos HTML, trocar a linha do Google Fonts:

Antigo:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Novo:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
```

Arquivos a modificar:
- `index.html`
- `empresa.html`
- `contato.html`
- `obras.html`
- `servicos.html`
- `404.html`
- `projetos/geolab.html`
- `projetos/brainfarma.html`
- `projetos/active-ontex.html`
- `projetos/hypera.html`
- `projetos/hypermarcas.html`
- `projetos/louis-dreyfus.html`
- `projetos/savoy.html`
- `servicos/ar-condicionado-industrial.html`
- `servicos/salas-limpas.html`
- `servicos/controle-temperatura.html`
- `servicos/automacao-hvac.html`
- `servicos/dutos-ventilacao.html`
- `servicos/central-agua-gelada.html`
- `servicos/uta-tratamento-ar.html`
- `servicos/montagem-mecanica.html`
- `setores/farmaceutico.html`
- `setores/industrial.html`
- `setores/laboratorios.html`
- `setores/logistica.html`
- `setores/alimenticio.html`
- `setores/cosmeticos.html`

**Step 2: Atualizar tokens CSS**

No `css/tokens.css`, atualizar/adicionar estas variaveis:

```css
/* Tipografia — atualizar */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-display: 'Poppins', 'Inter', sans-serif;
--font-size-base: 1.0625rem;

/* Transicoes — atualizar */
--transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-base: 300ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-slow: 500ms cubic-bezier(0.16, 1, 0.3, 1);

/* Sombras — atualizar para tom azulado */
--shadow-sm: 0 2px 8px rgba(34, 56, 76, 0.06);
--shadow-md: 0 12px 32px rgba(34, 56, 76, 0.08);
--shadow-lg: 0 20px 48px rgba(34, 56, 76, 0.1);
--shadow-xl: 0 28px 56px rgba(34, 56, 76, 0.14);

/* Border radius — atualizar */
--radius-xl: 24px;
--radius-lg: 18px;
--radius-md: 12px;

/* Novos tokens — adicionar */
--glass-bg: rgba(255, 255, 255, 0.72);
--glass-blur: blur(20px);
--glass-border: 1px solid rgba(255, 255, 255, 0.18);
--easing-spring: cubic-bezier(0.16, 1, 0.3, 1);
```

**Step 3: Verificar visualmente**

Abrir `index.html` no navegador. Verificar:
- Corpo do texto em Inter (mais fina, mais legivel)
- Headings em Poppins (mais bold, display)
- Sombras com tom azulado (mais sofisticado que preto)
- Transicoes mais organicas

**Step 4: Commit**

```bash
git add css/tokens.css css/reset.css index.html empresa.html contato.html obras.html servicos.html 404.html projetos/ servicos/ setores/
git commit -m "feat: adicionar fonte Inter e atualizar tokens para premium polish"
```

---

## Task 2: Trocar background grid por dot pattern

**Files:**
- Modify: `css/reset.css:12-23`

**Step 1: Substituir grid background no html**

Em `css/reset.css`, substituir o background do `html`:

Antigo:
```css
html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
  scroll-behavior: smooth;
  background:
    linear-gradient(180deg, rgba(232, 239, 244, 0.55) 0%, rgba(244, 247, 248, 0) 220px),
    linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), var(--color-grid-line) calc(100% - 1px)),
    linear-gradient(transparent 0, transparent calc(100% - 1px), var(--color-grid-line) calc(100% - 1px));
  background-size: auto, 24px 24px, 24px 24px;
  background-position: 0 0, center top, center top;
}
```

Novo:
```css
html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
  scroll-behavior: smooth;
  background:
    linear-gradient(180deg, rgba(232, 239, 244, 0.55) 0%, rgba(244, 247, 248, 0) 220px),
    radial-gradient(circle, rgba(34, 56, 76, 0.07) 1px, transparent 1px);
  background-size: auto, 28px 28px;
  background-position: 0 0, 14px 14px;
}
```

**Step 2: Atualizar grid nos pseudo-elements**

Buscar em `css/components.css` e `css/pages.css` todas as ocorrencias de grid lines em `::after` e trocar por dot pattern. Os principais sao:

Em `.hero::after` (components.css):
```css
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  mix-blend-mode: soft-light;
  opacity: 0.5;
  pointer-events: none;
}
```

Em `.page-header::after` (pages.css):
```css
.page-header::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.5;
  pointer-events: none;
}
```

Em `.hub-cta::after` (pages.css):
```css
.hub-cta::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.4;
  pointer-events: none;
}
```

Em `.hero__panel::after` (components.css):
```css
.hero__panel::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.2;
  pointer-events: none;
}
```

**Step 3: Verificar visualmente**

Verificar que dots sao discretos e uniformes em todas as secoes.

**Step 4: Commit**

```bash
git add css/reset.css css/components.css css/pages.css
git commit -m "feat: trocar grid lines por dot pattern em todo o site"
```

---

## Task 3: Header premium com glassmorphism e animacoes

**Files:**
- Modify: `css/components.css:7-180` (secao HEADER)

**Step 1: Atualizar estilos do header**

Substituir o bloco `.header` e `.header--scrolled`:

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(216, 225, 232, 0.5);
  box-shadow: 0 4px 20px rgba(34, 56, 76, 0.04);
  transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.header--scrolled {
  background: rgba(255, 255, 255, 0.92);
  border-bottom-color: rgba(216, 225, 232, 0.85);
  box-shadow: 0 12px 40px rgba(34, 56, 76, 0.1);
}

.header--scrolled .header__inner {
  min-height: 60px;
}

.header--scrolled .header__logo img {
  transform: scale(0.88);
  transform-origin: left center;
}
```

**Step 2: Ativar tagline do logo em desktop**

Substituir `.header__logo::after`:

```css
.header__logo::after {
  content: 'Engenharia HVAC Industrial';
  display: none;
  padding-left: var(--space-md);
  margin-left: var(--space-md);
  border-left: 1px solid rgba(142, 166, 186, 0.36);
  color: var(--color-text-secondary);
  font-size: 0.72rem;
  font-weight: var(--fw-semibold);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

@media (min-width: 1024px) {
  .header__logo::after {
    display: block;
    opacity: 1;
  }

  .header--scrolled .header__logo::after {
    opacity: 0;
    display: none;
  }
}
```

**Step 3: Adicionar transicao no logo img**

```css
.header__logo img {
  height: 48px;
  width: auto;
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Step 4: Links com underline animado**

Encontrar os estilos de `.header__link` e adicionar/substituir:

```css
.header__link {
  position: relative;
  padding: 8px 14px;
  font-size: var(--font-size-sm);
  font-weight: var(--fw-medium);
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-fast);
  border-radius: var(--radius-sm);
}

.header__link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 1px;
  transition: width 300ms cubic-bezier(0.16, 1, 0.3, 1), left 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.header__link:hover::after,
.header__link--active::after {
  width: 60%;
  left: 20%;
}

.header__link:hover {
  color: var(--color-primary);
}

.header__link--active {
  color: var(--color-primary);
  font-weight: var(--fw-semibold);
}
```

Remover o estilo antigo de `.header__link--active` com pill laranja (em pages.css tambem se existir override para `.page-home .header__link--active`):

Em `pages.css`, substituir:
```css
.page-home .header__link--active:not(.header__link--cta) {
  color: var(--color-primary);
  font-weight: var(--fw-semibold);
}

.page-home .header__link--active:not(.header__link--cta):hover {
  color: var(--color-primary-dark);
}
```

**Step 5: Dropdown com animacao suave**

Atualizar `.header__submenu`:

```css
.header__submenu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px) scale(0.98);
  transition: opacity 250ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 250ms cubic-bezier(0.16, 1, 0.3, 1),
              visibility 250ms;
}

.header__dropdown:hover .header__submenu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}
```

**Step 6: Mobile menu com stagger e blur overlay**

Atualizar `.header__overlay`:
```css
.header__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms ease, visibility 300ms;
  z-index: calc(var(--z-sticky) - 1);
}

.header__overlay.active {
  opacity: 1;
  visibility: visible;
}
```

Adicionar stagger para items do menu mobile:
```css
@media (max-width: 1023px) {
  .header__nav.open .header__menu li {
    opacity: 0;
    transform: translateX(20px);
    animation: slideInRight 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .header__nav.open .header__menu li:nth-child(1) { animation-delay: 50ms; }
  .header__nav.open .header__menu li:nth-child(2) { animation-delay: 100ms; }
  .header__nav.open .header__menu li:nth-child(3) { animation-delay: 150ms; }
  .header__nav.open .header__menu li:nth-child(4) { animation-delay: 200ms; }
  .header__nav.open .header__menu li:nth-child(5) { animation-delay: 250ms; }
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Step 7: Verificar header em desktop e mobile**

Testar: scroll down (header compacta), hover nos links (underline), dropdown (animacao), menu mobile (stagger).

**Step 8: Commit**

```bash
git add css/components.css css/pages.css
git commit -m "feat: header premium com glassmorphism, underline animado e stagger mobile"
```

---

## Task 4: Hero com crossfade cinematografico e indicadores de progresso

**Files:**
- Modify: `css/components.css` (secao HERO)
- Modify: `js/main.js:146-206` (slider setup)

**Step 1: Atualizar CSS do hero background para crossfade + zoom**

Substituir `.hero__bg` e `.hero__bg.active`:

```css
.hero__bg {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero__bg.active {
  opacity: 1;
}

.hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: heroZoomOut 6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes heroZoomOut {
  from {
    transform: scale(1.08);
  }
  to {
    transform: scale(1);
  }
}
```

**Step 2: Texto com reveal animation**

Adicionar animacao de entrada para slides:

```css
.hero__slide {
  display: none;
}

.hero__slide.active {
  display: block;
  animation: heroTextReveal 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes heroTextReveal {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__slide.active .hero__title {
  animation: heroTextReveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms both;
}

.hero__slide.active .hero__subtitle {
  animation: heroTextReveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
}

.hero__slide.active .hero__case-link {
  animation: heroTextReveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both;
}
```

**Step 3: Indicadores com barra de progresso**

Substituir estilos dos indicadores:

```css
.hero__indicator {
  width: 48px;
  height: 3px;
  border: none;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 200ms ease;
  padding: 0;
}

.hero__indicator::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: var(--color-accent);
  border-radius: 2px;
}

.hero__indicator.active::after {
  width: 100%;
  animation: indicatorFill 5s linear forwards;
}

@keyframes indicatorFill {
  from { width: 0; }
  to { width: 100%; }
}

.hero__indicator:hover {
  background: rgba(255, 255, 255, 0.4);
}

.hero__indicators {
  display: flex;
  gap: 8px;
  margin-top: var(--space-lg);
}
```

**Step 4: Badges como glass cards**

Substituir estilos dos badges:

```css
.hero__badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--fw-semibold);
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.06em;
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-lg);
}
```

**Step 5: Hero overlay com radial gradient**

Substituir `.hero__overlay`:

```css
.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, rgba(18, 31, 43, 0.55) 0%, rgba(18, 31, 43, 0.85) 70%),
    radial-gradient(circle at top right, rgba(214, 107, 30, 0.1), transparent 40%);
}
```

**Step 6: Hero panel com glassmorphism melhorado**

Atualizar `.hero__panel`:

```css
.hero__panel {
  position: relative;
  overflow: hidden;
  padding: clamp(1.15rem, 2vw, 1.55rem);
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 24px 48px rgba(5, 12, 18, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  max-width: 430px;
  margin-left: auto;
}
```

**Step 7: Atualizar JS para reiniciar animacao de zoom no slide change**

Em `js/main.js`, dentro da funcao `updateSlide` do hero slider, adicionar restart da animacao da imagem:

Encontrar o bloco `updateSlide` dentro de `setupSlider` e apos a linha que faz `backgrounds[currentIndex]?.classList.add('active')`, adicionar logica para restart da animacao. Porem como `setupSlider` eh generico, a solucao mais limpa eh adicionar apos o setup do hero:

```javascript
// Apos o setupSlider do hero, adicionar:
const heroBgs = document.querySelectorAll('.hero__bg');
const heroSlides = document.querySelectorAll('.hero__slide');

if (heroBgs.length > 1) {
  const originalUpdate = null; // Nao eh necessario — o CSS animation restart acontece automaticamente
  // quando o elemento recebe a classe 'active' novamente pois usamos display:none/block
  // O @keyframes heroZoomOut reinicia cada vez que o slide fica ativo

  // Reiniciar animacao da imagem forçando reflow
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains('active')) {
        const img = mutation.target.querySelector('img');
        if (img) {
          img.style.animation = 'none';
          img.offsetHeight; // force reflow
          img.style.animation = '';
        }
      }
    });
  });

  heroBgs.forEach((bg) => {
    observer.observe(bg, { attributes: true, attributeFilter: ['class'] });
  });
}
```

**Step 8: Counter animation para stats do hero panel**

Adicionar ao final de `js/main.js`:

```javascript
// Counter animation para numeros
function animateCounters() {
  const counters = document.querySelectorAll('.stat__number, .hero__panel-stat strong');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/([+]?)([0-9.,]+)(.*)/);

      if (!match) return;

      const prefix = match[1];
      const rawNumber = match[2].replace(/\./g, '').replace(',', '.');
      const suffix = match[3];
      const target = parseFloat(rawNumber);

      if (isNaN(target)) return;

      const isDecimal = rawNumber.includes('.');
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        const formatted = isDecimal
          ? current.toFixed(rawNumber.split('.')[1]?.length || 0).replace('.', ',')
          : Math.round(current).toLocaleString('pt-BR');

        el.textContent = prefix + formatted + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
      instance.unobserve(el);
    });
  }, { threshold: 0.3 });

  counters.forEach((el) => observer.observe(el));
}

animateCounters();
```

**Step 9: Verificar hero**

Testar carousel (crossfade + zoom), indicadores (barra preenche), badges (glass), stats (counter), overlay.

**Step 10: Commit**

```bash
git add css/components.css js/main.js
git commit -m "feat: hero cinematografico com crossfade, progress bars e counter animation"
```

---

## Task 5: Botoes premium e CTA glow

**Files:**
- Modify: `css/components.css` (secao BUTTONS)

**Step 1: Atualizar botoes**

Substituir o bloco de botoes:

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  justify-content: center;
  padding: 13px 28px;
  border-radius: var(--radius-lg);
  font-weight: var(--fw-semibold);
  font-size: var(--font-size-sm);
  border: 1px solid transparent;
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  letter-spacing: 0.01em;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.22) 50%, transparent 80%);
  transform: translateX(-130%);
  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.btn:hover::after {
  transform: translateX(130%);
}

.btn--accent {
  background: linear-gradient(135deg, var(--color-accent) 0%, #f07a22 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(214, 107, 30, 0.2);
}

.btn--accent:hover {
  color: #fff;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 28px rgba(214, 107, 30, 0.35);
}

.btn--accent:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 8px rgba(214, 107, 30, 0.2);
}

.btn--primary {
  background: var(--gradient-dark);
  color: #fff;
  box-shadow: 0 4px 16px rgba(34, 56, 76, 0.15);
}

.btn--primary:hover {
  color: #fff;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 28px rgba(34, 56, 76, 0.25);
}

.btn--primary:active {
  transform: translateY(0) scale(0.98);
}

.btn--ghost {
  border-color: rgba(255, 255, 255, 0.22);
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.btn--ghost:hover {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.35);
}

.btn--outline {
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  background: transparent;
}

.btn--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.btn--outline-primary {
  border-color: rgba(214, 107, 30, 0.3);
  color: var(--color-primary);
  background: rgba(214, 107, 30, 0.04);
}

.btn--outline-primary:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(214, 107, 30, 0.25);
}

.btn--lg {
  padding: 15px 36px;
  font-size: var(--font-size-base);
}

.btn--sm {
  padding: 8px 20px;
  font-size: var(--font-size-xs);
}

.btn svg {
  width: 16px;
  height: 16px;
}
```

**Step 2: Verificar botoes em hero, secoes e CTAs**

**Step 3: Commit**

```bash
git add css/components.css
git commit -m "feat: botoes premium com glow, scale e active states"
```

---

## Task 6: Cards com hover premium (servicos, setores, portfolio)

**Files:**
- Modify: `css/components.css` (secoes CARD, SECTOR-CARD, PORTFOLIO-CARD)

**Step 1: Service cards com accent line e gradient hover**

Encontrar `.card` em components.css e atualizar. Adicionar:

```css
.card {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top right, rgba(214, 107, 30, 0.06), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 248, 250, 0.94) 100%);
  border: 1px solid rgba(216, 225, 232, 0.8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-accent), rgba(214, 107, 30, 0.1));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover {
  transform: translateY(-6px) scale(1.01);
  border-color: rgba(214, 107, 30, 0.2);
  box-shadow: 0 20px 48px rgba(34, 56, 76, 0.12);
}

.card:hover::before {
  transform: scaleX(1);
}
```

Atualizar `.card__img`:
```css
.card__img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover .card__img {
  transform: scale(1.05);
}
```

**Step 2: Sector cards com gradient reveal**

Atualizar `.sector-card`:

```css
.sector-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at top right, rgba(214, 107, 30, 0.06), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 248, 250, 0.94) 100%);
  border: 1px solid rgba(216, 225, 232, 0.8);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: var(--color-text);
  transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.sector-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(214, 107, 30, 0.04) 0%, rgba(214, 107, 30, 0) 100%);
  opacity: 0;
  transition: opacity 350ms cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.sector-card:hover {
  transform: translateY(-6px);
  border-color: rgba(214, 107, 30, 0.18);
  box-shadow: 0 20px 48px rgba(34, 56, 76, 0.12);
  color: var(--color-text);
}

.sector-card:hover::after {
  opacity: 1;
}
```

**Step 3: Portfolio cards com overlay no hover**

Atualizar `.portfolio-card`:

```css
.portfolio-card {
  background:
    radial-gradient(circle at top right, rgba(214, 107, 30, 0.06), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 247, 248, 0.94) 100%);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(216, 225, 232, 0.7);
  transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
}

.portfolio-card:hover {
  border-color: rgba(214, 107, 30, 0.18);
  box-shadow: 0 24px 52px rgba(34, 56, 76, 0.14);
  transform: translateY(-6px);
  color: var(--color-text);
}

.portfolio-card__image {
  position: relative;
  overflow: hidden;
}

.portfolio-card__image::after {
  content: 'Ver projeto \2192';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(18, 31, 43, 0.5);
  color: #fff;
  font-weight: var(--fw-semibold);
  font-size: var(--font-size-sm);
  letter-spacing: 0.04em;
  opacity: 0;
  transition: opacity 350ms cubic-bezier(0.16, 1, 0.3, 1);
}

.portfolio-card:hover .portfolio-card__image::after {
  opacity: 1;
}

.portfolio-card__image img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}

.portfolio-card:hover .portfolio-card__image img {
  transform: scale(1.06);
}

.portfolio-card__tag {
  position: absolute;
  top: var(--space-sm);
  left: var(--space-sm);
  padding: 4px 12px;
  background: rgba(214, 107, 30, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  font-size: var(--font-size-xs);
  font-weight: var(--fw-semibold);
  border-radius: var(--radius-full);
  z-index: 1;
}

.portfolio-card__specs span {
  font-size: var(--font-size-xs);
  font-weight: var(--fw-medium);
  color: var(--color-primary);
  border: 1px solid rgba(214, 107, 30, 0.2);
  background: rgba(214, 107, 30, 0.04);
  padding: 2px 10px;
  border-radius: var(--radius-full);
}
```

**Step 4: Verificar hover em todos os tipos de cards**

**Step 5: Commit**

```bash
git add css/components.css
git commit -m "feat: cards premium com accent line, gradient reveal e overlay"
```

---

## Task 7: Animacoes globais (fade-in variantes e stagger)

**Files:**
- Modify: `css/components.css` (secao fade-in)
- Modify: `js/main.js:334-351` (IntersectionObserver)

**Step 1: Adicionar variantes de animacao no CSS**

Substituir/adicionar apos `.fade-in`:

```css
/* Animacoes de scroll reveal */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-left {
  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-left.visible {
  opacity: 1;
  transform: translateX(0);
}

.fade-in-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-scale.visible {
  opacity: 1;
  transform: scale(1);
}

/* Stagger para grids de cards */
.stagger-grid > .fade-in:nth-child(1) { transition-delay: 0ms; }
.stagger-grid > .fade-in:nth-child(2) { transition-delay: 80ms; }
.stagger-grid > .fade-in:nth-child(3) { transition-delay: 160ms; }
.stagger-grid > .fade-in:nth-child(4) { transition-delay: 240ms; }
.stagger-grid > .fade-in:nth-child(5) { transition-delay: 320ms; }
.stagger-grid > .fade-in:nth-child(6) { transition-delay: 400ms; }
.stagger-grid > .fade-in:nth-child(7) { transition-delay: 480ms; }
.stagger-grid > .fade-in:nth-child(8) { transition-delay: 560ms; }
```

**Step 2: Atualizar JS observer para novas classes**

Substituir o bloco de animacao em `main.js`:

```javascript
// Scroll reveal animations
const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-scale');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      instance.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add('visible'));
}
```

**Step 3: Adicionar classe stagger-grid nos HTMLs**

Em `index.html`, adicionar `stagger-grid` nos grids de cards:

Na secao de servicos, trocar:
```html
<div class="grid grid--3">
```
Para:
```html
<div class="grid grid--3 stagger-grid">
```

Na secao de setores, trocar:
```html
<div class="sectors fade-in">
```
Para:
```html
<div class="sectors stagger-grid">
```

E em cada card filho dos stagger-grid, garantir que tem a classe `fade-in`.

**Step 4: Verificar animacoes no scroll**

**Step 5: Commit**

```bash
git add css/components.css js/main.js index.html
git commit -m "feat: animacoes de scroll com variantes e stagger em grids"
```

---

## Task 8: FAQ suave com max-height transition

**Files:**
- Modify: `css/components.css` (secao FAQ)
- Modify: `js/main.js:208-236` (FAQ accordion)

**Step 1: Atualizar CSS do FAQ**

```css
.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-lg) var(--space-xl);
  font-weight: var(--fw-semibold);
  font-size: var(--font-size-base);
  color: var(--color-text);
  cursor: pointer;
  text-align: left;
  background: transparent;
  transition: background 200ms ease, color 200ms ease;
  border-radius: var(--radius-lg);
}

.faq__question:hover {
  background: rgba(34, 56, 76, 0.03);
}

.faq__item.active .faq__question {
  color: var(--color-primary);
}

.faq__question svg,
.faq__question .faq__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.faq__item.active .faq__question svg,
.faq__item.active .faq__question .faq__icon {
  transform: rotate(45deg);
}

.faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 400ms cubic-bezier(0.16, 1, 0.3, 1),
              padding 400ms cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0 var(--space-xl);
}

.faq__item.active .faq__answer {
  max-height: 300px;
  padding: 0 var(--space-xl) var(--space-lg);
}
```

**Step 2: Atualizar JS do FAQ para usar max-height**

Substituir o bloco do FAQ em `main.js`:

```javascript
document.querySelectorAll('.faq__item').forEach((item, index) => {
  const question = item.querySelector('.faq__question');
  const answer = item.querySelector('.faq__answer');

  if (!question || !answer) return;

  const answerId = `faq-answer-${index + 1}`;
  question.setAttribute('aria-controls', answerId);
  question.setAttribute('aria-expanded', 'false');
  answer.id = answerId;

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq__item').forEach((faqItem) => {
      faqItem.classList.remove('active');
      faqItem.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});
```

Nota: remover `answer.hidden = true` e as linhas de `faqAnswer.hidden` — agora usamos max-height CSS.

**Step 3: Verificar FAQ abre/fecha suavemente**

**Step 4: Commit**

```bash
git add css/components.css js/main.js
git commit -m "feat: FAQ com transicao suave max-height e hover states"
```

---

## Task 9: Paginas internas — page headers com parallax e layout refinado

**Files:**
- Modify: `css/pages.css:1-88` (page headers)
- Modify: `css/pages.css` (hub pages)

**Step 1: Page header com parallax e tipografia**

Atualizar `.page-header`:

```css
.page-header {
  position: relative;
  background:
    radial-gradient(circle at top right, rgba(214, 107, 30, 0.2), transparent 18%),
    var(--gradient-dark);
  padding: clamp(5rem, 8vw, 6.5rem) 0 var(--space-2xl);
  color: #fff;
  overflow: hidden;
}

.page-header h1 {
  color: #fff;
  font-size: clamp(2rem, 4vw, 2.75rem);
  max-width: 14ch;
  letter-spacing: -0.03em;
}

.page-header__subtitle {
  color: rgba(255, 255, 255, 0.75);
  font-size: var(--font-size-lg);
  margin-top: var(--space-sm);
  max-width: 42ch;
}
```

Atualizar `.page-header--hero::before` com parallax:

```css
.page-header--hero::before {
  content: "";
  position: absolute;
  inset: -20% 0;
  background: var(--bg-image) center/cover no-repeat;
  opacity: 0.2;
  will-change: transform;
}

@supports (background-attachment: fixed) {
  .page-header--hero::before {
    background-attachment: fixed;
    inset: 0;
  }
}
```

**Step 2: Breadcrumb mais discreto**

```css
.page-header .breadcrumb__item,
.page-header .breadcrumb__item a {
  color: rgba(255, 255, 255, 0.5);
  font-size: var(--font-size-xs);
}

.page-header .breadcrumb__item + .breadcrumb__item::before {
  color: rgba(255, 255, 255, 0.25);
  content: '/';
  margin: 0 0.5em;
}
```

**Step 3: Hub feature cards com numeros**

Atualizar `.hub-feature`:

```css
.hub-feature {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top right, rgba(214, 107, 30, 0.06), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 247, 248, 0.94) 100%);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(216, 225, 232, 0.7);
  box-shadow: var(--shadow-sm);
  transition: all 350ms cubic-bezier(0.16, 1, 0.3, 1);
  counter-increment: feature-counter;
}

.hub-feature::before {
  content: counter(feature-counter, decimal-leading-zero);
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  font-size: var(--font-size-3xl);
  font-weight: var(--fw-bold);
  color: rgba(34, 56, 76, 0.06);
  line-height: 1;
  pointer-events: none;
}

.hub-features {
  counter-reset: feature-counter;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

.hub-feature:hover {
  transform: translateY(-6px);
  border-color: rgba(214, 107, 30, 0.18);
  box-shadow: 0 20px 48px rgba(34, 56, 76, 0.12);
}
```

**Step 4: Hub normativas como card premium**

Atualizar `.hub-norms`:

```css
.hub-norms {
  background:
    radial-gradient(circle at top right, rgba(214, 107, 30, 0.08), transparent 30%),
    rgba(214, 107, 30, 0.04);
  border: 1px solid rgba(214, 107, 30, 0.12);
  border-left: 4px solid var(--color-primary);
  padding: var(--space-xl);
  border-radius: var(--radius-md);
  margin: var(--space-xl) 0;
}
```

**Step 5: CTA final mais impactante**

Ja coberto no Task 2 (dot pattern) — adicionar whitespace:

```css
.hub-cta {
  text-align: center;
  padding: clamp(3rem, 6vw, 5rem) 0;
  background:
    radial-gradient(circle at top right, rgba(214, 107, 30, 0.18), transparent 22%),
    linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.hub-cta h2 {
  color: #fff;
  margin-bottom: var(--space-md);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
}

.hub-cta p {
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto var(--space-2xl);
  font-size: var(--font-size-lg);
}
```

**Step 6: Verificar paginas internas**

**Step 7: Commit**

```bash
git add css/pages.css
git commit -m "feat: paginas internas premium com parallax, numeros em features e CTA impactante"
```

---

## Task 10: Contato — float labels e detalhes

**Files:**
- Modify: `css/pages.css:212-332` (form styles)
- Modify: `js/main.js` (float label logic)
- Modify: `contato.html` (ajustar placeholders)

**Step 1: CSS para float labels**

Atualizar form styles:

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

.form label {
  position: absolute;
  top: 14px;
  left: 16px;
  font-size: var(--font-size-base);
  font-weight: var(--fw-regular);
  color: var(--color-text-muted);
  pointer-events: none;
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  background: transparent;
  padding: 0 4px;
  z-index: 1;
}

.form-group.has-value label,
.form input:focus ~ label,
.form select:focus ~ label,
.form textarea:focus ~ label,
.form input:not(:placeholder-shown) ~ label,
.form textarea:not(:placeholder-shown) ~ label {
  top: -8px;
  left: 12px;
  font-size: var(--font-size-xs);
  font-weight: var(--fw-medium);
  color: var(--color-primary);
  background: var(--color-surface);
}

.form input,
.form select,
.form textarea {
  padding: 14px 16px;
  border: 1.5px solid rgba(216, 225, 232, 0.9);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background: var(--color-surface);
  transition: border-color 250ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

.form input:focus,
.form select:focus,
.form textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(214, 107, 30, 0.1);
}
```

Nota: Para float labels funcionar com CSS puro, o label precisa vir DEPOIS do input no HTML (usando `~` sibling selector), e os inputs precisam de `placeholder=" "` (espaco). Se o HTML atual tem label antes do input, sera necessario reorganizar em `contato.html`, colocando input antes de label em cada form-group.

**Step 2: Ajustar HTML do formulario em contato.html**

Trocar a ordem label/input em cada form-group. Exemplo de antes:
```html
<div class="form-group">
  <label for="nome">Nome completo</label>
  <input type="text" id="nome" name="nome" required>
</div>
```

Trocar para:
```html
<div class="form-group">
  <input type="text" id="nome" name="nome" placeholder=" " required>
  <label for="nome">Nome completo</label>
</div>
```

Fazer o mesmo para: email, telefone, mensagem. Para o select (origem), manter label acima pois select nao suporta bem float label.

**Step 3: Icones de contato com bounce**

```css
.contato-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(214, 107, 30, 0.08);
  color: var(--color-primary);
  border-radius: var(--radius-lg);
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contato-card:hover .contato-icon {
  transform: translateY(-3px) scale(1.05);
}
```

**Step 4: Mapa com visual embutido**

```css
.map-embed {
  width: 100%;
  height: 400px;
  border: none;
  border-radius: var(--radius-xl);
  margin-top: var(--space-2xl);
  box-shadow: inset 0 2px 12px rgba(34, 56, 76, 0.08), var(--shadow-md);
}
```

**Step 5: Verificar formulario e icones**

**Step 6: Commit**

```bash
git add css/pages.css contato.html js/main.js
git commit -m "feat: formulario com float labels, icones bounce e mapa embutido"
```

---

## Task 11: Footer premium

**Files:**
- Modify: `css/components.css` (secao FOOTER)

**Step 1: Atualizar footer**

```css
.footer {
  background:
    radial-gradient(circle at bottom left, rgba(214, 107, 30, 0.06), transparent 30%),
    linear-gradient(180deg, #1a2d3d 0%, #0f1b26 100%);
  color: rgba(255, 255, 255, 0.7);
  padding: clamp(3rem, 6vw, 5rem) 0 0;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

.footer .container {
  position: relative;
  z-index: 1;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
  }
}

.footer__brand p {
  color: rgba(255, 255, 255, 0.5);
  margin-top: var(--space-md);
  font-size: var(--font-size-sm);
  max-width: 28ch;
  line-height: var(--lh-relaxed);
}

.footer h4 {
  color: #fff;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: var(--space-lg);
  font-weight: var(--fw-semibold);
}

.footer__nav a {
  color: rgba(255, 255, 255, 0.55);
  font-size: var(--font-size-sm);
  transition: color 200ms ease;
  position: relative;
}

.footer__nav a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  transition: width 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.footer__nav a:hover {
  color: #fff;
}

.footer__nav a:hover::after {
  width: 100%;
}

.footer__social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.footer__social-links a:hover {
  background: rgba(214, 107, 30, 0.15);
  border-color: rgba(214, 107, 30, 0.25);
  color: var(--color-accent);
  transform: translateY(-3px);
}

.footer__bottom {
  margin-top: var(--space-2xl);
  padding: var(--space-lg) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: var(--font-size-xs);
  text-align: center;
  color: rgba(255, 255, 255, 0.35);
}
```

**Step 2: Verificar footer visual**

**Step 3: Commit**

```bash
git add css/components.css
git commit -m "feat: footer premium com dot pattern, underline animado e gradiente dark"
```

---

## Task 12: Projeto detail e galeria masonry

**Files:**
- Modify: `css/pages.css` (projeto detail section)

**Step 1: Galeria masonry-like**

Substituir `.projeto-gallery`:

```css
.projeto-gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 640px) {
  .projeto-gallery {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 220px;
  }

  .projeto-gallery a:first-child {
    grid-row: span 2;
  }
}

@media (min-width: 1024px) {
  .projeto-gallery {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 200px;
  }

  .projeto-gallery a:first-child {
    grid-row: span 2;
  }

  .projeto-gallery a:nth-child(4) {
    grid-column: span 2;
  }
}

.projeto-gallery a {
  display: block;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.projeto-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
}

.projeto-gallery a:hover img {
  transform: scale(1.06);
}
```

**Step 2: Ficha tecnica horizontal scroll mobile**

Atualizar `.projeto-ficha`:

```css
.projeto-ficha {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  box-shadow: var(--shadow-md);
  margin-top: calc(-1 * var(--space-2xl));
  position: relative;
  z-index: 1;
}

.projeto-ficha__item {
  text-align: center;
  padding: var(--space-sm) var(--space-md);
  flex-shrink: 0;
  min-width: 120px;
  scroll-snap-align: start;
}

@media (min-width: 640px) {
  .projeto-ficha {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow: visible;
  }
}

@media (min-width: 1024px) {
  .projeto-ficha {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

**Step 3: Verificar paginas de projeto**

**Step 4: Commit**

```bash
git add css/pages.css
git commit -m "feat: galeria masonry-like e ficha tecnica horizontal em mobile"
```

---

## Task 13: Verificacao final e cleanup

**Files:**
- Verify: todos os arquivos modificados

**Step 1: Testar todas as paginas no navegador**

Abrir cada pagina e verificar:
- [ ] index.html — hero, cards, animacoes, footer
- [ ] empresa.html — page header, layout
- [ ] servicos.html — grid, cards
- [ ] obras.html — filtros, portfolio cards
- [ ] contato.html — form, float labels, mapa
- [ ] Uma pagina de projeto (ex: projetos/geolab.html) — galeria, ficha
- [ ] Uma pagina de servico (ex: servicos/salas-limpas.html) — features, norms
- [ ] Um setor (ex: setores/farmaceutico.html) — layout

**Step 2: Testar responsividade**

Verificar em 3 viewports:
- 375px (mobile)
- 768px (tablet)
- 1280px (desktop)

**Step 3: Corrigir regressions encontradas**

**Step 4: Commit final**

```bash
git add -A
git commit -m "fix: ajustes finais de responsividade e polish"
```
