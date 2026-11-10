# TechCare 60+ — Protótipo

Protótipo navegável do **TechCare 60+**, uma aplicação de tecnologia, saúde e inclusão para a pessoa idosa, com apoio à fonoaudiologia.

Trabalho da disciplina **Engenharia de Requisitos** (CEUB).

**Acesse o protótipo:** https://felipepribeiro697-debug.github.io/TechCare60-/

## O que tem aqui

| Pasta / arquivo | Conteúdo |
|---|---|
| `index.html` | Página inicial com acesso a todas as telas |
| `prototipo/` | 12 telas navegáveis: 7 do app da pessoa idosa (tablet) e 5 da área do profissional (web) |
| `assets/dc-lite.js` | Script que monta as telas e cuida das interações |
| `assets/telas/` | Imagens PNG de cada tela |

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
