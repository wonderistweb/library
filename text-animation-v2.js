window.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(() => {
    $("[js-line-animation]").each(function (index) {
      gsap.set($(this), { autoAlpha: 1 });
      let textEl = $(this);
      let textContent = $(this).text();
      let tl;

      function splitText() {
        new SplitType(textEl, { types: "lines", tagName: "span" });
        textEl.find(".line").each(function (index) {
          let lineContent = $(this).html();
          $(this).html("");
          $(this).append(
            `<span class="line-inner" style="display: block;">${lineContent}</span>`
          );
        });
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "none play none reset",
          },
        });
        tl.fromTo(
          textEl.find(".line-inner"),
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.3,
            stagger: { amount: 0.5, ease: "power1.out" },
          }
        );
      }
      splitText();

      let windowWidth = window.innerWidth;
      window.addEventListener("resize", function () {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          tl.kill();
          textEl.text(textContent);
          splitText();
        }
      });
    });
  }, 700);
});
