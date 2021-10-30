(() => {
  // src/assets/js/app.js
  document.querySelectorAll("header .btn-navigation").forEach((navigationButton) => {
    navigationButton.addEventListener("click", function(event) {
      event.preventDefault();
      const buttonClicked = event.target;
      const activeSection = document.querySelector("header button.active");
      const idSectionClicked = buttonClicked.id;
      const idCurrentActiveSection = activeSection.id;
      const currentActiveSection = document.querySelector("section#" + idCurrentActiveSection);
      const sectionForActivating = document.querySelector("section#" + idSectionClicked);
      console.log(currentActiveSection);
      console.log(sectionForActivating);
      currentActiveSection.classList.add("hidden");
      sectionForActivating.classList.remove("hidden");
      activeSection.classList.remove("active");
      buttonClicked.classList.add("active");
      console.log("Executed change of menu");
    });
  });
  document.querySelectorAll("main #about .article-selector").forEach((article) => {
    article.addEventListener("click", function(event) {
      event.preventDefault();
      const articleClicked = event.target;
      const idArticleClicked = articleClicked.id;
      const articleSelected = document.querySelector("article#" + idArticleClicked);
      const articleButtonSelected = document.querySelector("#" + idArticleClicked + ".article-selector .btn-article");
      const iconButtonSelected = document.querySelector("#" + idArticleClicked + ".article-selector .btn-article svg");
      if (articleButtonSelected.classList.contains("active")) {
        iconButtonSelected.classList.remove("fa-chevron-up");
        iconButtonSelected.classList.add("fa-chevron-down");
      } else {
        iconButtonSelected.classList.remove("fa-chevron-down");
        iconButtonSelected.classList.add("fa-chevron-up");
      }
      articleSelected.classList.toggle("hidden");
      articleButtonSelected.classList.toggle("active");
      console.log(articleButtonSelected.classList.contains("active"));
    });
  });
})();
