$(document).ready(function () {
    $("main").load("content/inicio.html", function (response, status, xhr) {
        if (status == "error") {
            var msg = "<h4>Ha ocurrido un error: </h4>";
            $("main").html(msg + "<h1 style='color:#f44336'>" + xhr.status + " " + xhr.statusText + "</h1>");
        } else {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    });
    validarScroll();
    validarScrollBtnUp();
    loadBrands();
    cerrarToolTip('[data-nav~="sub-nav-productos"]', '[data-nav~="sub-nav-productos-box"]');
    cerrarToolTip('[data-nav~="sub-nav-soporte"]', '[data-nav~="sub-nav-soporte-box"]');
    $(window).scroll(function () {
        validarScrollBtnUp()
    });
    $('#scroll').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    $('.btnNosotros').click(function () {
        $("main").load("content/nosotros.html", function (response, status, xhr) {
            if (status == "error") {
                var msg = "<h4>Ha ocurrido un error: </h4>";
                $("main").html(msg + "<h1 style='color:#f44336'>" + xhr.status + " " + xhr.statusText + "</h1>");
            } else {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                window.location.hash = 'nosotros';
            }
        }).fadeIn('slow');
    });


});

window.onload = function () {  $('#loaderMain').fadeOut()}

function validarScrollBtnUp() {
    if ($(this).scrollTop() > 100) {
        $('#scroll').fadeIn();
    } else {
        $('#scroll').fadeOut();
    }
}
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
        var origen = this;
        var jash = location.hash;
        if (jash == "#nosotros") {
            $("main").load("content/inicio.html", function (response, status, xhr) {
                if (status == "error") {
                    var msg = "<h4>Ha ocurrido un error: </h4>";
                    $("main").html(msg + "<h1 style='color:#f44336'>" + xhr.status + " " + xhr.statusText + "</h1>");
                } else {
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    window.location.hash = '';
                    console.log($(origen));
                    var elemento = $(origen).data().scroll;
                    $('html, body').animate({
                        scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 60
                    }, 1000);
                }
            }).fadeIn('slow');
        } else {
            var elemento = $(origen).data().scroll;
            $('html, body').animate({
                scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 60
            }, 1000);
        }
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
            console.log(data);
            var obj = JSON.parse(data);
            $('.slider').html('');
            $.each(obj, function (index, value) {
                $('.slider').append(
                    '<div class="image"><img src="images/logos/' + value + '"></div>'
                );
            });

            $('.slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 4000,
            });
        }
    });
}