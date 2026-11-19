/* admin.js — cartão do profissional no rodapé da barra lateral do admin.
   O cartão (<details class="nav-perfil">) abre um menu com "Aparência"
   (modo claro / escuro) e "Sair". Aqui ficam o visual, o preenchimento do
   nome / cargo / e-mail da conta e o fechamento ao clicar fora ou apertar Esc. */
(function () {
  'use strict';

  var CSS =
    '.nav-perfil{margin-top:auto;position:relative}' +
    '.nav-perfil>summary{list-style:none;display:flex;align-items:center;gap:10px;padding:10px;border-radius:12px;cursor:pointer;user-select:none}' +
    '.nav-perfil>summary::-webkit-details-marker{display:none}' +
    '.nav-perfil>summary:hover{border-color:var(--f9AA6A0,#9AA6A0) !important}' +
    '.nav-perfil>summary:focus-visible{outline:3px solid #0B5D66;outline-offset:2px}' +
    '.np-avatar{width:40px;height:40px;flex-shrink:0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;letter-spacing:.5px}' +
    '.np-txt{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}' +
    '.np-nome{font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.np-sub{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.np-chev{flex-shrink:0;transition:transform .15s}' +
    '.nav-perfil[open] .np-chev{transform:rotate(180deg)}' +
    '.perfil-pop{position:absolute;left:0;bottom:calc(100% + 8px);width:max(100%,260px);box-sizing:border-box;border-radius:14px;overflow:hidden;z-index:60;box-shadow:0 12px 32px rgba(0,0,0,.18)}' +
    'html.tc-dark .perfil-pop{box-shadow:0 12px 32px rgba(0,0,0,.55)}' +
    '.pp-head{display:flex;flex-direction:column;gap:2px;padding:14px 16px}' +
    '.pp-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px 10px 16px}' +
    '.pp-sair{display:flex;align-items:center;gap:10px;padding:13px 16px;font-size:15px;font-weight:700;text-decoration:none}' +
    '.pp-sair:hover{background:var(--bF4F6F3,#F4F6F3)}' +
    '@media (prefers-reduced-motion: reduce){.np-chev{transition:none}}' +
    /* Celular: o cartão aparece ao abrir o menu (☰) e o menu dele abre logo abaixo. */
    '@media (max-width: 779px){' +
      'nav[aria-label="Menu principal"]>.nav-perfil{display:none !important}' +
      'nav[aria-label="Menu principal"] .nav-toggle:checked ~ .nav-perfil{display:block !important;margin-top:10px}' +
      '.perfil-pop{position:static;width:auto;margin-top:8px;box-shadow:none !important}' +
    '}';

  var st = document.createElement('style');
  st.id = 'tc-admin-css';
  st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  function preencher() {
    var a = window.TC ? TC.admin() : null;
    if (!a) return;
    var partes = (a.nome || '').trim().split(/\s+/).filter(Boolean);
    var ini = partes.length ? (partes[0].charAt(0) + (partes.length > 1 ? partes[partes.length - 1].charAt(0) : '')).toUpperCase() : '?';
    var vals = { nome: a.nome || 'Profissional', cargo: a.cargo || '', email: a.email || '', inicial: ini };
    var els = document.querySelectorAll('[data-admin]');
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute('data-admin');
      if (vals[k] != null && els[i].textContent !== vals[k]) els[i].textContent = vals[k];
    }
  }

  function fechar(d, focar) {
    d.removeAttribute('open');
    if (focar) { var s = d.querySelector('summary'); if (s) s.focus(); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    preencher();
    var root = document.getElementById('dc-root');
    if (root && window.MutationObserver) new MutationObserver(preencher).observe(root, { childList: true });
  });

  // Clicar fora do cartão fecha o menu.
  document.addEventListener('click', function (e) {
    var abertos = document.querySelectorAll('details.nav-perfil[open]');
    for (var i = 0; i < abertos.length; i++) if (!abertos[i].contains(e.target)) fechar(abertos[i], false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var d = document.querySelector('details.nav-perfil[open]');
    if (d) fechar(d, true);
  });
})();
