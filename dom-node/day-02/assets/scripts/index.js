const navListEl = document.querySelector(".nav-list");
const section01 = document.querySelector("#section-01");
const sectionHeight = section01.clientHeight;
const marginTop = document.querySelector("main").offsetTop;

Array.from(navListEl.children).forEach((navItem, index) => {
  const sectionId = navItem.dataset.id;
  const sectionActive = document.getElementById(`${sectionId}`);
  const startY = sectionActive.offsetTop - marginTop;
  const endY = sectionActive.clientHeight + sectionActive.offsetTop - marginTop;

  navItem.addEventListener("click", function () {
    const elementActive = navListEl.querySelector(".active");
    if (elementActive) {
      elementActive.classList.remove("active");
    }
    navItem.classList.add("active");

    window.scroll({
      top: `${sectionActive.offsetTop - section01.offsetTop}`,
      behavior: "smooth",
    });
  });

  //   let positionY = 0;
  //   window.addEventListener("scroll", function () {
  //     if (
  //       positionY < window.scrollY &&
  //       window.scrollY >= startY &&
  //       window.scrollY <= endY
  //     ) {
  //       const elementActive = navListEl.querySelector(".active");
  //       if (elementActive) {
  //         elementActive.classList.remove("active");
  //       }
  //       navItem.classList.add("active");
  //     }
  //     positionY = window.screenY;
  //   });
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var sectionId = entry.target.id;
          var navItem = document.querySelector(`li[data-id="${sectionId}"]`);
          console.log(sectionId);
          const navActive = navListEl.querySelector(".active");
          if (navActive) {
            navActive.classList.remove("active");
          }
          navItem.classList.add("active");
        }
      });
    },
    {
      threshold: [0.5],
    }
  );

  var sectionList = document.querySelectorAll("section");
  if (sectionList.length) {
    sectionList.forEach(function (sectionEl) {
      observer.observe(sectionEl);
    });
  }
});
