(() => {
  // src/assets/js/app.js
  $(document).ready(function() {
    const slides = document.getElementsByClassName("card");
    const ARROW_RIGHT_CODE = "39";
    const ARROW_LEFT_CODE = "37";
    const cards = slides.length;
    var idPreInitCard = slides[cards - 1].classList[0].substr(6, 7);
    const getActiveSlide = function() {
      const activeSlide = $("[class*='slide-']:not(.hidden)");
      var classesActiveSlide = activeSlide.attr("class").split(" ");
      var intIdActiveSlide = parseInt(classesActiveSlide[0].substr(6, 7));
      return {activeSlide, idActiveSlide: intIdActiveSlide};
    };
    const getNextSlide = function(idPreSlide, direction) {
      var nextIdSlide = 0;
      if (direction === 0) {
        nextIdSlide = (idPreSlide + 1) % cards;
      } else {
        nextIdSlide = idPreSlide - 1 < 0 ? idPreInitCard : idPreSlide - 1;
      }
      var classNextSlide = ".slide-" + nextIdSlide;
      var nextSlide = $(classNextSlide);
      return nextSlide;
    };
    const animateActiveSlide = function(slide, animation) {
      slide.removeClass("fadeIn slideInRight slideInLeft");
      slide.addClass("animated " + animation);
    };
    const animateNextSlide = function(preSlide, nextSlide, animation) {
      var contentNextSlide = nextSlide.children(".card-content");
      nextSlide.css("height", "150px");
      nextSlide.removeClass("hidden");
      nextSlide.addClass("animated " + animation);
      nextSlide.css("align-items", "center");
      contentNextSlide.addClass("hide");
      nextSlide.on("animationend webkitAnimationEnd oAnimationEnd", function() {
        nextSlide.addClass("size-auto");
        nextSlide.css("align-items", "");
        setTimeout(() => {
          nextSlide.css("height", "");
          contentNextSlide.removeClass("hide");
        }, 75);
      });
    };
    const hidePreviousSlide = function(slide, animation) {
      slide.addClass("hidden");
      slide.removeClass("animated size-auto " + animation);
    };
    const moveCardRight = function() {
      const {activeSlide, idActiveSlide} = getActiveSlide();
      animateActiveSlide(activeSlide, "slideOutLeft");
      const nextSlide = getNextSlide(idActiveSlide, 0);
      animateNextSlide(activeSlide, nextSlide, "slideInRight");
      hidePreviousSlide(activeSlide, "slideOutLeft");
    };
    const moveCardLeft = function() {
      const {activeSlide, idActiveSlide} = getActiveSlide();
      animateActiveSlide(activeSlide, "slideOutRight");
      var nextSlide = getNextSlide(idActiveSlide, 1);
      animateNextSlide(activeSlide, nextSlide, "slideInLeft");
      hidePreviousSlide(activeSlide, "slideOutRight");
    };
    $("body").delegate(".fa-chevron-right", "click touchstart", function(e) {
      moveCardRight();
    });
    $("body").delegate(".fa-chevron-left", "click touchstart", function(e) {
      moveCardLeft();
    });
    $(document).keydown(function(event) {
      const keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == ARROW_RIGHT_CODE)
        moveCardRight();
      else if (keycode == ARROW_LEFT_CODE)
        moveCardLeft();
    });
  });
})();
