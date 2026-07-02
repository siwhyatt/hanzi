// Shared site header: home link + a dropdown menu listing every lesson.
// Renders into <div id="site-nav-root"></div>, which must be present near the
// top of <body> on every page. Works from any depth (site root, lessons/,
// reference/) by detecting the current path and adjusting link prefixes.

(function () {
  var LESSONS = [
    { n: 1, slug: '0001-foundational-components', glyphs: '人木水口日', title: 'Building Blocks' },
    { n: 2, slug: '0002-woman-and-child', glyphs: '女子', title: 'Woman and Child' },
    { n: 3, slug: '0003-big-small-middle', glyphs: '大小中', title: 'Big, Small, Middle' },
    { n: 4, slug: '0004-up-down-out-in', glyphs: '上下出入', title: 'Up, Down, Out, In' },
    { n: 5, slug: '0005-counting-to-ten', glyphs: '一二三十', title: 'Counting to Ten (Almost)' },
    { n: 6, slug: '0006-counting-completed', glyphs: '四五六七八九', title: 'Counting to Ten, Completed' },
    { n: 7, slug: '0007-mountain-fire-earth', glyphs: '山火土', title: 'Mountain, Fire, Earth' },
    { n: 8, slug: '0008-moon-sky-year', glyphs: '月天年', title: 'Moon, Sky, Year' },
    { n: 9, slug: '0009-hundred-thousand', glyphs: '百千', title: 'Hundred, Thousand' },
    { n: 10, slug: '0010-metal-shell-money', glyphs: '金贝', title: 'Metal, Shell: Money' },
    { n: 11, slug: '0011-hand-heart', glyphs: '手心', title: 'Hand, Heart' },
    { n: 12, slug: '0012-speech', glyphs: '言讠', title: 'Speech' }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('site-nav-root');
    if (!root) return;

    var path = window.location.pathname;
    var prefix = /\/(lessons|reference)\//.test(path) ? '../' : '';
    var currentFile = path.split('/').pop();

    var header = document.createElement('header');
    header.className = 'site-nav';

    var inner = document.createElement('div');
    inner.className = 'site-nav-inner';

    var home = document.createElement('a');
    home.className = 'site-nav-home';
    home.href = prefix + 'index.html';
    home.textContent = '← Home';

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'site-nav-toggle';
    toggle.textContent = 'Lessons ▾';
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');

    var menu = document.createElement('ul');
    menu.className = 'site-nav-menu';

    LESSONS.forEach(function (lesson) {
      var file = lesson.slug + '.html';
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = prefix + 'lessons/' + file;
      if (currentFile === file) {
        a.classList.add('current');
        a.setAttribute('aria-current', 'page');
      }
      a.innerHTML =
        '<span class="menu-num">L' + lesson.n + '</span>' +
        '<span class="menu-glyphs">' + lesson.glyphs + '</span>' +
        '<span class="menu-title">' + lesson.title + '</span>';
      li.appendChild(a);
      menu.appendChild(li);
    });

    var dividerLi = document.createElement('li');
    dividerLi.innerHTML = '<hr class="menu-divider">';
    menu.appendChild(dividerLi);

    var glossaryLi = document.createElement('li');
    var glossaryA = document.createElement('a');
    glossaryA.href = prefix + 'reference/components-glossary.html';
    if (currentFile === 'components-glossary.html') {
      glossaryA.classList.add('current');
      glossaryA.setAttribute('aria-current', 'page');
    }
    glossaryA.innerHTML = '<span class="menu-title">Component Glossary</span>';
    glossaryLi.appendChild(glossaryA);
    menu.appendChild(glossaryLi);

    function closeMenu() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function toggleMenu() {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    inner.appendChild(home);
    inner.appendChild(toggle);
    inner.appendChild(menu);
    header.appendChild(inner);
    root.appendChild(header);
  });
})();
