const SCROLL_TIME = 100;

function nextSlide(target) {
  jumpSlide(target - 1, target)
}

function jumpSlide(prev, target, t) {
    if (t == undefined) {
        t = SCROLL_TIME;
    }
    setTimeout(function() {
        $('#pres-' + target).css('display', 'block');
        $('#pres-' + prev).css('display', 'none');
    }, t * 2);
    $('html, body').animate({scrollTop : 0}, t);
}