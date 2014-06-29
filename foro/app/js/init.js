$(document).ready(function () {
    $('.title').animate({top: '+=240px'}, 'fast');
    $('.subtitle').animate({left: '+=820px'}, 'fast');
    
    $(document.getElementById('button')).click(function() {
        $('.title').remove();
        $('.subtitle').remove();
    });
   
    $(document.getElementById('signup')).click(function(){
        console.log('Hola caracola');
        $('.form').hide('slow');
        $('#container').load('app/templates/html/registro.html','slow');
    });
});
