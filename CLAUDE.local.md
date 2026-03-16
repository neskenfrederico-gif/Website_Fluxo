# Fluxo Site - Sessoes

## Sessao 2026-03-17 00:30

**Resumo**: Polimento tecnico dos textos do site inteiro + correcoes visuais na index (circulos impact steps, animacao counters, cases em destaque). Fix mobile hero/cards da sessao anterior.

**Alteracoes**:
- setores/cosmeticos.html: RDC 48/2013 → RDC 752/2022 (norma revogada)
- servicos.html: "aprofunde" → "aprofunde-se", "balanceamento HVAC" → "balanceamento TAB", EMS expandida
- index.html: ordem logica step 02, card controle temp (IBUTG → monitoramento continuo), stats com suffix "+" via CSS ::after
- css/pages.css: impact__step-number — circulo 44px laranja solido, fix especificidade `.impact__step span` → `.impact__step > div span`
- css/pages.css: impact__stat-number::after para "+" em laranja, impact__stat-unit para TR/m²
- css/components.css: case-study__content — fundo surface, borda accent, padding, sombra
- js/main.js: counters com roundToStep (numeros redondos), stagger 150ms, easing cubico
- css/components.css: hero__content padding split (fix mobile)
- css/pages.css: page-header h1 com clamp() e text-wrap balance (fix titulos quebrados)
- empresa.html: stat 1.050 TR → 20.000+ TR, 7 → 7+

**Decisoes**:
- Sufixo "+" nos stats via CSS ::after (data-suffix) para manter cor accent sem quebrar linha
- Counters grandes (20k, 50k) contam em multiplos de 1000 para evitar flickering
- case-study__content com borda-esquerda accent ancora visualmente o texto
- impact__step span tinha especificidade maior que impact__step-number (0-1-1 vs 0-1-0)

**Pendencias**:
- Subir todos os arquivos alterados para o servidor (incluindo sessoes anteriores)
- Limpar cache LiteSpeed no hPanel Hostinger
- Testar em aba anonima apos upload
- Server local: porta 3848

---

## Sessao 2026-03-16 22:00

**Resumo**: Auditoria completa do site em producao (fluxo.eng.br). Corrigidos 3 bugs criticos: redirects .htaccess quebrando subpaginas, imagens dos setores nao carregando, cache LiteSpeed/browser.

**Alteracoes**:
- .htaccess: `Redirect 301 /servicos` → `RedirectMatch 301 ^/servicos$` (fix prefix match)
- .htaccess: `Redirect 301 /projetos` → `RedirectMatch 301 ^/projetos$` (fix prefix match)
- index.html: 6 caminhos de imagem nos sector-cards de relativos para absolutos (`url('images/...')` → `url('/images/...')`)
- docs/auditoria-producao-2026-03-16.md: relatorio completo da auditoria visual

**Decisoes**:
- CSS custom properties com url() resolvem relativo ao CSS, nao ao HTML - usar caminhos absolutos
- RedirectMatch com regex `^...$` para redirects que coexistem com subdiretorios reais
- Cache 301 do browser precisa ser limpo manualmente (aba anonima ou Ctrl+Shift+Del)

**Pendencias**:
- Subir .htaccess e index.html corrigidos para o servidor
- Limpar cache LiteSpeed no hPanel Hostinger
- Testar em aba anonima apos upload
- Verificar responsividade mobile
- Hosting: Hostinger com LiteSpeed (cache agressivo)

---

## Sessao 2026-03-16 15:00

**Resumo**: Continuacao do redesign moderado. Corrigido header em paginas internas, adicionado dropdown Setores, padronizado todas as 27 paginas do site.

**Alteracoes**:
- Header: dropdown Setores adicionado em 27 HTMLs (raiz + servicos/ + setores/ + projetos/)
- Header: fix dropdown hover (ponte ::after para nao perder submenu)
- Header: dropdowns em layout vertical (lista simples)
- Timeline: numeros em circulos laranja com texto branco
- Cards servico: fundo sutil no card__body
- CSS: h3 hub-features aumentado, h2 margin-bottom unificado, section padding normalizado
- CSS: hub-related grid com breakpoints fixos, sector cards gap igualado
- HTML setores (6): subtitle no page-header, h2 em section-header, CTA padronizado 2 botoes, fade-in em containers
- HTML servicos (8): mesmas correcoes dos setores
- Limpeza: removidos 13 PNGs debug e 1 ZIP temporario

**Decisoes**:
- Dropdowns verticais (nao em grid 2 colunas)
- services-intro e hub-intro mantidos separados (layouts diferentes)
- Fade-in aplicado em containers pai, nao em elementos individuais
- CTA padrao: "Solicitar Orcamento" + "Ver Portfolio" (2 botoes)

**Pendencias**:
- Verificar responsividade mobile de todas as paginas
- Possivel refinamento visual adicional nas paginas internas
- Server local rodando em porta 3848 (python http.server)

---
