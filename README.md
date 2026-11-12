# TechCare 60+ — Protótipo

Protótipo navegável do **TechCare 60+**, uma aplicação de tecnologia, saúde e inclusão para a pessoa idosa, com apoio à fonoaudiologia.

Trabalho da disciplina **Engenharia de Requisitos** (CEUB).

**Acesse o protótipo:** https://felipepribeiro697-debug.github.io/TechCare60-/

## O que tem aqui

| Pasta / arquivo | Conteúdo |
|---|---|
| `index.html` | Tela de acesso: escolha entre entrar como **idoso** ou como **administrador** |
| `prototipo/` | 12 telas navegáveis: 7 do app da pessoa idosa (tablet) e 5 da área do profissional (web) |
| `assets/dc-lite.js` | Script que monta as telas e cuida das interações |
| `assets/telas/` | Imagens PNG de cada tela |

### Como navegar

A página inicial (`index.html`) é a **tela de acesso** com dois caminhos. Cada um leva ao seu próprio login e segue como um app de verdade — não há mais galeria de miniaturas:

- **Sou idoso** → escolher perfil → PIN (4 números quaisquer) → atividades do dia.
- **Sou administrador** → login do profissional → idosos, planos e relatórios.

O botão flutuante **Início** (canto inferior) volta para a tela de acesso a qualquer momento, útil para trocar de perfil durante a apresentação.

### Telas

**App da pessoa idosa (tablet)**

1. Escolher perfil
2. Digitar PIN (aceita quaisquer 4 números)
3. Atividades de hoje
4. Instruções da atividade
5. Jogo da memória (jogável)
6. Atividade concluída
7. Lembrete

**Área do profissional (web)**

8. Login
9. Idosos em acompanhamento
10. Perfil do idoso (acessibilidade e consentimento)
11. Plano de atividades (catálogo com filtro, incluir e remover)
12. Evolução e relatório (troca de período)

## Rodar localmente

Não precisa instalar nada. Na pasta do repositório:

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Avisos

- Todos os nomes, números e gráficos exibidos são **fictícios**.
- As atividades e os indicadores são sugestões que ainda serão validadas com profissionais de fonoaudiologia.
- O protótipo não guarda dados: ao recarregar a página, tudo volta ao estado inicial.
