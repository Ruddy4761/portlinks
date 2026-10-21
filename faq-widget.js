/* PortLinks FAQ widget – floating FAQ button + popup (self-contained: injects its own CSS/HTML).
   Edit the FAQS array below to change the questions and answers. */
(function () {
  'use strict';

  var FAQS = [
    { q: 'How to get started with PortLinks?',
      a: 'Sign up on our portal with your details, choose your profile and start using the platform.',
      link: { text: 'Sign up here', href: 'login.html' } },
    { q: 'Which ports does PortLinks cover?',
      a: 'Our platforms are live on 81 ports in India and 6 ports in Saudi Arabia, including JNPT, Mundra, Navlakhi and Pipavav.' },
    { q: 'Who are the suitable set of users?',
      a: 'Ports and terminals, shipping lines, importers, exporters, transporters and other port users.' },
    { q: 'Which software solutions do you offer?',
      a: 'Port Operating System, FASTag-Enabled PEP/GOS, Importer ERP, Transport ERP, Weighbridge Solutions, Visitor Management and more.',
      link: { text: 'Explore solutions', href: 'software-solutions.html' } },
    { q: 'How can I track my shipment?',
      a: 'Enter your container or BL number in the tracking box on the home page to see its latest status.',
      link: { text: 'Go to tracking', href: 'portlinks-homepage.html' } },
    { q: 'How is support provided?',
      a: 'Our team offers 24/7 support. You can also use the chat assistant or the Connect With Us form, and we will get back to you.',
      link: { text: 'Connect With Us', href: '#demo-dialog' } }
  ];

  var css = '\
.faq-btn{position:fixed;z-index:9998;right:20px;bottom:100px;width:62px;height:62px;border:3px solid var(--gold,#E3A21A);border-radius:50%;\
background:linear-gradient(135deg,var(--navy,#12338F),var(--blue,#1F6FE0));color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;\
box-shadow:0 5px 0 var(--gold-d,#B87F08),0 14px 26px rgba(18,51,143,.35);transition:transform .2s,opacity .2s,visibility .2s}\
.faq-btn:hover{transform:translateY(-3px)}\
.faq-btn:focus-visible{outline:3px solid var(--gold,#E3A21A);outline-offset:3px}\
.faq-btn .f2{display:none}.faq-btn[aria-expanded=true] .f1{display:none}.faq-btn[aria-expanded=true] .f2{display:block}\
.faq-btn.faq-hide{opacity:0;visibility:hidden;pointer-events:none}\
.faq-pop{position:fixed;z-index:9999;right:20px;bottom:172px;width:min(350px,calc(100vw - 32px));\
max-height:min(620px,calc(100vh - 130px));display:flex;flex-direction:column;overflow:hidden;background:#fff;border:2px solid var(--gold,#E3A21A);border-radius:18px;\
box-shadow:0 5px 0 var(--gold-d,#B87F08),0 20px 40px rgba(18,51,143,.3);font-family:Poppins,system-ui,sans-serif;color:var(--ink,#0F1E4A);\
opacity:0;visibility:hidden;transform:translateY(12px) scale(.98);transform-origin:bottom right;\
transition:opacity .2s,transform .2s,visibility .2s}\
.faq-pop.open{opacity:1;visibility:visible;transform:none}\
.faq-pop h2{margin:0;padding:16px 56px 16px 18px;background:linear-gradient(120deg,var(--navy,#12338F),var(--blue,#1F6FE0));color:#fff;font-size:16px;font-weight:700;line-height:1.3}\
.faq-x{position:absolute;top:10px;right:10px;width:34px;height:34px;border:0;background:transparent;border-radius:50%;\
cursor:pointer;font-size:0;display:flex;align-items:center;justify-content:center}\
.faq-x:hover{background:rgba(255,255,255,.15)}\
.faq-list{overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#F7FAFF}\
.faq-it{background:#fff;border:1px solid var(--line,#C9D8F5);border-radius:12px}\
.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;align-items:center;justify-content:space-between;gap:14px;\
padding:12px 14px;cursor:pointer;font:600 13px/1.45 Poppins,system-ui,sans-serif;color:var(--navy,#12338F);border-radius:12px}\
.faq-q:focus-visible{outline:2px solid var(--gold,#E3A21A);outline-offset:-2px}\
.faq-q svg{flex:none;transition:transform .2s}\
.faq-q svg path{stroke:var(--blue,#1F6FE0)}\
.faq-it.open .faq-q svg .v{opacity:0}\
.faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .25s}\
.faq-it.open .faq-a{grid-template-rows:1fr}\
.faq-a>div{overflow:hidden}\
.faq-a p{margin:0;padding:0 14px 4px;font-size:13px;line-height:1.5;color:#2b2b30}\
.faq-a a{display:inline-block;margin:2px 14px 14px;font-size:13px;color:var(--blue,#1F6FE0);font-weight:600;text-decoration:underline}\
.faq-a p:last-child{padding-bottom:16px}\
@media(max-width:480px){.faq-btn{right:16px}.faq-pop{right:16px}}\
@media(prefers-reduced-motion:reduce){.faq-btn,.faq-pop,.faq-a{transition:none}}';

  var PLUS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/><path class="v" d="M12 5v14"/></svg>';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function init() {
    if (document.getElementById('faqbtn')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    var btn = document.createElement('button');
    btn.className = 'faq-btn'; btn.id = 'faqbtn';
    btn.setAttribute('aria-label', 'Open FAQs'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'faqpop');
    btn.innerHTML =
      '<svg class="f1" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.3a2.9 2.9 0 0 1 5.6.9c0 1.9-2.8 2.4-2.8 4"/><circle cx="12" cy="17.4" r=".6" fill="#E3A21A" stroke="#E3A21A"/></svg>' +
      '<svg class="f2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

    var pop = document.createElement('section');
    pop.className = 'faq-pop'; pop.id = 'faqpop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Frequently Asked Questions');
    var items = FAQS.map(function (f, i) {
      return '<div class="faq-it' + (i === 0 ? ' open' : '') + '">' +
        '<button class="faq-q" aria-expanded="' + (i === 0) + '" aria-controls="faqa' + i + '" id="faqq' + i + '"><span>' + esc(f.q) + '</span>' + PLUS + '</button>' +
        '<div class="faq-a" id="faqa' + i + '" role="region" aria-labelledby="faqq' + i + '"><div><p>' + esc(f.a) + '</p>' +
        (f.link ? '<a href="' + esc(f.link.href) + '">' + esc(f.link.text) + '</a>' : '') + '</div></div></div>';
    }).join('');
    pop.innerHTML = '<h2>Frequently Asked Questions</h2>' +
      '<button class="faq-x" aria-label="Close FAQs"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<div class="faq-list">' + items + '</div>';

    document.body.appendChild(btn); document.body.appendChild(pop);

    var chatBtn = document.getElementById('cbtn');

    function place() {
      if (!chatBtn) return;
      var r = chatBtn.getBoundingClientRect();
      if (!r.width) return;
      var right = Math.max(8, document.documentElement.clientWidth - r.right);
      var bottom = window.innerHeight - r.top + 12;
      btn.style.width = btn.style.height = r.width + 'px';
      btn.style.right = right + 'px';
      btn.style.bottom = bottom + 'px';
      pop.style.right = right + 'px';
      pop.style.bottom = (bottom + r.height + 12) + 'px';
      pop.style.maxHeight = 'min(620px,' + Math.max(240, window.innerHeight - bottom - r.height - 36) + 'px)';
      var bg = getComputedStyle(chatBtn).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') btn.style.background = bg;
    }

    function setOpen(o) {
      pop.classList.toggle('open', o);
      btn.setAttribute('aria-expanded', o);
      btn.setAttribute('aria-label', o ? 'Close FAQs' : 'Open FAQs');
      if (o && chatBtn && chatBtn.getAttribute('aria-expanded') === 'true') chatBtn.click();
    }

    btn.addEventListener('click', function () { setOpen(!pop.classList.contains('open')); });
    pop.querySelector('.faq-x').addEventListener('click', function () { setOpen(false); btn.focus(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pop.classList.contains('open')) { setOpen(false); btn.focus(); }
    });

    pop.querySelector('.faq-list').addEventListener('click', function (e) {
      var q = e.target.closest('.faq-q'); if (!q) return;
      var it = q.parentNode, willOpen = !it.classList.contains('open');
      pop.querySelectorAll('.faq-it').forEach(function (x) {
        x.classList.remove('open'); x.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) { it.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    });

    if (chatBtn) {
      chatBtn.addEventListener('click', function () { setTimeout(sync, 0); });
      new MutationObserver(sync).observe(chatBtn, { attributes: true, attributeFilter: ['aria-expanded'] });
    }
    function sync() {
      var chatOpen = chatBtn && chatBtn.getAttribute('aria-expanded') === 'true';
      btn.classList.toggle('faq-hide', !!chatOpen);
      if (chatOpen) { pop.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    }

    place(); sync();
    window.addEventListener('resize', place);
    window.addEventListener('load', place);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
