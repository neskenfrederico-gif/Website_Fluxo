# Auditoria Visual - Producao fluxo.eng.br
**Data**: 2026-03-16
**URL**: https://www.fluxo.eng.br/
**Viewport**: 1440x900

---

## BUGS CRITICOS (ja corrigidos localmente)

### 1. .htaccess - Redirect prefix match quebra subpaginas
**Arquivo**: `.htaccess`
**Status**: CORRIGIDO localmente, precisa subir para servidor

- `Redirect 301 /servicos /servicos.html` interceptava QUALQUER url com prefixo `/servicos`, redirecionando `/servicos/ar-condicionado-industrial.html` para `/servicos.html/ar-condicionado-industrial.html` (404)
- **Fix**: Trocado para `RedirectMatch 301 ^/servicos$ /servicos.html`

- `Redirect 301 /projetos /obras.html` mesmo problema - interceptava `/projetos/geolab.html` etc., redirecionando para `/obras.html/geolab.html` (404)
- **Fix**: Trocado para `RedirectMatch 301 ^/projetos$ /obras.html`

**Impacto**: Links "Saiba mais" nos cards de servicos e "Ver projeto completo" nos cases da index quebravam completamente.

### 2. Cards Setores - Imagens nao carregam (fundo cinza)
**Arquivo**: `index.html` (linhas 457-504)
**Status**: CORRIGIDO localmente, precisa subir para servidor

- Cards de setores na index (Farmaceutico, Industrial, Logistica, etc.) exibem fundo cinza/prata em vez das fotos de obra
- **Causa**: `url()` dentro de CSS custom properties (inline style `--bg-image`) resolve relativo ao arquivo CSS que consome a variavel (`css/pages.css`), nao relativo ao HTML. Resultado: browser procura em `css/images/portfolio/` em vez de `images/portfolio/`
- **Fix**: Trocado caminhos relativos por absolutos: `url('images/...')` → `url('/images/...')`

### 3. Cache 301 no navegador
**Status**: INFO (nao e bug de codigo)

- Mesmo apos corrigir o `.htaccess` no servidor, navegadores que ja visitaram o site podem ter cacheado os 301 antigos
- Solucao: limpar cache do navegador ou testar em aba anonima
- Hostinger (LiteSpeed): limpar cache em hPanel → Avancado → Gerenciador de Cache

---

## AUDITORIA VISUAL POR PAGINA

### index.html (Home)
- **Hero**: OK - headline, CTAs, scroll indicator, fundo com imagem
- **Badges normativos**: OK - ANVISA, ASHRAE, ISO 14644, NBR 16401, SMACNA
- **Secao Metricas + Overview**: OK - counters (25+, 20.000 TR, 50.000 m2, 7+), checklist 3 itens, 2 CTAs
- **Secao Servicos**: OK - grid 2 colunas, cards com imagem + tag + titulo + descricao + "Saiba mais"
- **Cases**: OK - layout zig-zag com imagem + pills dados tecnicos + "Ver projeto completo"
- **Metodologia**: OK - timeline vertical com numeros em circulos laranja, texto legivel
- **Setores**: BUG - imagens nao carregam (fundo cinza) → CORRIGIDO
- **Base Tecnica**: OK - 2 colunas (Equipamentos + Conformidade), cards com icone circular
- **FAQ**: OK - accordion com icone +, tipografia boa
- **CTA Final**: OK - fundo escuro, 3 botoes
- **Footer**: OK - 4 colunas, logo, navegacao, contato, redes sociais
- **Dropdowns**: OK - Servicos (8 itens vertical) e Setores (6 itens vertical) funcionam com hover

### empresa.html
- **Page header**: OK - breadcrumb + titulo + subtitulo
- **Secao Quem Somos**: OK - texto + imagem + 4 cards destaques
- **Diferenciais Tecnicos**: OK - grid 3 colunas com icones
- **Visao/Missao/RT**: OK - 3 cards alinhados
- **CTA + Footer**: OK

### servicos.html
- **Page header**: OK
- **Escopo completo**: OK - 2 colunas (texto + checklist)
- **Grid de servicos**: OK - 3 colunas com imagem + tag + titulo + descricao + "Saiba mais"
- **CTA + Footer**: OK

### obras.html
- **Page header**: OK
- **Metricas**: OK - 4 counters em linha
- **Portfolio intro**: OK - botoes PDF e contato
- **Filtros**: OK - Todos, Farmaceutico, Industrial, Logistica, Cosmeticos
- **Cards de projetos**: OK - 3 colunas com imagem + tag setor + titulo + cliente + pills + "Ver detalhes"
- **CTA + Footer**: OK

### contato.html
- **Page header**: OK
- **Formulario WhatsApp**: OK - campos nome, email, telefone, empresa, servico, mensagem
- **Cards de contato**: OK - Orcamento tecnico, WhatsApp direto, Portfolio PDF
- **Mapa**: OK - Google Maps embed
- **Footer**: OK

### servicos/ar-condicionado-industrial.html
- **Page header**: OK - breadcrumb 3 niveis
- **Intro**: OK - texto + imagem lateral
- **3 cards topologia**: OK - VRF, Split/Splitao, Fan Coil CAG
- **Escopo**: OK - 2 colunas (Projeto + Instalacao)
- **Servicos relacionados**: OK - 3 cards
- **CTA + Footer**: OK

### servicos/salas-limpas.html
- **Page header**: OK
- **Layout geral**: OK - consistente com ar-condicionado-industrial

### setores/farmaceutico.html
- **Page header**: OK - breadcrumb 3 niveis + subtitulo
- **Intro**: OK - texto + imagem
- **3 cards features**: OK - Normas, Parametros, Qualificacao
- **Tabela classificacao**: OK - Graus A-D com ISO
- **Servicos aplicaveis**: OK - cards com tag + titulo + descricao
- **Projetos realizados**: OK - cards com dados tecnicos
- **CTA padrao**: OK - 2 botoes (Solicitar Orcamento + Ver Portfolio)
- **Footer**: OK

### setores/logistica.html
- **Page header**: OK
- **Layout**: OK - consistente com farmaceutico

### 404.html
- **Layout**: OK - circulo grande com 404, texto explicativo, 3 botoes de navegacao
- **Header**: OK com dropdown

---

## PONTOS DE ATENCAO (nao sao bugs, mas podem melhorar)

1. **Titulos longos no page-header** quebraram em 3-4 linhas (ex: "Ar-Condicionado Industrial", "HVAC para Centros de Distribuicao e Logistica") - considerar `font-size` menor ou `max-width` maior no h1 do page-header
2. **Secao "Escopo completo" no servicos.html** tem muito espaco em branco acima/abaixo entre o header e os cards
3. **Cards de contato** (Orcamento tecnico, WhatsApp direto, Portfolio PDF) sao estreitos - poderiam ter mais padding lateral

---

## ACOES NECESSARIAS

1. **Subir `.htaccess` corrigido** para o servidor (2 RedirectMatch fixes)
2. **Subir `index.html` corrigido** para o servidor (6 caminhos de imagem absolutos nos setores)
3. **Limpar cache LiteSpeed** no hPanel da Hostinger
4. **Testar em aba anonima** apos os uploads para confirmar que tudo funciona

---

## RESUMO

| Pagina | Status | Problemas |
|--------|--------|-----------|
| index.html | BUG CORRIGIDO | Setores sem imagem (caminhos relativos) |
| empresa.html | OK | - |
| servicos.html | OK | - |
| obras.html | OK | - |
| contato.html | OK | - |
| 404.html | OK | - |
| servicos/*.html (8) | OK | Links quebravam pelo .htaccess (CORRIGIDO) |
| setores/*.html (6) | OK | - |
| projetos/*.html (7) | OK | Links quebravam pelo .htaccess (CORRIGIDO) |
| .htaccess | BUG CORRIGIDO | 2 Redirect 301 com prefix match |
