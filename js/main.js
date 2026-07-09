/**
 * JAMES MORGAN — Site interactions
 *
 * Restrained scroll reveals. One calm motion per section —
 * faithful to the brand, not a landing-page performance.
 */

(function () {
  'use strict';

  var revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  /* Show elements already in view on load */
  function revealOnScroll() {
    revealElements.forEach(function (el) {
      if (el.classList.contains('is-visible')) return;

      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < windowHeight - 60) {
        el.classList.add('is-visible');
      }
    });
  }

  /* Prefer Intersection Observer when available */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll();
  }

  /* Hero elements visible immediately */
  window.addEventListener('load', function () {
    var heroReveals = document.querySelectorAll('#hero .reveal');
    heroReveals.forEach(function (el, index) {
      setTimeout(function () {
        el.classList.add('is-visible');
      }, index * 80);
    });

    initHeroRotator();
  });

  /**
   * Cycles content categories beneath the hero copy.
   * Calm fade — visible ~2s, then gently transitions to the next phrase.
   */
  function initHeroRotator() {
    var textEl = document.querySelector('.hero-rotator-text');
    if (!textEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var phrases = [
      'Product Demos',
      'Voiceovers',
      'Lifestyle Content',
      'Testimonials',
      'Comedy',
      'Social Content'
    ];

    var FADE_MS = 900;
    var VISIBLE_MS = 2000;
    var index = 0;

    function cycle() {
      textEl.classList.add('is-leaving');

      setTimeout(function () {
        index = (index + 1) % phrases.length;
        textEl.textContent = phrases[index];
        textEl.classList.remove('is-leaving');
        textEl.classList.add('is-entering');

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            textEl.classList.remove('is-entering');
            setTimeout(cycle, VISIBLE_MS);
          });
        });
      }, FADE_MS);
    }

    /* First phrase fades in after the hero appears */
    textEl.classList.add('is-entering');
    setTimeout(function () {
      requestAnimationFrame(function () {
        textEl.classList.remove('is-entering');
        setTimeout(cycle, VISIBLE_MS);
      });
    }, 600);
  }

})();
