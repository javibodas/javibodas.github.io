document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });

  $('lang-switcher-button').on('click',function() {
     location.href = $(this).attr('href');
  });
});