# NUWII — Port da redesign v7 pra prod

Port direto do preview `nuwii-preview-v7` pra estrutura Next.js do projeto. Build testado e passa limpo (`pnpm build`).

## O que mudou

### Tudo novo (criado do zero)
- `src/lib/config.ts` — agora exporta `phoneNumber`, `formattedPhoneNumber`, `displayPhoneNumber`, `instagram*`, `cnpj`, `address` e helpers `waLink(msg)` + `waMessages` (presets de mensagem pré-preenchida pra WhatsApp)
- `src/lib/hooks/useReveal.ts` — hook IntersectionObserver pros efeitos Apple-style + `useCounter` pra animar números na seção Stats
- `src/components/pages/home/home.tsx` — composição nova: Header → Hero → Partners → Features → Stats → Plans → Reviews → Referral (CTA final) → Contact (footer)
- `src/components/pages/home/hero/` — versão clean com parallax no shape, sem badges flutuantes, foto da Alicia + trust strip
- `src/components/pages/home/features/` — 3 splits: Obrigações em dia (mockup checklist), WhatsApp com Corujão e efeito de typing, Calendário dinâmico (sempre mês atual)
- `src/components/pages/home/stats/` — 3 contadores animados (+400 empresas, +5 anos, 24h pra CNPJ)
- `src/components/pages/home/plans/` — 4 planos (Start/Unique destacado/Plus + Starter em accordion), toggle Serviço/Comércio, tooltips em features, callout "tudo incluso"
- `src/components/pages/home/reviews/` — 6 reviews em masonry 3 colunas + card Google 4.9
- `src/components/pages/home/referral/` — repurposed como CTA final ("Não sabe qual plano serve pra você?")
- `src/components/pages/home/contact/` — footer 4 colunas com dados reais (CNPJ, endereço, Instagram, WhatsApp)
- `src/components/pages/home/partners/` — marquee com logos desaturadas
- `src/components/shared/navbar/` — limpo, sem MUI Drawer, mobile menu CSS-driven, blur no scroll
- `public/corujao-avatar.png` — rosto do mascote cortado pra avatar do WhatsApp
- `src/pages/global.css` — design system completo: paleta teal alinhada com logo, tokens, font-faces LinearGrotesk, utilities `.reveal/.scale-in`, suporte a `prefers-reduced-motion`

### Removido / não usado mais
- Importações de MUI/Radix no Home page (todos os componentes foram reescritos sem essas dependências)
- `process/`, `services/`, `services-minimal/`, `about/`, `location/` da pasta `home/` (não usados na composição nova — podem ser deletadas com segurança)
- `LoadingScreen.tsx` do hero (não tem mais splash de loading)

## Pricing (v7 final — conforme PDF de psicologia de preços)

|              | Serviço | Comércio |
|--------------|---------|----------|
| Starter      | R$ 298  | R$ 298   |
| Start        | R$ 397  | R$ 497   |
| **Unique** ★ | R$ 497  | R$ 597   |
| Plus         | R$ 856  | R$ 997   |

Card Unique exibe copy persuasiva: **"Menos de R$ 17/dia · só +R$ 3,33/dia vs Start"** (no toggle Comércio vira "Menos de R$ 20/dia"). O R$ 3,33 funciona pros 2 toggles porque a diferença Start→Unique é R$ 100 em ambos.

Plus do Comércio ficou em R$ 997 (não R$ 1.057) — sacada importante do PDF pra ancorar abaixo da barreira mental de "mil".

## WhatsApp (centralizado)

Todos os CTAs apontam pra `config.phoneNumber = "557131803161"` (formato internacional) via helper `waLink(msg)`. Mensagens pré-prontas em `waMessages`:
- `default` — Falar com Corujão genérico
- `openCompany`, `changeAccountant` — usados no Hero
- `planStart`, `planUnique`, `planPlus`, `planStarter` — cada plano abre WhatsApp com referência ao plano específico (útil pra rastreio depois)

## Como testar

```bash
cd frontend
pnpm install          # ou: npm install --legacy-peer-deps
pnpm dev              # http://localhost:3000
pnpm build            # gera ./out estático pra GitHub Pages
```

Build passou limpo com 1073 packages instalados — sem warning de tipo, sem erro de import.

## Próximos passos sugeridos

1. **Deletar componentes não usados** (process/, services/, services-minimal/, about/, location/) — não afetam build mas ficam só ocupando espaço
2. **Adicionar UTMs nos links wa.me** se quiser rastrear qual CTA converte mais (`waLink(msg + ' [hero-primary]')` ou via query string própria)
3. **Substituir as 6 reviews mock** por reviews reais do Google quando tiver
4. **Hospedar Open Graph image** apontando pra Corujão pra preview do site no WhatsApp/Twitter ficar bonito
