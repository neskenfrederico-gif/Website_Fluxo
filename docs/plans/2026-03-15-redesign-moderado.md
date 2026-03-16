# Redesign Moderado - Fluxo Engenharia

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Modernizar o visual do site mantendo a identidade de engenharia, com foco em hero limpo, seções com mais impacto visual, animações scroll-driven e layout "engenharia humanizada".

**Architecture:** Site estático HTML/CSS/JS vanilla. Modificações concentradas em `index.html`, `css/components.css`, `css/pages.css` e `js/main.js`. Nenhuma dependência externa nova - apenas CSS e JS nativos. Manter estrutura de tokens/reset/layout intacta.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, animações), JavaScript vanilla (IntersectionObserver, scroll-driven animations)

---

### Task 1: Hero - Simplificar HTML

**Files:**
- Modify: `index.html:102-209` (seção hero completa)

**Step 1: Reescrever o HTML do hero**

Substituir todo o bloco `<!-- === HERO === -->` (linhas 102-209) por:

```html
<!-- === HERO === -->
<section class="hero" id="hero">
  <div class="hero__bg active" data-bg="0">
    <img src="images/portfolio/geolab-area-producao.png" alt="" width="1920" height="800" loading="eager" fetchpriority="high">
  </div>
  <div class="hero__bg" data-bg="1">
    <img src="images/portfolio/active-ontex-panoramica.png" alt="" width="1920" height="800" loading="lazy">
  </div>
  <div class="hero__bg" data-bg="2">
    <img src="images/portfolio/hypera-galpao-autoportante.png" alt="" width="1920" height="800" loading="lazy">
  </div>
  <div class="hero__bg" data-bg="3">
    <img src="images/portfolio/brainfarma-sala-limpa.png" alt="" width="1920" height="800" loading="lazy">
  </div>
  <div class="hero__overlay"></div>

  <div class="container hero__content">
    <span class="hero__eyebrow">Engenharia HVAC Industrial</span>
    <h1 class="hero__title">Engenharia HVAC para quem <span>não pode errar</span></h1>
    <p class="hero__subtitle">Mais de 25 anos projetando e instalando sistemas de climatização industrial, salas limpas e automação para indústrias de alta exigência.</p>
    <div class="hero__actions">
      <a href="contato.html" class="btn btn--accent btn--lg">Solicitar Orçamento</a>
      <a href="obras.html" class="btn btn--ghost btn--lg">Ver Projetos</a>
    </div>
  </div>

  <div class="hero__scroll-indicator" aria-hidden="true">
    <span></span>
  </div>
</section>

<!-- === BADGES NORMAS === -->
<div class="norms-bar">
  <div class="container">
    <div class="norms-bar__inner">
      <span class="norms-bar__label">Conformidade normativa:</span>
      <div class="norms-bar__badges">
        <span class="norms-bar__badge">ANVISA</span>
        <span class="norms-bar__badge">ASHRAE</span>
        <span class="norms-bar__badge">ISO 14644</span>
        <span class="norms-bar__badge">NBR 16401</span>
        <span class="norms-bar__badge">SMACNA</span>
      </div>
    </div>
  </div>
</div>
```

**Step 2: Verificar que o HTML está válido**

Abrir `index.html` no navegador e verificar que a estrutura renderiza (mesmo sem CSS atualizado).

**Step 3: Commit**

```bash
git add index.html
git commit -m "refactor: simplificar hero - headline fixa, remover painel lateral e slider de texto"
```

---

### Task 2: Hero - Atualizar CSS

**Files:**
- Modify: `css/components.css:321-664` (estilos do hero)
- Modify: `css/pages.css:669-796` (overrides do page-home hero)

**Step 1: Substituir CSS do hero em components.css**

Remover todos os estilos de `.hero__*` (linhas 321-664 aprox.) e substituir por:

```css
/* === HERO === */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  min-height: 100vh;
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.hero__bg.active {
  opacity: 1;
}

.hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(18, 31, 43, 0.88) 0%,
    rgba(27, 46, 63, 0.72) 50%,
    rgba(18, 31, 43, 0.85) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 1;
  padding: clamp(8rem, 14vw, 12rem) 0 clamp(4rem, 8vw, 6rem);
  color: #fff;
  max-width: 720px;
}

.hero__eyebrow {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeUp 0.8s ease 0.3s forwards;
}

.hero__title {
  font-size: clamp(2.2rem, 5.5vw, 4rem);
  color: #fff;
  line-height: 1.1;
  margin-bottom: var(--space-lg);
  max-width: 16ch;
  text-wrap: balance;
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeUp 0.8s ease 0.5s forwards;
}

.hero__title span {
  color: var(--color-accent);
}

.hero__subtitle {
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: var(--space-2xl);
  max-width: 38rem;
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeUp 0.8s ease 0.7s forwards;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeUp 0.8s ease 0.9s forwards;
}

@keyframes heroFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll Indicator */
.hero__scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.hero__scroll-indicator span {
  display: block;
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  position: relative;
}

.hero__scroll-indicator span::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
  50% { transform: translateX(-50%) translateY(12px); opacity: 0.3; }
}

/* Norms Bar */
.norms-bar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-md) 0;
}

.norms-bar__inner {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.norms-bar__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--fw-medium);
}

.norms-bar__badges {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.norms-bar__badge {
  padding: 4px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--fw-semibold);
  color: var(--color-primary);
  letter-spacing: 0.06em;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.norms-bar__badge:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary-light);
}
```

**Step 2: Atualizar overrides do page-home no pages.css**

Remover as regras antigas de `.page-home .hero__*` e `.page-home .header-spacer` (linhas 669-796 aprox) e substituir por:

```css
.page-home .header-spacer {
  height: 0;
}

.page-home .header {
  background: rgba(255, 255, 255, 0.82);
  border-bottom-color: rgba(216, 225, 232, 0.5);
  box-shadow: 0 12px 28px rgba(20, 35, 49, 0.08);
}

.page-home .header__link--active:not(.header__link--cta) {
  background: linear-gradient(135deg, var(--color-accent) 0%, #f2892e 100%);
  color: #fff;
  border-color: rgba(214, 107, 30, 0.34);
  box-shadow: 0 16px 28px rgba(214, 107, 30, 0.22);
}

.page-home .header__link--active:not(.header__link--cta):hover {
  color: #fff;
  background: linear-gradient(135deg, #c95e14 0%, var(--color-accent) 100%);
}

.page-home .section {
  padding: clamp(2.9rem, 5.5vw, 4.5rem) 0;
}

.page-home .section + .section {
  border-top: 1px solid rgba(216, 225, 232, 0.5);
}

.page-home .section--bg,
.page-home .section--bg-alt {
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%);
}

.page-home .section-header {
  margin-bottom: clamp(1.8rem, 4vw, 2.7rem);
}

.page-home .section-header p {
  color: #4d6072;
}

@media (min-width: 1024px) {
  .page-home .header__inner {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: var(--space-lg);
  }

  .page-home .header__nav {
    position: relative !important;
    right: auto !important;
    top: auto !important;
    width: auto !important;
    height: auto !important;
    margin-left: auto !important;
    display: block !important;
  }

  .page-home .header__menu {
    display: flex !important;
    width: auto !important;
    flex-wrap: nowrap;
    white-space: nowrap;
  }
}
```

**Step 3: Verificar no navegador**

Abrir `index.html`, verificar que o hero renderiza fullscreen com headline fixa, scroll indicator e barra de normas abaixo.

**Step 4: Commit**

```bash
git add css/components.css css/pages.css
git commit -m "feat: novo CSS do hero simplificado com animações de entrada e scroll indicator"
```

---

### Task 3: Hero - Atualizar JavaScript do slider

**Files:**
- Modify: `js/main.js:190-196` (setup do slider do hero)

**Step 1: Simplificar o slider do hero**

O slider agora só troca backgrounds (sem slides de texto). Atualizar a chamada `setupSlider` do hero para remover referência às slides e indicators que não existem mais:

```javascript
// Hero background slideshow (apenas imagens, sem texto)
setupSlider({
  items: [...document.querySelectorAll('.hero__bg')],
  indicators: [],
  backgrounds: [],
  intervalMs: 5000,
  datasetKey: 'bg'
});
```

Na função `setupSlider`, os `items` agora são os próprios backgrounds. Não precisa de `indicators` nem de `backgrounds` separados.

Ajustar a função `setupSlider` (linha 146) para funcionar quando `indicators` e `backgrounds` estão vazios (já funciona pois usa optional chaining `?.`).

**Step 2: Verificar no navegador**

Abrir o site e confirmar que as imagens de fundo trocam automaticamente a cada 5 segundos com transição suave.

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "refactor: simplificar slider do hero para trocar apenas imagens de fundo"
```

---

### Task 4: Métricas + Overview - Fundir seções (HTML)

**Files:**
- Modify: `index.html:211-302` (seções home-metrics e home-overview)

**Step 1: Substituir as duas seções por uma única**

Remover os blocos `<!-- === NUMEROS === -->` (linhas 211-241) e `<!-- === VISAO GERAL === -->` (linhas 243-302) e substituir por:

```html
<!-- === IMPACTO EM NUMEROS === -->
<section class="section impact" id="impact">
  <div class="container">
    <div class="impact__grid fade-in">
      <div class="impact__content">
        <span class="impact__eyebrow">Engenharia com método</span>
        <h2 class="impact__title">Da concepção técnica à entrega em campo</h2>
        <p class="impact__lead">A Fluxo Engenharia estrutura cada projeto para que a solução HVAC faça sentido operacional, normativo e econômico dentro da realidade da planta industrial.</p>
        <div class="impact__steps">
          <div class="impact__step">
            <span class="impact__step-number">01</span>
            <div>
              <strong>Projeto orientado ao processo</strong>
              <span>Dimensionamento térmico, renovação de ar e compatibilização com a operação do cliente.</span>
            </div>
          </div>
          <div class="impact__step">
            <span class="impact__step-number">02</span>
            <div>
              <strong>Execução com rastreabilidade</strong>
              <span>Montagem, fabricação própria de dutos e integração de equipamentos.</span>
            </div>
          </div>
          <div class="impact__step">
            <span class="impact__step-number">03</span>
            <div>
              <strong>Entrega técnica completa</strong>
              <span>Startup, TAB, qualificação e documentação as-built.</span>
            </div>
          </div>
        </div>
        <div class="impact__actions">
          <a href="empresa.html" class="btn btn--outline">Conhecer a Empresa</a>
          <a href="contato.html" class="btn btn--ghost-light">Falar com um Engenheiro</a>
        </div>
      </div>
      <div class="impact__stats">
        <div class="impact__stat">
          <span class="impact__stat-number" data-count="25">0</span>
          <span class="impact__stat-suffix">+</span>
          <span class="impact__stat-label">anos de experiência</span>
        </div>
        <div class="impact__stat">
          <span class="impact__stat-number" data-count="20000">0</span>
          <span class="impact__stat-suffix">TR</span>
          <span class="impact__stat-label">capacidade instalada</span>
        </div>
        <div class="impact__stat">
          <span class="impact__stat-number" data-count="50000">0</span>
          <span class="impact__stat-suffix">m²</span>
          <span class="impact__stat-label">climatizados</span>
        </div>
        <div class="impact__stat">
          <span class="impact__stat-number" data-count="7">0</span>
          <span class="impact__stat-suffix">+</span>
          <span class="impact__stat-label">clientes de referência</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: fundir seções métricas e overview em seção impact unificada"
```

---

### Task 5: Métricas + Overview - CSS da seção impact

**Files:**
- Modify: `css/pages.css` (adicionar estilos da seção impact, remover estilos antigos de stats-shell e overview)

**Step 1: Remover CSS antigo e adicionar novo**

Remover os blocos `.stats-shell*` (linhas 877-1001 aprox) e `.overview*` (linhas 1003-1136 aprox) do `pages.css`.

Adicionar no lugar:

```css
/* === IMPACT SECTION === */
.impact {
  background: var(--gradient-dark);
  color: #fff;
  padding: clamp(3.5rem, 7vw, 6rem) 0;
  position: relative;
  overflow: hidden;
}

.impact::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), rgba(255, 255, 255, 0.04) calc(100% - 1px)),
    linear-gradient(transparent 0, transparent calc(100% - 1px), rgba(255, 255, 255, 0.03) calc(100% - 1px));
  background-size: 80px 80px;
  opacity: 0.4;
  pointer-events: none;
}

.impact .container {
  position: relative;
  z-index: 1;
}

.impact__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3xl);
  align-items: center;
}

@media (min-width: 960px) {
  .impact__grid {
    grid-template-columns: 1.2fr 0.8fr;
    gap: var(--space-4xl);
  }
}

.impact__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
}

.impact__eyebrow::before {
  content: '';
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-accent), transparent);
}

.impact__title {
  color: #fff;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin-bottom: var(--space-lg);
  max-width: 18ch;
}

.impact__lead {
  color: rgba(255, 255, 255, 0.78);
  font-size: var(--font-size-lg);
  line-height: 1.7;
  margin-bottom: var(--space-xl);
}

.impact__steps {
  display: grid;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.impact__step {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background var(--transition-fast), border-color var(--transition-fast);
}

.impact__step:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
}

.impact__step-number {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(214, 107, 30, 0.2);
  color: var(--color-accent);
  font-size: var(--font-size-sm);
  font-weight: var(--fw-bold);
  border: 1px solid rgba(214, 107, 30, 0.3);
}

.impact__step strong {
  display: block;
  color: #fff;
  margin-bottom: 2px;
}

.impact__step span {
  display: block;
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.65);
}

.impact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

/* Stats counters */
.impact__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

.impact__stat {
  text-align: center;
  padding: var(--space-xl) var(--space-md);
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform var(--transition-base), border-color var(--transition-base);
}

.impact__stat:hover {
  transform: translateY(-4px);
  border-color: rgba(214, 107, 30, 0.3);
}

.impact__stat-number {
  display: block;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--fw-bold);
  color: #fff;
  line-height: 1;
}

.impact__stat-suffix {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: var(--fw-bold);
  color: var(--color-accent);
}

.impact__stat-label {
  display: block;
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.6);
  margin-top: var(--space-sm);
  line-height: 1.3;
}

/* Botão ghost para fundo escuro */
.btn--ghost-light {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.25);
}

.btn--ghost-light:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}

.btn--outline {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.5);
}

.btn--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}
```

**Step 2: Atualizar referências no pages.css**

Remover `.page-home .home-metrics` e `.page-home .home-overview` dos seletores de background (linhas ~747-759). A seção impact tem seu próprio background.

**Step 3: Verificar no navegador**

Confirmar seção escura com grid 2 colunas (conteúdo + stats), contraste com hero e seção seguinte.

**Step 4: Commit**

```bash
git add css/pages.css css/components.css
git commit -m "feat: CSS da seção impact - fundo escuro, grid, stats e steps"
```

---

### Task 6: Counters animados - JavaScript

**Files:**
- Modify: `js/main.js` (adicionar lógica de counter animado)

**Step 1: Adicionar função de counter animado**

Adicionar antes do fechamento do `DOMContentLoaded`:

```javascript
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
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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
```

**Step 2: Verificar no navegador**

Scrollar até a seção impact e confirmar que os números contam de 0 até o valor final com easing suave.

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: counters animados com IntersectionObserver e easeOutCubic"
```

---

### Task 7: Serviços - Grid 2 colunas com cards maiores

**Files:**
- Modify: `index.html:304-393` (seção home-services)
- Modify: `css/components.css` (estilos de cards)
- Modify: `css/pages.css` (override grid da home)

**Step 1: Atualizar grid no HTML**

Trocar `<div class="grid grid--3">` por `<div class="grid grid--2 home-services__grid">` na seção de serviços (linha 318 aprox).

Reduzir o texto dos `<p class="card__text">` para no máximo 2 linhas (~80 caracteres) cada:

- Ar-Condicionado Industrial: "Sistemas VRF, Splitão e centrais de água gelada para galpões industriais e centros de distribuição."
- Salas Limpas: "Projeto, construção e qualificação de ambientes Grau A a D conforme ISO 14644 e ANVISA."
- Controle de Temperatura: "Climatização de precisão com monitoramento IBUTG e mapeamento térmico para áreas reguladas."
- Automação HVAC: "BMS, controladores DDC e supervisórios com BACnet/Modbus para monitoramento e otimização."
- Dutos e Ventilação: "Fabricação e instalação de redes TDC, MPU e girotubo conforme SMACNA."
- Central de Água Gelada: "Chillers, motobombas, variadores de frequência e torres de resfriamento para plantas industriais."

**Step 2: Atualizar CSS do card**

Adicionar/modificar em `css/components.css` os estilos do card para hover moderno:

```css
.card {
  /* manter estilos existentes e adicionar: */
  border: 1px solid transparent;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(214, 107, 30, 0.2);
}

.card__link {
  transition: gap var(--transition-base), color var(--transition-base);
}

.card:hover .card__link {
  gap: var(--space-md);
  color: var(--color-accent);
}
```

**Step 3: Atualizar grid override em pages.css**

```css
.page-home .home-services__grid {
  gap: var(--space-xl);
}

@media (min-width: 768px) {
  .page-home .home-services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Step 4: Verificar no navegador**

Confirmar grid 2 colunas, cards com mais respiro, hover com borda accent e link que desliza.

**Step 5: Commit**

```bash
git add index.html css/components.css css/pages.css
git commit -m "feat: serviços em grid 2 colunas com cards maiores e hover moderno"
```

---

### Task 8: Cases - Layout zig-zag fullwidth

**Files:**
- Modify: `index.html:395-541` (seção home-cases)
- Modify: `css/components.css` (remover carousel, adicionar case-study)
- Modify: `css/pages.css` (estilos da home-cases)

**Step 1: Substituir HTML do carousel por layout zig-zag**

Remover todo o conteúdo da seção `home-cases` e substituir por:

```html
<!-- === CASES EM DESTAQUE === -->
<section class="section home-cases">
  <div class="container">
    <div class="section-header fade-in">
      <span class="section-header__tag">Cases em Destaque</span>
      <h2>Projetos que Demonstram Nossa Expertise</h2>
      <p>Cases selecionados para mostrar capacidade de projeto, integração entre disciplinas e entrega técnica em campo.</p>
    </div>

    <div class="case-study fade-in">
      <div class="case-study__image">
        <img src="images/portfolio/geolab-cag.png" alt="Central de água gelada - Geolab" loading="lazy" width="600" height="400">
        <span class="case-study__sector">Farmacêutico</span>
      </div>
      <div class="case-study__content">
        <h3 class="case-study__title">Geolab — Site II</h3>
        <p class="case-study__desc">8.000 m² de salas limpas Grau B/C com central de água gelada de 900 TR, 16 UTAs HEPA e cascata de pressão para produção de colírios.</p>
        <div class="case-study__pills">
          <span>900 TR</span>
          <span>8.000 m²</span>
          <span>ISO 7/8</span>
        </div>
        <a href="projetos/geolab.html" class="case-study__link">Ver projeto completo →</a>
      </div>
    </div>

    <div class="case-study case-study--reverse fade-in">
      <div class="case-study__image">
        <img src="images/portfolio/active-ontex-panoramica.png" alt="Área de produção - Active Ontex" loading="lazy" width="600" height="400">
        <span class="case-study__sector">Industrial</span>
      </div>
      <div class="case-study__content">
        <h3 class="case-study__title">Active Ontex — Controle IBUTG</h3>
        <p class="case-study__desc">15.600 m² climatizados com 10 Fan Coils, 14 resfriadores evaporativos e automação Siemens para controle de IBUTG.</p>
        <div class="case-study__pills">
          <span>1.050 TR</span>
          <span>15.600 m²</span>
          <span>NR-15</span>
        </div>
        <a href="projetos/active-ontex.html" class="case-study__link">Ver projeto completo →</a>
      </div>
    </div>

    <div class="case-study fade-in">
      <div class="case-study__image">
        <img src="images/portfolio/hypera-galpao-autoportante.png" alt="CD autoportante - Hypera" loading="lazy" width="600" height="400">
        <span class="case-study__sector">Logística</span>
      </div>
      <div class="case-study__content">
        <h3 class="case-study__title">Hypera — CD Autoportante</h3>
        <p class="case-study__desc">Sistema VRF com 16 condensadoras Trane em galpão de 40m de altura. Automação BMS+EMS Siemens com controle por zoneamento.</p>
        <div class="case-study__pills">
          <span>200 TR</span>
          <span>4.000 m²</span>
          <span>VRF</span>
        </div>
        <a href="projetos/hypera.html" class="case-study__link">Ver projeto completo →</a>
      </div>
    </div>

    <div class="case-study case-study--reverse fade-in">
      <div class="case-study__image">
        <img src="images/portfolio/brainfarma-sala-limpa.png" alt="Sala limpa - Brainfarma" loading="lazy" width="600" height="400">
        <span class="case-study__sector">Farmacêutico</span>
      </div>
      <div class="case-study__content">
        <h3 class="case-study__title">Brainfarma — Fluxos Laminares</h3>
        <p class="case-study__desc">Obra Turn Key com 6 fluxos laminares microprocessados, 4 UTAs e qualificação completa para área de injetáveis.</p>
        <div class="case-study__pills">
          <span>264 TR</span>
          <span>800 m²</span>
          <span>Turn Key</span>
        </div>
        <a href="projetos/brainfarma.html" class="case-study__link">Ver projeto completo →</a>
      </div>
    </div>

    <div class="text-center mt-xl fade-in">
      <a href="obras.html" class="btn btn--primary btn--lg">Ver Todos os Projetos</a>
    </div>
  </div>
</section>
```

**Step 2: Adicionar CSS do case-study em components.css**

Remover estilos antigos de `.case-card*` e `.cases-carousel*`. Adicionar:

```css
/* === CASE STUDY === */
.case-study {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  align-items: center;
  margin-bottom: var(--space-2xl);
}

@media (min-width: 768px) {
  .case-study {
    grid-template-columns: 1.2fr 0.8fr;
    gap: var(--space-2xl);
  }

  .case-study--reverse {
    direction: rtl;
  }

  .case-study--reverse > * {
    direction: ltr;
  }
}

.case-study__image {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.case-study__image img {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.case-study:hover .case-study__image img {
  transform: scale(1.04);
}

.case-study__sector {
  position: absolute;
  top: var(--space-md);
  left: var(--space-md);
  padding: 6px 16px;
  background: rgba(20, 35, 49, 0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: var(--font-size-xs);
  font-weight: var(--fw-semibold);
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.case-study__title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.case-study__desc {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}

.case-study__pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.case-study__pills span {
  padding: 6px 16px;
  background: var(--color-primary-50);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--fw-semibold);
  border-radius: var(--radius-full);
}

.case-study__link {
  font-weight: var(--fw-semibold);
  color: var(--color-accent);
  font-size: var(--font-size-base);
  transition: gap var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.case-study__link:hover {
  gap: var(--space-sm);
}
```

**Step 3: Remover chamada do carousel no JS**

Em `js/main.js`, remover o segundo `setupSlider` (linhas 198-206) que controlava o carousel de cases, pois não existe mais.

**Step 4: Verificar no navegador**

Confirmar 4 cases em layout zig-zag, imagens grandes, pills com dados técnicos. No mobile, stack vertical.

**Step 5: Commit**

```bash
git add index.html css/components.css js/main.js
git commit -m "feat: cases em layout zig-zag fullwidth, eliminar carousel"
```

---

### Task 9: Metodologia - Timeline vertical

**Files:**
- Modify: `index.html:543-570` (seção home-methodology)
- Modify: `css/pages.css` (estilos de metodologia)

**Step 1: Substituir HTML da metodologia**

Substituir o conteúdo da seção `home-methodology`:

```html
<!-- === METODOLOGIA === -->
<section class="section section--bg-alt home-methodology">
  <div class="container">
    <div class="section-header fade-in">
      <span class="section-header__tag">Como trabalhamos</span>
      <h2>Metodologia de Projeto e Execução</h2>
      <p>Cada etapa segue protocolos ASHRAE e ABNT NBR 16401, garantindo rastreabilidade do início ao comissionamento.</p>
    </div>

    <div class="timeline fade-in">
      <div class="timeline__item">
        <div class="timeline__marker">
          <span class="timeline__number">01</span>
        </div>
        <div class="timeline__content">
          <h3>Estudo de Viabilidade</h3>
          <p>Levantamento do processo produtivo, estimativa de carga térmica e pré-seleção da topologia do sistema.</p>
        </div>
      </div>
      <div class="timeline__item">
        <div class="timeline__marker">
          <span class="timeline__number">02</span>
        </div>
        <div class="timeline__content">
          <h3>Anteprojeto e Engenharia Básica</h3>
          <p>Dimensionamento preliminar, layout de casa de máquinas, roteamento de tubulação e estimativa orçamentária.</p>
        </div>
      </div>
      <div class="timeline__item">
        <div class="timeline__marker">
          <span class="timeline__number">03</span>
        </div>
        <div class="timeline__content">
          <h3>Projeto Executivo</h3>
          <p>Plantas, cortes, isométricos, memoriais descritivos, BOM e especificações técnicas completas.</p>
        </div>
      </div>
      <div class="timeline__item">
        <div class="timeline__marker">
          <span class="timeline__number">04</span>
        </div>
        <div class="timeline__content">
          <h3>Instalação e Comissionamento</h3>
          <p>Montagem, startup, TAB, comissionamento e entrega de documentação as-built.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Adicionar CSS da timeline em pages.css**

Remover estilos antigos de `.methodology*`. Adicionar:

```css
/* === TIMELINE === */
.timeline {
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  padding-left: 60px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 23px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--color-accent), var(--color-border));
}

.timeline__item {
  position: relative;
  padding-bottom: var(--space-2xl);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline__item.visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline__item:last-child {
  padding-bottom: 0;
}

.timeline__marker {
  position: absolute;
  left: -60px;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 2px solid var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.timeline__number {
  font-size: var(--font-size-sm);
  font-weight: var(--fw-bold);
  color: var(--color-accent);
}

.timeline__content h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-sm);
  color: var(--color-text);
}

.timeline__content p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
}
```

**Step 3: Adicionar animação scroll-driven no JS**

Em `js/main.js`, atualizar o IntersectionObserver existente para incluir `.timeline__item`:

```javascript
// Já existe observer para .fade-in. Adicionar para timeline:
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
```

**Step 4: Verificar no navegador**

Scrollar até a metodologia e confirmar timeline vertical com linha accent, marcadores circulares e animação sequencial.

**Step 5: Commit**

```bash
git add index.html css/pages.css js/main.js
git commit -m "feat: metodologia com timeline vertical e animação scroll-driven"
```

---

### Task 10: Setores - Cards com foto de fundo

**Files:**
- Modify: `index.html:572-618` (seção home-sectors)
- Modify: `css/components.css` (estilos de sector-card)

**Step 1: Atualizar HTML dos sector cards**

Adicionar imagens de fundo via atributo `style` usando fotos existentes do portfolio:

```html
<div class="sectors fade-in">
  <a href="setores/farmaceutico.html" class="sector-card" style="--bg-image: url('../images/portfolio/geolab-area-producao.png')">
    <div class="sector-card__overlay"></div>
    <div class="sector-card__content">
      <span class="sector-card__meta">ANVISA / ISO 14644</span>
      <h3>Farmacêutico</h3>
      <p>Salas limpas Grau A a D, cascata de pressão, filtragem HEPA e qualificação conforme RDC 658/2022</p>
    </div>
  </a>
  <a href="setores/industrial.html" class="sector-card" style="--bg-image: url('../images/portfolio/active-ontex-panoramica.png')">
    <div class="sector-card__overlay"></div>
    <div class="sector-card__content">
      <span class="sector-card__meta">NR-15 / HVAC de processo</span>
      <h3>Industrial</h3>
      <p>Climatização de galpões com controle de IBUTG, ventilação mecânica e exaustão localizada</p>
    </div>
  </a>
  <a href="setores/logistica.html" class="sector-card" style="--bg-image: url('../images/portfolio/hypera-galpao-autoportante.png')">
    <div class="sector-card__overlay"></div>
    <div class="sector-card__content">
      <span class="sector-card__meta">VRF / automação BMS</span>
      <h3>Logística</h3>
      <p>CDs com controle de temperatura por zoneamento, VRF e automação BMS para rastreabilidade</p>
    </div>
  </a>
  <a href="setores/cosmeticos.html" class="sector-card" style="--bg-image: url('../images/portfolio/brainfarma-fluxo-laminar.png')">
    <div class="sector-card__overlay"></div>
    <div class="sector-card__content">
      <span class="sector-card__meta">BPF / controle ambiental</span>
      <h3>Cosméticos</h3>
      <p>Áreas qualificadas com ventilação 100% ar exterior e conformidade com BPF cosméticos</p>
    </div>
  </a>
  <a href="setores/alimenticio.html" class="sector-card" style="--bg-image: url('../images/portfolio/louis-dreyfus-envase.png')">
    <div class="sector-card__overlay"></div>
    <div class="sector-card__content">
      <span class="sector-card__meta">MAPA / conservação</span>
      <h3>Alimentício</h3>
      <p>Controle de temperatura e umidade para produção e armazenagem conforme normas do MAPA</p>
    </div>
  </a>
  <a href="setores/laboratorios.html" class="sector-card" style="--bg-image: url('../images/portfolio/geolab-uta.png')">
    <div class="sector-card__overlay"></div>
    <div class="sector-card__content">
      <span class="sector-card__meta">pressão / exaustão</span>
      <h3>Laboratórios</h3>
      <p>Ambientes com pressão controlada, monitoramento de partículas e exaustão de capelas</p>
    </div>
  </a>
</div>
```

**Step 2: Atualizar CSS do sector-card em components.css**

Remover estilos antigos de `.sector-card*` e substituir:

```css
/* === SECTOR CARDS === */
.sectors {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

@media (min-width: 640px) {
  .sectors {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .sectors {
    grid-template-columns: repeat(3, 1fr);
  }
}

.sector-card {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 280px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  background: var(--bg-image) center/cover no-repeat;
}

.sector-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(18, 31, 43, 0.92) 0%,
    rgba(18, 31, 43, 0.5) 50%,
    rgba(18, 31, 43, 0.3) 100%
  );
  transition: background var(--transition-base);
}

.sector-card:hover .sector-card__overlay {
  background: linear-gradient(
    to top,
    rgba(18, 31, 43, 0.95) 0%,
    rgba(18, 31, 43, 0.6) 50%,
    rgba(18, 31, 43, 0.4) 100%
  );
}

.sector-card__content {
  position: relative;
  z-index: 1;
  padding: var(--space-xl);
  width: 100%;
}

.sector-card__content h3 {
  font-size: var(--font-size-xl);
  color: #fff;
  margin-bottom: var(--space-xs);
}

.sector-card__meta {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
}

.sector-card__content p {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height var(--transition-slow), opacity var(--transition-base);
}

.sector-card:hover .sector-card__content p {
  max-height: 100px;
  opacity: 1;
}
```

**Step 3: Verificar no navegador**

Confirmar grid 3 colunas, fotos de fundo com overlay escuro, hover revelando descrição.

**Step 4: Commit**

```bash
git add index.html css/components.css
git commit -m "feat: setores com foto de obra como background e hover reveal"
```

---

### Task 11: FAQ - Accordion refinado

**Files:**
- Modify: `css/components.css` (estilos de faq)

**Step 1: Atualizar CSS do FAQ**

Localizar estilos de `.faq*` em components.css e substituir por:

```css
/* === FAQ === */
.faq {
  max-width: 800px;
  margin: 0 auto;
}

.faq__item {
  border-bottom: 1px solid var(--color-border);
}

.faq__item:first-child {
  border-top: 1px solid var(--color-border);
}

.faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  width: 100%;
  padding: var(--space-xl) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--fw-semibold);
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  background: none;
  border: none;
  transition: color var(--transition-fast);
}

.faq__question:hover {
  color: var(--color-primary);
}

.faq__icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  transition: transform var(--transition-base), background var(--transition-base), color var(--transition-base);
}

.faq__item.active .faq__icon {
  transform: rotate(45deg);
  background: var(--color-accent);
  color: #fff;
}

.faq__answer {
  padding: 0 0 var(--space-xl);
}

.faq__answer p {
  color: var(--color-text-secondary);
  line-height: 1.8;
  font-size: var(--font-size-base);
}
```

**Step 2: Verificar no navegador**

Confirmar accordion com tipografia maior, ícone circular que roda 45° ao abrir, separadores sutis.

**Step 3: Commit**

```bash
git add css/components.css
git commit -m "feat: FAQ accordion refinado com ícone animado e tipografia maior"
```

---

### Task 12: Animações scroll-driven globais

**Files:**
- Modify: `css/utilities.css` (melhorar animação fade-in)

**Step 1: Atualizar classe fade-in em utilities.css**

Localizar `.fade-in` e `.fade-in.visible` e substituir por:

```css
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Commit**

```bash
git add css/utilities.css
git commit -m "feat: animação fade-in mais suave com translateY maior"
```

---

### Task 13: Limpeza e ajustes finais

**Files:**
- Modify: `css/pages.css` (remover regras órfãs)
- Modify: `css/components.css` (remover regras órfãs)
- Modify: `js/main.js` (remover referências a elementos removidos)

**Step 1: Limpar CSS de componentes removidos**

Em `components.css`:
- Remover `.hero__badges*` (se existir)
- Remover `.hero__panel*` (todas as variações: panel-tag, panel-title, panel-text, panel-grid, panel-stat, panel-list, panel-item, panel-links)
- Remover `.hero__slides*`, `.hero__slide*`, `.hero__indicators*`, `.hero__indicator*`
- Remover `.hero__case-link*`
- Remover `.case-card*` e `.cases-carousel*`

Em `pages.css`:
- Remover `.page-home .home-metrics`, `.page-home .home-overview` dos seletores de background
- Remover `.stats-shell*` e `.overview*` (já feito na Task 5, confirmar)
- Remover `.checklist*` (movido para dentro do impact)
- Remover regras de `.methodology*` (substituído por timeline)

Em `js/main.js`:
- Confirmar que não há referências a elementos removidos (hero slides, cases carousel)
- Remover variáveis/funções não utilizadas

**Step 2: Verificar no navegador**

Navegar por toda a home page verificando:
- Hero fullscreen com headline fixa e slider de backgrounds
- Barra de normas abaixo do hero
- Seção impact escura com counters animados
- Grid 2 colunas de serviços
- Cases em zig-zag
- Timeline de metodologia
- Setores com foto de fundo
- FAQ refinado
- Responsividade em mobile (redimensionar janela)

**Step 3: Commit final**

```bash
git add -A
git commit -m "refactor: limpeza de CSS/JS órfão após redesign moderado"
```

---

## Notas de implementação

### Imagens disponíveis para sector cards
- Farmacêutico: `images/portfolio/geolab-area-producao.png`
- Industrial: `images/portfolio/active-ontex-panoramica.png`
- Logística: `images/portfolio/hypera-galpao-autoportante.png`
- Cosméticos: `images/portfolio/brainfarma-fluxo-laminar.png`
- Alimentício: `images/portfolio/louis-dreyfus-envase.png`
- Laboratórios: `images/portfolio/geolab-uta.png`

### Páginas internas (não incluídas neste plano)
Este plano cobre APENAS a `index.html`. As páginas internas (`empresa.html`, `servicos.html`, `obras.html`, `contato.html` e subpáginas) herdam melhorias globais (header, footer, buttons, fade-in) mas não recebem mudanças de layout. Podem ser modernizadas em uma segunda iteração.

### Ordem de execução recomendada
Seguir Tasks 1-13 em sequência. Cada task termina com commit, permitindo rollback granular. Tasks 1-3 (Hero) são interdependentes. Tasks 4-6 (Impact) são interdependentes. Demais tasks são relativamente independentes.
