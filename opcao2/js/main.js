(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Nav flutua transparente por cima do hero de foto; vira sólida assim
  // que a borda de baixo do hero encosta na própria altura da nav — testado
  // com scroll normal e com salto direto por âncora (#diferencial etc.),
  // que é o caso que quebrava com IntersectionObserver (a seção de destino
  // usa scroll-margin-top, então o hero nunca fica 100% fora da viewport).
  var nav = document.getElementById('topo');
  var heroPhoto = document.querySelector('.hero-photo');
  if (nav && heroPhoto) {
    var updateNav = function () {
      var navHeight = nav.offsetHeight || 72;
      var heroBottom = heroPhoto.getBoundingClientRect().bottom;
      nav.classList.toggle('nav--solid', heroBottom <= navHeight);
    };
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);
    // Navegação direta pra URL com #âncora: o navegador posiciona o
    // scroll antes (ou depois) da imagem do hero terminar de carregar,
    // então um 'scroll' pode não disparar depois disso — reconfere no load.
    window.addEventListener('load', updateNav);
    window.addEventListener('hashchange', function () { setTimeout(updateNav, 0); });
  } else if (nav) {
    nav.classList.add('nav--solid');
  }
})();
