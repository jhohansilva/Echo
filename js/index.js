$(document).ready(function () {
    cerrarToolTip('[data-nav~="sub-nav-productos"]', '[data-nav~="sub-nav-productos-box"]');
    cerrarToolTip('[data-nav~="sub-nav-soporte"]', '[data-nav~="sub-nav-soporte-box"]');
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      });
});

$(function () {
    $(document).on('click', '[data-nav]', function (event) {
        var elemento = $(this).data().nav;
        $('[data-nav~="' + elemento + '"]').toggleClass('active');
        var elemento = $(this).data().nav;
        $('[data-nav~="' + elemento + '-box"]').slideToggle('fast');
    });
});

$(function () {
    $(document).on('click', '[data-scroll]', function (event) {
        var elemento = $(this).data().scroll;
        console.log(elemento)
    });
});

function cerrarToolTip(controlador, contenedor) {
    $('html').click(function (e) {
        var container = $(contenedor);
        var controller = $(controlador);
        if ((!controller.is(e.target) && controller.has(e.target).length === 0)) {
            if ((!container.is(e.target) && container.has(e.target).length === 0)) {
                controller.removeClass('active');
                container.slideUp('fast');
            }
        }
    });
}

$(function () {
    $(document).scroll(function () {
        var $nav = $("nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});