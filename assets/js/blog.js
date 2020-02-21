document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });

    var toggler = document.getElementsByClassName("caret");
    var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });

  if(toggler[i].textContent == '2020'){
    toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
    toggler[i].classList.toggle("caret-down");
  }else if(toggler[i].textContent == 'Febrero'){
    toggler[i].parentElement.querySelector(".nested").classList.toggle("active");
    toggler[i].classList.toggle("caret-down");
  }
  
}
});

