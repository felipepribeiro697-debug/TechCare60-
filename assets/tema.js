/* tema.js — modo claro / escuro do protótipo TechCare 60+.
   O dc-lite troca cada cor fixa das telas (#RRGGBB) por uma variável CSS
   (--bRRGGBB para fundos, --fRRGGBB para textos, bordas e ícones) com a cor
   original como reserva. Aqui ficam os valores dessas variáveis no modo escuro
   e no alto contraste (acessibilidade do idoso). Trocar de tema é só trocar a
   classe do <html>: a tela não é redesenhada e nada do que foi digitado se perde.
   Cada app guarda sua escolha: admin (web) e idoso (tablet) são aparelhos diferentes. */
(function () {
  'use strict';

  var html = document.documentElement;
  var app = html.getAttribute('data-app') || 'admin';
  var KEY = 'tc60:tema:' + app;

  // Modo escuro. b = fundo, f = texto / borda / ícone.
  var ESCURO = {
    bFFFFFF: '1B2320', bF4F6F3: '111715', bDDE3DF: '0A0E0D', bF0F3F1: '222B28', bE1E6E2: '2C3632',
    b0B5D66: '11717B', b08434A: '0E5C64', b183236: '183236', bE3F0F1: '133A3E', bB9D3D6: '3D6266',
    bE4EEE6: '16331F', b1E6B3A: '2A8A4C', bFFF4D6: '3A2F0E', bFDECE6: '3F2116', bFBE9DF: '3E2518',
    bF1EDFA: '2D2546', bECE6F7: '2D2546', bF9E3EA: '3F1C2A', bB4430F: 'D0622E', b9A3A0C: 'C25A28',
    b5B3F9E: '7E62C8', b8A958F: '4B5752', b1B1F23: 'E6EBE8', bB88A00: 'C99A12',
    f1B1F23: 'E6EBE8', f2B333A: 'CDD5D1', f4A5560: 'A9B4AF', f0B5D66: '5FC6D0', f08434A: '86D6DE',
    fD5DBD7: '33403B', fC9D1CC: '3C4944', f9AA6A0: '5D6A64', fE1E6E2: '2C3632', f8A958F: '8A958F',
    f1E6B3A: '72D294', f14532B: '8EDFA8', f9CC3A8: '2E5C3C', f7A5B00: 'E7C35C', fB88A00: 'D9AD2B',
    f5C4400: 'EFD27E', f4A3800: 'EFD27E', fE2C46A: '7D6A26', f5B3F9E: 'BBA6F2', f3A2A66: 'D7CBF8',
    fB4430F: 'F28C5E', f9A3A0C: 'EF9A6C', f7A2A08: 'F6B397', f9B1C4A: 'F08AB0',
    fE3F0F1: '133A3E', fECE6F7: '2D2546', fFBE9DF: '3E2518', fF4F6F3: '111715'
  };
  // Alto contraste no modo claro: textos mais escuros e bordas mais marcadas.
  var CONTRASTE_CLARO = {
    f1B1F23: '000000', f2B333A: '111518', f4A5560: '1F252A', f0B5D66: '064A52',
    fC9D1CC: '5B6661', fD5DBD7: '5B6661', fE1E6E2: '77837D', f9AA6A0: '3D4742', bE1E6E2: 'C5CEC9'
  };
  // Alto contraste no modo escuro: fundo preto e textos quase brancos.
  var CONTRASTE_ESCURO = {
    bF4F6F3: '000000', bFFFFFF: '0D1110', bDDE3DF: '000000', bE1E6E2: '3A4641',
    f1B1F23: 'FFFFFF', f2B333A: 'F4F7F5', f4A5560: 'DDE4E0', f0B5D66: '86E3EC',
    fC9D1CC: 'A2AEA8', fD5DBD7: '8F9B95', fE1E6E2: '6F7B75', f9AA6A0: 'A2AEA8'
  };

  function bloco(sel, mapa) {
    var out = [];
    for (var k in mapa) out.push('--' + k + ':#' + mapa[k]);
    return sel + '{' + out.join(';') + '}';
  }

  var CSS =
    '@media screen{' +
      bloco('html.tc-dark', ESCURO) +
      bloco('html.tc-hc:not(.tc-dark)', CONTRASTE_CLARO) +
      bloco('html.tc-dark.tc-hc', CONTRASTE_ESCURO) +
      'html.tc-dark{color-scheme:dark}' +
      'html.tc-dark body{background:#0A0E0D}' +
      'html.tc-dark[data-app="admin"] body{background:#111715}' +
      'html.tc-dark.tc-hc body{background:#000}' +
      'html.tc-dark a{color:#5FC6D0}' +
      'html.tc-dark input,html.tc-dark textarea,html.tc-dark select{background-color:#1B2320;color:#E6EBE8}' +
      'html.tc-dark input::placeholder,html.tc-dark textarea::placeholder{color:#7D8984}' +
      'html.tc-dark #dc-root>*{box-shadow:none}' +
    '}' +
    /* Seletor "Aparência" do admin (sol | lua). */
    '.tema-pill{display:inline-flex;gap:4px;padding:4px;border-radius:999px;background:#EEF1EF;border:1px solid #D5DBD7;flex-shrink:0}' +
    '.tema-pill button{width:36px;height:36px;border-radius:50%;border:none;padding:0;background:transparent;color:#6B7671;display:flex;align-items:center;justify-content:center;cursor:pointer;font-family:inherit}' +
    '.tema-pill button:focus-visible{outline:3px solid #0B5D66;outline-offset:1px}' +
    '.tema-pill .t-claro{background:#FFFFFF;color:#C26A00;box-shadow:0 1px 3px rgba(0,0,0,.2)}' +
    'html.tc-dark .tema-pill{background:#0C1110;border-color:#33403B}' +
    'html.tc-dark .tema-pill .t-claro{background:transparent;color:#8A958F;box-shadow:none}' +
    'html.tc-dark .tema-pill .t-escuro{background:#26302C;color:#F59E4B;box-shadow:0 1px 3px rgba(0,0,0,.5)}' +
    /* Botão sol/lua do idoso: mostra a lua no modo claro e o sol no modo escuro. */
    '.tc-ic-escuro{display:none !important}' +
    'html.tc-dark .tc-ic-claro{display:none !important}' +
    'html.tc-dark .tc-ic-escuro{display:block !important}';

  function ler() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function salvar(t) { try { localStorage.setItem(KEY, t); } catch (e) { } }

  function sync() {
    var escuro = html.classList.contains('tc-dark');
    var bs = document.querySelectorAll('[data-tema]');
    for (var i = 0; i < bs.length; i++) {
      var t = bs[i].getAttribute('data-tema');
      if (t === 'alternar') {
        var lbl = escuro ? 'Mudar para o modo claro' : 'Mudar para o modo escuro';
        bs[i].setAttribute('aria-label', lbl);
        bs[i].setAttribute('title', lbl);
      } else {
        bs[i].setAttribute('aria-pressed', (t === 'escuro') === escuro ? 'true' : 'false');
      }
    }
  }

  function aplicar(t) { html.classList.toggle('tc-dark', t === 'escuro'); sync(); }

  var TCTema = {
    escuro: function () { return html.classList.contains('tc-dark'); },
    definir: function (t) { salvar(t); aplicar(t); },
    alternar: function () { this.definir(this.escuro() ? 'claro' : 'escuro'); },
    /* Cor com suporte a tema, para estilos aplicados direto pelo código. */
    cor: function (hex, tipo) { return 'var(--' + (tipo || 'f') + hex.replace('#', '').toUpperCase() + ', ' + hex + ')'; }
  };
  window.TCTema = TCTema;

  aplicar(ler() === 'escuro' ? 'escuro' : 'claro');

  var st = document.createElement('style');
  st.id = 'tc-tema-css';
  st.textContent = CSS;
  (document.head || html).appendChild(st);

  // Botões com data-tema="claro" | "escuro" | "alternar".
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-tema]') : null;
    if (!b) return;
    e.preventDefault();
    var t = b.getAttribute('data-tema');
    if (t === 'alternar') TCTema.alternar(); else TCTema.definir(t);
  });

  // Mantém aria-pressed / aria-label certos depois de cada renderização.
  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('dc-root');
    if (root && window.MutationObserver) new MutationObserver(sync).observe(root, { childList: true });
    sync();
  });

  // Outra aba mudou o tema deste app.
  window.addEventListener('storage', function (e) { if (e.key === KEY) aplicar(e.newValue === 'escuro' ? 'escuro' : 'claro'); });
})();
