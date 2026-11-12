/* store.js — persistência leve do protótipo TechCare 60+.
   Guarda os dados no cache do navegador (localStorage), usando os dados
   fictícios abaixo como ponto de partida. Nada é enviado para servidor. */
(function () {
  'use strict';

  var KEY = 'tc60:v1';

  var SEED = {
    currentId: 'maria',
    idosos: [
      {
        id: 'maria', nome: 'Maria Aparecida Souza', idade: 72, nascimento: '12/03/1954', pin: '1234',
        plano: ['m1', 'a1', 'l1'],
        objetivos: 'Estimular memória de curto prazo e evocação de palavras. Manter rotina de atividades em casa 3 vezes por semana.',
        observacoes: 'Prefere atividades pela manhã. Usa óculos para leitura.',
        cuidadorNome: 'Carla Souza (filha)', cuidadorTel: '(61) 9XXXX-XXXX', autoriza: true,
        acess: { fonte: true, contraste: false, audio: true },
        feitas: 9, prev: 12, ultima: 'Hoje, 10:42', desde: '04/08/2026',
        notas: [
          { data: '15/10/2026', texto: 'Boa adesão às atividades em casa. Mais lenta em “Complete a frase”; manter nível fácil por mais duas semanas.' },
          { data: '08/10/2026', texto: 'Compreendeu bem o jogo da memória com mediação. Filha vai acompanhar as atividades das 15h.' }
        ]
      },
      {
        id: 'jose', nome: 'José Pereira', idade: 82, nascimento: '02/01/1944', pin: '0000',
        plano: ['m1', 'a1'],
        objetivos: 'Retomar rotina de atividades e estimular atenção.',
        observacoes: 'Não realizou atividades em casa nesta semana.',
        cuidadorNome: '', cuidadorTel: '', autoriza: false,
        acess: { fonte: true, contraste: true, audio: true },
        feitas: 2, prev: 8, ultima: '15/10, no atendimento', desde: '20/09/2026', notas: []
      },
      {
        id: 'ana', nome: 'Ana Lúcia Martins', idade: 71, nascimento: '27/05/1955', pin: '4321',
        plano: ['m1', 'm2', 'a1', 'l1'],
        objetivos: 'Manter bom ritmo e aumentar gradualmente a dificuldade.',
        observacoes: 'Muito engajada; gosta das atividades de linguagem.',
        cuidadorNome: 'Pedro Martins (filho)', cuidadorTel: '(61) 9XXXX-XXXX', autoriza: true,
        acess: { fonte: false, contraste: false, audio: true },
        feitas: 14, prev: 16, ultima: 'Ontem, 16:05', desde: '10/07/2026', notas: []
      },
      {
        id: 'antonio', nome: 'Antônio Carlos Lima', idade: 85, nascimento: '19/11/1940', pin: '2580',
        plano: ['m1', 'a1'],
        objetivos: 'Estimular memória com apoio do cuidador.',
        observacoes: 'Usa aparelho auditivo. Preferir instruções em áudio.',
        cuidadorNome: 'Marta Lima (esposa)', cuidadorTel: '(61) 9XXXX-XXXX', autoriza: true,
        acess: { fonte: true, contraste: false, audio: true },
        feitas: 6, prev: 8, ultima: 'Hoje, 09:15', desde: '01/09/2026', notas: []
      },
      {
        id: 'helena', nome: 'Helena Rocha', idade: 69, nascimento: '03/02/1957', pin: '1357',
        plano: ['m1', 'a1', 'l1'],
        objetivos: 'Manter rotina e acompanhar evolução da linguagem.',
        observacoes: '',
        cuidadorNome: '', cuidadorTel: '', autoriza: false,
        acess: { fonte: false, contraste: false, audio: false },
        feitas: 7, prev: 12, ultima: '18/10, em casa', desde: '12/08/2026', notas: []
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

  function db() {
    var d = read();
    if (!d || !d.idosos || !d.idosos.length) { d = clone(SEED); write(d); }
    return d;
  }

  function find(d, id) {
    for (var i = 0; i < d.idosos.length; i++) if (d.idosos[i].id === id) return d.idosos[i];
    return null;
  }

  function slug(nome) {
    var base = (nome || 'idoso').toLowerCase();
    try { base = base.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) { }
    base = base.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'idoso';
    return base + '-' + Date.now().toString().slice(-5);
  }

  var TC = {
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
        id: id, nome: '', idade: '', nascimento: '', pin: '',
        plano: [], objetivos: '', observacoes: '', cuidadorNome: '', cuidadorTel: '', autoriza: false,
        acess: { fonte: false, contraste: false, audio: true },
        feitas: 0, prev: 0, ultima: 'Sem atividades ainda', desde: '', notas: []
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

    reset: function () { try { localStorage.removeItem(KEY); } catch (e) { } }
  };

  window.TC = TC;
})();
