# Premium Polish — Redesign UI/UX Fluxo Engenharia

**Data:** 2026-03-15
**Abordagem:** Premium Polish — redesign visual completo sobre base existente
**Objetivo:** Elevar sofisticacao visual transmitindo autoridade e modernidade
**Restricao:** Manter paleta de cores (laranja #D66B1E + azul escuro #22384C + neutros)

---

## 1. Fundacao (Tokens + Tipografia)

### Tipografia
- **Headings:** Poppins (700/600) — mantido
- **Corpo:** Trocar para Inter (400/500) — melhor legibilidade, hierarquia mais rica
- **Escala:** font-size-base de 1rem para 1.0625rem (17px), font-size-hero maior

### Tokens
- **Sombras:** Tom azulado baseado na cor secundaria. Ex: `0 12px 40px rgba(34, 56, 76, 0.08)`
- **Border radius:** radius-xl 22px→24px, radius-lg 16px→18px
- **Transitions:** Easing `cubic-bezier(0.16, 1, 0.3, 1)` como padrao
- **Glass:** `--glass-bg: rgba(255, 255, 255, 0.72)` + `backdrop-filter: blur(20px)`

### Background pattern
- Trocar grid de linhas por dot pattern sutil

---

## 2. Header + Navegacao

### Header
- Glassmorphism aprimorado: `rgba(255,255,255,0.6)` + `blur(24px)`
- Scroll state: compacta 72px→60px, logo scale(0.88), sombra intensifica
- Logo tagline: ativar em desktop com fade
- Links ativos: underline animado (barra 2px cresce do centro) substituindo pill
- CTA: gradiente refinado + sombra glow `0 4px 16px rgba(214, 107, 30, 0.3)`
- Dropdown: entrada com scale(0.96) + fade + translateY(-4px)

### Menu Mobile
- Overlay 70% opacidade + blur no conteudo atras
- Items com stagger animation (delay 50ms entre cada)

---

## 3. Hero (Home)

### Carousel
- Crossfade com zoom-out cinematografico (opacity + scale 1.05→1.0)
- Texto com reveal animation (clipPath/translateY escalonado)
- Indicadores: barras que preenchem progressivamente (timer visual)

### Badges
- Redesign como glass cards flutuantes (blur + borda semitransparente)

### Side panel stats
- Glassmorphism + counter animation nos numeros

### CTAs
- Primary: gradiente laranja + hover glow + scale(1.02)
- Secondary: ghost com hover fill white 10%

### Overlay
- Radial gradient (bordas mais escuras, centro mais visivel)

---

## 4. Cards + Componentes

### Service cards
- Hover: scale(1.02) + border-left gradient laranja crescendo + sombra glow
- Icone: fundo com gradient sutil
- Linha de acento no topo (4px, gradient laranja→transparente)

### Sector cards
- Hover: background gradient reveal (transparente→laranja 5%)
- Meta com chips compactos

### Portfolio cards
- Hover: overlay gradient escuro + texto "Ver projeto" com fade
- Tag com glassmorphism
- Specs: chips com border ao inves de background solido

### Botoes globais
- Primary: gradiente + hover glow + active scale(0.98)
- Ghost: hover preenche gradualmente
- Outline: hover com gradient border

### FAQ
- Question com hover background sutil
- Answer: max-height transition (suave)
- Icone rotaciona com spring easing

---

## 5. Paginas Internas

### Page Headers
- Parallax CSS (background-attachment ou transform translateZ)
- Titulo maior com letter-spacing: -0.02em
- Breadcrumb mais discreto

### Paginas de Servico (hub)
- Intro 60/40 com imagem border-radius assimetrico
- Feature cards com numero de ordem (01, 02, 03...)
- Normativas: card com icone selo + gradiente
- CTA full-width com gradient dramatico + dot pattern

### Paginas de Projeto
- Ficha tecnica: horizontal scroll em mobile
- Galeria: masonry-like (grid-row: span 2)
- Componentes: timeline vertical

### Contato
- Float label pattern nos inputs
- Icones com bounce ao hover
- Mapa com radius maior + sombra inset

---

## 6. Footer

- Background: gradient dark navy→quase preto + dot pattern
- Layout 4 colunas: logo/descricao | links | servicos | contato
- Links com underline animado (consistente com header)
- Bottom bar com borda top translucida

---

## 7. Animacoes Globais

- Scroll reveal: variantes fade-in-up, fade-in-left, fade-in-scale
- Stagger: grids de cards com delay escalonado (nth-child)
- scroll-behavior: smooth garantido
- Easing organico em todas as transicoes

---

## Stack

- HTML5 + CSS3 + Vanilla JS (sem frameworks adicionais)
- Google Fonts: Inter + Poppins
- CSS: editar tokens.css, components.css, pages.css, reset.css
- JS: editar main.js (counter animation, stagger, reveal variants)
