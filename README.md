# TechCare 60+ — Protótipo

Protótipo navegável do **TechCare 60+**, uma aplicação de tecnologia, saúde e inclusão para a pessoa idosa, com apoio à fonoaudiologia.

Trabalho da disciplina **Engenharia de Requisitos** (CEUB).

**Acesse o protótipo:** https://felipepribeiro697-debug.github.io/TechCare60-/

## O que tem aqui

| Pasta / arquivo | Conteúdo |
|---|---|
| `index.html` | Tela de acesso: escolha entre entrar como **idoso** ou como **administrador** |
| `prototipo/` | 16 telas navegáveis: 10 do app da pessoa idosa (tablet) e 6 da área do profissional (web) |
| `assets/store.js` | Dados do protótipo (idosos, planos, catálogo de atividades, conta do profissional), guardados no navegador |
| `assets/tema.js` | Modo claro / escuro e alto contraste |
| `assets/dc-lite.js` | Script que monta as telas e cuida das interações |
| `assets/telas/` | Imagens PNG das telas |

### Como navegar

A página inicial (`index.html`) é a **tela de acesso** com dois caminhos. Cada um leva ao seu próprio login e segue como um app de verdade:

- **Sou idoso** → escolher perfil → PIN → atividades do dia.
- **Sou administrador** → login do profissional → idosos, planos e relatórios.

### O admin e o app do idoso usam os mesmos dados

Tudo o que o profissional altera no admin vale na hora no app do idoso:

- **Cadastrar idoso** → o perfil aparece na tela de escolher perfil do app.
- **Nome e PIN** → o app mostra o nome novo e só entra com o PIN cadastrado.
- **Plano de atividades** → as atividades incluídas aparecem em "Atividades de hoje" e as removidas somem.
- **Acessibilidade** → letra grande, alto contraste e instruções em áudio são aplicados no tablet.

O protótipo vem com 8 idosos de exemplo, todos com o PIN `1234`.
Conta do profissional: `fono.exemplo@clinica.com` / `12345678` (já vem preenchida).

### Telas

**App da pessoa idosa (tablet)**

1. Escolher perfil (com passador e indicador de páginas quando há mais de 4 perfis)
2. Digitar PIN (confere o PIN cadastrado)
3. Esqueci meu PIN (mesmo fluxo do admin: e-mail, caixa de entrada simulada e PIN novo)
4. Atividades de hoje (segue o plano; botão sol/lua para modo claro/escuro)
5. Instruções da atividade
6. Jogo da memória (jogável)
7. Complete a frase (5 frases sorteadas de um banco de 10)
8. Outras atividades do catálogo (lembrar a sequência, lista de compras, encontre o diferente, siga as cores, nomeie a figura, palavra e imagem)
9. Atividade concluída
10. Lembrete

**Área do profissional (web)**

11. Login
12. Esqueci minha senha (simula o envio do e-mail e define uma senha nova)
13. Idosos em acompanhamento (busca e cadastro)
14. Perfil do idoso (dados, PIN, acessibilidade, e-mail de recuperação e consentimento)
15. Plano de atividades (catálogo com filtro, incluir e remover)
16. Evolução e relatório (troca de período e exportação em PDF)

No rodapé do menu lateral do admin fica o cartão do profissional: ao clicar nele, abre **Aparência** (modo claro ou escuro) e **Sair**.

## Rodar localmente

Não precisa instalar nada. Na pasta do repositório:

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Avisos

- Todos os nomes, números, e-mails e gráficos exibidos são **fictícios**. Nenhum e-mail é enviado de verdade: a caixa de entrada é uma simulação.
- As atividades e os indicadores são sugestões que ainda serão validadas com profissionais de fonoaudiologia.
- Os dados ficam guardados só no navegador (localStorage). Para voltar ao estado inicial, limpe os dados do site no navegador.
