/* dc-lite.js — runtime mínimo para as telas do protótipo TechCare 60+.
   Renderiza o template da página (holes {{ }}, <template data-k="for|if">),
   liga eventos onClick e re-renderiza quando o estado muda. */
(function () {
  'use strict';

  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) {
      if (typeof patch === 'function') patch = patch(this.state, this.props);
      Object.assign(this.state, patch || {});
      schedule();
    }
    forceUpdate() { schedule(); }
  }
  window.DCLogic = DCLogic;

  let comp = null, tpl = null, root = null, pending = false;

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; render(); });
  }

  function look(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    let v = scope;
    for (const p of path.split('.')) {
      if (v == null) return undefined;
      v = v[p];
    }
    return v;
  }

  function interp(s, scope) {
    return s.replace(/\{\{\s*([^}]+?)\s*\}\}/g, function (_, p) {
      const v = look(p, scope);
      return v == null ? '' : String(v);
    });
  }

  function kids(n) {
    return n.tagName && n.tagName.toLowerCase() === 'template' ? n.content.childNodes : n.childNodes;
  }

  function walk(node, scope, parent) {
    if (node.nodeType === 3) {
      parent.appendChild(document.createTextNode(interp(node.textContent, scope)));
      return;
    }
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toLowerCase();
    if (tag === 'template' && node.dataset.k === 'for') {
      const list = look(node.getAttribute('list').replace(/[{}]/g, ''), scope) || [];
      const as = node.getAttribute('as');
      list.forEach(function (item, i) {
        const s = Object.create(scope);
        s[as] = item; s.$index = i;
        for (const c of kids(node)) walk(c, s, parent);
      });
      return;
    }
    if (tag === 'template' && node.dataset.k === 'if') {
      if (look(node.getAttribute('value').replace(/[{}]/g, ''), scope)) {
        for (const c of kids(node)) walk(c, scope, parent);
      }
      return;
    }
    const el = node.cloneNode(false);
    for (const a of Array.from(node.attributes)) {
      if (/^hint-/.test(a.name)) { el.removeAttribute(a.name); continue; }
      const m = a.value.match(/^\{\{\s*([^}]+?)\s*\}\}$/);
      const isEvent = /^on[a-z]+$/i.test(a.name);
      const v = m ? look(m[1], scope) : interp(a.value, scope);
      if (isEvent) {
        el.removeAttribute(a.name);
        if (typeof v === 'function') el.addEventListener(a.name.slice(2).toLowerCase(), v);
        continue;
      }
      if (typeof v === 'function') { el.removeAttribute(a.name); continue; }
      el.setAttribute(a.name, v == null ? '' : String(v));
    }
    for (const c of node.childNodes) walk(c, scope, el);
    parent.appendChild(el);
  }

  function render() {
    const vals = comp.renderVals();
    const frag = document.createDocumentFragment();
    for (const c of tpl.content.childNodes) walk(c, vals, frag);
    root.replaceChildren(frag);
  }

  document.addEventListener('DOMContentLoaded', function () {
    tpl = document.getElementById('dc-tpl');
    root = document.getElementById('dc-root');
    const logic = document.getElementById('dc-logic');
    let props = {};
    try {
      const dp = JSON.parse(logic.getAttribute('data-props') || '{}');
      for (const k in dp) if (k[0] !== '$' && dp[k] && 'default' in dp[k]) props[k] = dp[k].default;
    } catch (e) { /* sem props */ }
    const Component = new Function('DCLogic', logic.textContent + '\nreturn Component;')(DCLogic);
    comp = new Component(props);
    if (typeof comp.componentDidMount === 'function') setTimeout(function () { comp.componentDidMount(); });
    window.addEventListener('beforeunload', function () {
      if (typeof comp.componentWillUnmount === 'function') comp.componentWillUnmount();
    });
    render();
  });
})();
