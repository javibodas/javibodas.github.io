$(document).ready(function(){

    var slider = $('.slider')
    var cards = 2
    var idPreInitCard = 1

    var getActiveSlide = function(){
        const activeSlide = $("[class*='slide-']:not(.hidden)")

        var classesActiveSlide = activeSlide.attr('class').split(' ')
        var intIdActiveSlide = parseInt(classesActiveSlide[0].substr(6,7))
        return {activeSlide : activeSlide , idActiveSlide : intIdActiveSlide}
    }

    var getNextSlide = function (idPreSlide, direction){
        var nextIdSlide = 0

        if(direction === 0){
            nextIdSlide = (idPreSlide + 1)%cards
        }else{
            nextIdSlide = (idPreSlide - 1) < 0 ? idPreInitCard : (idPreSlide - 1)
        }
        var classNextSlide = '.slide-' + nextIdSlide
        var nextSlide = $(classNextSlide)
        return nextSlide
    }

    var animateActiveSlide = function(slide, animation){
        slide.removeClass('fadeIn slideInRight slideInLeft');
        slide.addClass('animated ' + animation)
    }

    var animateNextSlide = function(preSlide, nextSlide, animation){
        var contentNextSlide = nextSlide.children('.card-content')

        nextSlide.css('height','150px')

        nextSlide.removeClass('hidden')
        nextSlide.addClass('animated ' + animation);
        nextSlide.css('align-items','center');
        contentNextSlide.addClass('hide')
        nextSlide.on('animationend webkitAnimationEnd oAnimationEnd', function(){

            nextSlide.addClass('size-auto');
            nextSlide.css('align-items','');
            //setTimeout( () => {
                //nextSlide.addClass('height-auto'); console.log('Height auto')

                setTimeout( () => {
                    nextSlide.css('height','')
                    contentNextSlide.removeClass('hide')
                }, 75)
            //}, 950)
        })
    }

    var hidePreviousSlide = function(slide, animation){
        slide.addClass('hidden')
        slide.removeClass('animated size-auto ' + animation)
    }

    $("body").delegate('.fa-chevron-right','click touchstart', function(e){

        const {activeSlide, idActiveSlide} = getActiveSlide()
        animateActiveSlide(activeSlide, 'slideOutLeft')

        const nextSlide = getNextSlide(idActiveSlide, 0)
        animateNextSlide(activeSlide, nextSlide, 'slideInRight')

        hidePreviousSlide(activeSlide, 'slideOutLeft')
    })

    $("body").delegate('.fa-chevron-left','click touchstart', function(e){

        const {activeSlide, idActiveSlide} = getActiveSlide()
        animateActiveSlide(activeSlide, 'slideOutRight')

        var nextSlide = getNextSlide(idActiveSlide, 1)

        animateNextSlide(activeSlide, nextSlide, 'slideInLeft')

        hidePreviousSlide(activeSlide, 'slideOutRight')
    })
});