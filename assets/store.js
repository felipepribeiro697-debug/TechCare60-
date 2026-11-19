/* store.js — persistência leve do protótipo TechCare 60+.
   Guarda os dados no cache do navegador (localStorage), usando os dados
   fictícios abaixo como ponto de partida. Nada é enviado para servidor.
   É a fonte única de dados do admin e do app do idoso: o que o profissional
   altera (nome, PIN, plano de atividades, acessibilidade) vale no app. */
(function () {
  'use strict';

  var KEY = 'tc60:v2'; // v2: 8 idosos de exemplo, todos com PIN 1234

  /* Catálogo de atividades (compartilhado entre o plano do admin e o app do idoso). */
  var CATS = {
    mem: { label: 'Memória', upper: 'MEMÓRIA', color: '#0B5D66', app: '#0B5D66', soft: '#E3F0F1' },
    at: { label: 'Atenção', upper: 'ATENÇÃO', color: '#B4430F', app: '#9A3A0C', soft: '#FBE9DF' },
    lin: { label: 'Linguagem', upper: 'LINGUAGEM', color: '#5B3F9E', app: '#5B3F9E', soft: '#ECE6F7' }
  };

  var ATIVIDADES = [
    { id: 'm1', cat: 'mem', nome: 'Jogo da memória', desc: 'pares de figuras', nivel: 'Fácil (4 pares)', freq: '3x por semana', local: 'Atendimento e casa', lembrete: '10h', sub: 'Cerca de 5 minutos', href: 'Idoso-Instrucao.html', resumo: '4 pares encontrados' },
    { id: 'm2', cat: 'mem', nome: 'Lembrar a sequência', desc: 'repetir ordem de itens', nivel: 'Fácil (3 itens)', freq: '2x por semana', local: 'Casa', lembrete: '10h', resumo: '2 sequências lembradas' },
    { id: 'm3', cat: 'mem', nome: 'Lista de compras', desc: 'memorizar e recordar', nivel: 'Médio', freq: '1x por semana', local: 'Atendimento', lembrete: '—', resumo: '4 itens da lista lembrados' },
    { id: 'a1', cat: 'at', nome: 'Encontre o diferente', desc: 'achar a figura que muda', nivel: 'Fácil', freq: '1x por semana', local: 'Atendimento', lembrete: '—', resumo: '3 figuras diferentes encontradas' },
    { id: 'a2', cat: 'at', nome: 'Siga as cores', desc: 'tocar na ordem indicada', nivel: 'Fácil', freq: '2x por semana', local: 'Casa', lembrete: '11h', resumo: '2 sequências de cores' },
    { id: 'l1', cat: 'lin', nome: 'Complete a frase', desc: 'escolher a palavra certa', nivel: 'Fácil', freq: '3x por semana', local: 'Casa', lembrete: '15h', href: 'Idoso-Frase.html', resumo: '5 frases completadas' },
    { id: 'l2', cat: 'lin', nome: 'Nomeie a figura', desc: 'dizer o nome do objeto', nivel: 'Médio', freq: '2x por semana', local: 'Atendimento', lembrete: '—', resumo: '4 figuras nomeadas' },
    { id: 'l3', cat: 'lin', nome: 'Palavra e imagem', desc: 'associar palavra à figura', nivel: 'Fácil', freq: '2x por semana', local: 'Casa', lembrete: '16h', resumo: '4 palavras ligadas às figuras' }
  ];
  ATIVIDADES.forEach(function (a) {
    if (!a.href) a.href = 'Idoso-Atividade.html?a=' + a.id;
    if (!a.sub) a.sub = a.local === 'Atendimento' ? 'No atendimento' : (a.lembrete && a.lembrete !== '—' ? 'Lembrete às ' + a.lembrete : 'Cerca de 5 minutos');
  });

  var SEED = {
    currentId: 'maria',
    admin: { nome: 'Fernanda Lima', cargo: 'Fonoaudióloga', email: 'fono.exemplo@clinica.com', senha: '12345678' },
    idosos: [
      {
        id: 'maria', nome: 'Maria Aparecida Souza', idade: 72, nascimento: '12/03/1954', pin: '1234',
        email: 'carla.souza@exemplo.com',
        plano: ['m1', 'a1', 'l1'],
        objetivos: 'Estimular memória de curto prazo e evocação de palavras. Manter rotina de atividades em casa 3 vezes por semana.',
        observacoes: 'Prefere atividades pela manhã. Usa óculos para leitura.',
        cuidadorNome: 'Carla Souza (filha)', cuidadorTel: '(61) 9XXXX-XXXX', autoriza: true,
        acess: { fonte: true, contraste: false, audio: true },
        feitas: 9, prev: 12, ultima: 'Hoje, 10:42', desde: '04/08/2026', feitasHoje: ['a1'],
        notas: [
          { data: '15/10/2026', texto: 'Boa adesão às atividades em casa. Mais lenta em “Complete a frase”; manter nível fácil por mais duas semanas.' },
          { data: '08/10/2026', texto: 'Compreendeu bem o jogo da memória com mediação. Filha vai acompanhar as atividades das 15h.' }
        ]
      },
      {
        id: 'jose', nome: 'José Pereira', idade: 82, nascimento: '02/01/1944', pin: '1234',
        email: '',
        plano: ['m1', 'a1'],
        objetivos: 'Retomar rotina de atividades e estimular atenção.',
        observacoes: 'Não realizou atividades em casa nesta semana.',
        cuidadorNome: '', cuidadorTel: '', autoriza: false,
        acess: { fonte: true, contraste: true, audio: true },
        feitas: 2, prev: 8, ultima: '15/10, no atendimento', desde: '20/09/2026', feitasHoje: ['a1'], notas: []
      },
      {
        id: 'ana', nome: 'Ana Lúcia Martins', idade: 71, nascimento: '27/05/1955', pin: '1234',
        email: 'pedro.martins@exemplo.com',
        plano: ['m1', 'm2', 'a1', 'l1'],
        objetivos: 'Manter bom ritmo e aumentar gradualmente a dificuldade.',
        observacoes: 'Muito engajada; gosta das atividades de linguagem.',
        cuidadorNome: 'Pedro Martins (filho)', cuidadorTel: '(61) 9XXXX-XXXX', autoriza: true,
        acess: { fonte: false, contraste: false, audio: true },
        feitas: 14, prev: 16, ultima: 'Ontem, 16:05', desde: '10/07/2026', feitasHoje: ['a1'], notas: []
      },
      {
        id: 'antonio', nome: 'Antônio Carlos Lima', idade: 86, nascimento: '19/11/1940', pin: '1234',
        email: 'marta.lima@exemplo.com',
        plano: ['m1', 'a1'],
        objetivos: 'Estimular memória com apoio do cuidador.',
        observacoes: 'Usa aparelho auditivo. Preferir instruções em áudio.',
        cuidadorNome: 'Marta Lima (esposa)', cuidadorTel: '(61) 9XXXX-XXXX', autoriza: true,
        acess: { fonte: true, contraste: false, audio: true },
        feitas: 6, prev: 8, ultima: 'Hoje, 09:15', desde: '01/09/2026', feitasHoje: ['a1'], notas: []
      },
      {
        id: 'helena', nome: 'Helena Rocha', idade: 69, nascimento: '03/02/1957', pin: '1234',
        email: 'helena.rocha@exemplo.com',
        plano: ['m1', 'a1', 'l1'],
        objetivos: 'Manter rotina e acompanhar evolução da linguagem.',
        observacoes: '',
        cuidadorNome: '', cuidadorTel: '', autoriza: false,
        acess: { fonte: false, contraste: false, audio: false },
        feitas: 7, prev: 12, ultima: '18/10, em casa', desde: '12/08/2026', feitasHoje: ['a1'], notas: []
      },
      {
        id: 'francisco', nome: 'Francisco Alves', idade: 77, nascimento: '08/07/1949', pin: '1234',
        email: 'lucia.alves@exemplo.com',
        plano: ['m1', 'a2', 'l1'],
        objetivos: 'Estimular atenção sustentada e manter a fluência na fala.',
        observacoes: 'Gosta de música; responde bem a instruções curtas.',
        cuidadorNome: 'Lúcia Alves (esposa)', cuidadorTel: '(61) 9XXXX-XXXX', autoriza: true,
        acess: { fonte: true, contraste: false, audio: true },
        feitas: 10, prev: 12, ultima: 'Hoje, 08:50', desde: '15/06/2026', feitasHoje: [], notas: []
      },
      {
        id: 'benedita', nome: 'Benedita Costa', idade: 80, nascimento: '22/01/1946', pin: '1234',
        email: 'rosa.costa@exemplo.com',
        plano: ['m1', 'l2', 'l3'],
        objetivos: 'Estimular a nomeação de objetos do dia a dia.',
        observacoes: 'Baixa visão: manter letra grande e alto contraste.',
        cuidadorNome: 'Rosa Costa (neta)', cuidadorTel: '(61) 9XXXX-XXXX', autoriza: true,
        acess: { fonte: true, contraste: true, audio: true },
        feitas: 5, prev: 10, ultima: 'Ontem, 14:30', desde: '02/09/2026', feitasHoje: [], notas: []
      },
      {
        id: 'raimundo', nome: 'Raimundo Nonato Silva', idade: 74, nascimento: '30/09/1952', pin: '1234',
        email: 'raimundo.silva@exemplo.com',
        plano: ['m2', 'a1', 'l1'],
        objetivos: 'Treinar memória de sequência e retomar a leitura.',
        observacoes: 'Mora sozinho; usa o tablet com autonomia.',
        cuidadorNome: '', cuidadorTel: '', autoriza: false,
        acess: { fonte: false, contraste: false, audio: true },
        feitas: 3, prev: 9, ultima: '17/10, em casa', desde: '25/09/2026', feitasHoje: ['a1'], notas: []
      }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function read() {
    try { var s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) { }
    return null;
  }
  function write(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { }
  }

  function find(d, id) {
    for (var i = 0; i < d.idosos.length; i++) if (d.idosos[i].id === id) return d.idosos[i];
    return null;
  }

  /* Atualiza dados salvos por versões anteriores do protótipo. */
  var OLD_IDS = { memoria: 'm1', atencao: 'a1', linguagem: 'l1' };
  function migrate(d) {
    var changed = false;
    if (!d.admin) { d.admin = clone(SEED.admin); changed = true; }
    if (!d.admin.nome) { d.admin.nome = SEED.admin.nome; d.admin.cargo = SEED.admin.cargo; changed = true; }
    d.idosos.forEach(function (i) {
      var seed = find(SEED, i.id);
      if (!Array.isArray(i.feitasHoje)) { i.feitasHoje = seed ? ['a1'] : []; changed = true; }
      var nf = [];
      i.feitasHoje.forEach(function (x) { x = OLD_IDS[x] || x; if (nf.indexOf(x) < 0) nf.push(x); });
      if (nf.join() !== i.feitasHoje.join()) { i.feitasHoje = nf; changed = true; }
      if (typeof i.email !== 'string') { i.email = seed ? seed.email : ''; changed = true; }
      if (!Array.isArray(i.plano)) { i.plano = []; changed = true; }
    });
    if (changed) write(d);
    return d;
  }

  function db() {
    var d = read();
    if (!d || !d.idosos || !d.idosos.length) { d = clone(SEED); write(d); return d; }
    return migrate(d);
  }

  function slug(nome) {
    var base = (nome || 'idoso').toLowerCase();
    try { base = base.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) { }
    base = base.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'idoso';
    return base + '-' + Date.now().toString().slice(-5);
  }

  function atividade(id) {
    for (var i = 0; i < ATIVIDADES.length; i++) if (ATIVIDADES[i].id === id) return ATIVIDADES[i];
    return null;
  }

  var TC = {
    cats: CATS,

    all: function () { return db().idosos; },

    get: function (id) { return find(db(), id); },

    currentId: function () {
      try {
        var u = new URLSearchParams(location.search).get('id');
        if (u) { this.setCurrent(u); return u; }
      } catch (e) { }
      return db().currentId || 'maria';
    },

    current: function () {
      var d = db();
      return find(d, d.currentId) || d.idosos[0];
    },

    setCurrent: function (id) { var d = db(); d.currentId = id; write(d); },

    update: function (id, patch) {
      var d = db(); var i = find(d, id);
      if (i) { for (var k in patch) i[k] = patch[k]; write(d); }
      return i;
    },

    add: function (obj) {
      var d = db();
      var id = slug(obj && obj.nome);
      var rec = {
        id: id, nome: '', idade: '', nascimento: '', pin: '', email: '',
        plano: [], objetivos: '', observacoes: '', cuidadorNome: '', cuidadorTel: '', autoriza: false,
        acess: { fonte: false, contraste: false, audio: true },
        feitas: 0, prev: 0, ultima: 'Sem atividades ainda', desde: '', feitasHoje: [], notas: []
      };
      for (var k in obj) if (obj[k] !== undefined && obj[k] !== null) rec[k] = obj[k];
      rec.id = id;
      d.idosos.push(rec);
      d.currentId = id;
      write(d);
      return rec;
    },

    addNota: function (id, texto, data) {
      var d = db(); var i = find(d, id);
      if (i) { if (!i.notas) i.notas = []; i.notas.unshift({ data: data || 'Hoje', texto: texto }); write(d); }
      return i;
    },

    // --- catálogo de atividades ---
    atividades: function () { return ATIVIDADES.slice(); },
    atividade: atividade,

    /* Atividades do plano do idoso atual, na ordem definida pelo profissional. */
    planoAtual: function () {
      var i = this.current();
      return ((i && i.plano) || []).map(atividade).filter(Boolean);
    },

    // --- atividades concluídas hoje (app do idoso) ---
    feitasHoje: function () {
      var i = this.current();
      return (i && i.feitasHoje) ? i.feitasHoje.slice() : [];
    },
    marcarFeita: function (atividadeId) {
      var d = db(); var i = find(d, d.currentId) || d.idosos[0];
      if (i) {
        if (!i.feitasHoje) i.feitasHoje = [];
        if (i.feitasHoje.indexOf(atividadeId) < 0) i.feitasHoje.push(atividadeId);
        write(d);
      }
      return i ? i.feitasHoje : [];
    },

    // --- acesso do idoso (PIN) ---
    pinValido: function (pin) { return /^\d{4}$/.test(pin || ''); },
    /* Confere o PIN do idoso atual. Cadastros antigos sem PIN aceitam qualquer número. */
    checkPin: function (pin) {
      var i = this.current();
      if (!i || !this.pinValido(i.pin)) return true;
      return i.pin === pin;
    },

    // --- acesso do profissional ---
    admin: function () { return db().admin; },
    loginAdmin: function (email, senha) {
      var a = db().admin;
      return (email || '').trim().toLowerCase() === a.email.toLowerCase() && senha === a.senha;
    },
    setSenhaAdmin: function (senha) { var d = db(); d.admin.senha = senha; write(d); },

    emailValido: function (e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e || '').trim()); },

    // --- datas no formato DD/MM/AAAA ---
    /* Filtro ao digitar: só números, com as barras colocadas automaticamente.
       "12031954" -> "12/03/1954"; também aceita colar "1954-03-12". */
    mascaraData: function (v) {
      v = v || '';
      var iso = /^\s*(\d{4})-(\d{2})-(\d{2})/.exec(v);
      if (iso) v = iso[3] + iso[2] + iso[1];
      var d = v.replace(/\D/g, '').slice(0, 8);
      if (d.length > 4) return d.slice(0, 2) + '/' + d.slice(2, 4) + '/' + d.slice(4);
      if (d.length > 2) return d.slice(0, 2) + '/' + d.slice(2);
      return d;
    },
    /* Confere uma data de nascimento e calcula a idade. */
    validarNascimento: function (s) {
      var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((s || '').trim());
      if (!m) return { ok: false, erro: 'Data incompleta. Use DD/MM/AAAA.' };
      var dia = +m[1], mes = +m[2], ano = +m[3];
      var dt = new Date(ano, mes - 1, dia);
      if (dt.getFullYear() !== ano || dt.getMonth() !== mes - 1 || dt.getDate() !== dia) return { ok: false, erro: 'Essa data não existe. Confira o dia e o mês.' };
      var hoje = new Date();
      if (dt > hoje) return { ok: false, erro: 'A data de nascimento não pode ser no futuro.' };
      if (ano < 1900) return { ok: false, erro: 'Confira o ano de nascimento.' };
      var idade = hoje.getFullYear() - ano;
      if (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)) idade--;
      return { ok: true, idade: idade };
    },
    /* Idade do idoso: calculada pela data de nascimento quando houver uma válida. */
    idadeDe: function (i) {
      if (!i) return '';
      var v = i.nascimento ? this.validarNascimento(i.nascimento) : null;
      return v && v.ok ? v.idade : i.idade;
    },
    /* "carla.souza@exemplo.com" -> "c•••••••••@exemplo.com" */
    mascararEmail: function (e) {
      e = (e || '').trim();
      var at = e.indexOf('@');
      if (at < 1) return e;
      return e.charAt(0) + new Array(Math.min(at, 10)).join('•') + e.slice(at);
    },

    reset: function () { try { localStorage.removeItem(KEY); } catch (e) { } }
  };

  /* Acessibilidade definida pelo profissional no perfil, aplicada nas telas do
     app do idoso depois que ele escolhe o perfil (<html data-app="idoso">,
     exceto a tela de escolher perfil, marcada com data-publico).
     Letra grande: amplia a tela. Alto contraste: textos e bordas mais fortes
     (cores em tema.js). Sem áudio: esconde os botões "Ouvir". */
  var ACESS_CSS =
    'html.tc-fonte #dc-root>*{zoom:1.15}' +
    'html.tc-sem-audio .tc-ouvir{display:none !important}';

  TC.aplicarAcessibilidade = function () {
    var html = document.documentElement;
    if (!html || html.getAttribute('data-app') !== 'idoso' || html.hasAttribute('data-publico')) return;
    var i = TC.current();
    var a = (i && i.acess) || {};
    html.classList.toggle('tc-fonte', !!a.fonte);
    html.classList.toggle('tc-hc', !!a.contraste);
    html.classList.toggle('tc-sem-audio', a.audio === false);
    if (!document.getElementById('tc-acess-css')) {
      var st = document.createElement('style');
      st.id = 'tc-acess-css';
      st.textContent = ACESS_CSS;
      (document.head || html).appendChild(st);
    }
  };

  window.TC = TC;
  TC.aplicarAcessibilidade();
})();
