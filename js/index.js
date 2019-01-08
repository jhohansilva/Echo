$(document).ready(function () {
    validarScroll();
    loadBrands();
    cerrarToolTip('[data-nav~="sub-nav-productos"]', '[data-nav~="sub-nav-productos-box"]');
    cerrarToolTip('[data-nav~="sub-nav-soporte"]', '[data-nav~="sub-nav-soporte-box"]');

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
        console.log($('[data-scroll-producto~="' + elemento + '"]').offset().top - 20)
        $('html, body').animate({
            scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 60
        }, 1000);
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
    $(document).scroll(validarScroll);
});

function validarScroll() {
    var $nav = $("nav");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
}

function loadBrands() {
    $.ajax({
        url: './load_brands.php',
        type: 'get',
        contentType: 'application/json',
        success: function (data) {
            var obj = JSON.parse(data);
            $.each(obj, function (index, value) {
                $('.slider').append(
                    '<div class="image"><img src="images/logos/' + value + '"></div>'
                );
            });

            $('.slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
            });
        }
    });
}