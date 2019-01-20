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
    if (screen.width < 768) {
        touch();
    }
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
                $('.menu-list li').addClass('navNosotros');
                $('#logo').addClass('logoNosotros');
                $('#footer').addClass('footer-we');
                if (screen.width < 768) toggleNav();
            }
        }).fadeIn('slow');
    });

    getBtnIframe();

});

function getBtnIframe() {
    setTimeout(function () {
        var iframe = document.getElementById('tidio-chat-iframe');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var button = $(innerDoc.body).find('div#button');
        if ($(button).width() == null) getBtnIframe();
        // console.log(button)        
        // console.log($(button).width())
        // console.log($(button).height())

        var bottom = 50;
        $('.ticketContent').css({
            'width': $(button).width() + 'px',
            'height': $(button).height() + 'px',
            'bottom': bottom + 'px'
        }).show('fade');

        $('.scrollContent').css({
            'width': $(button).width() + 'px',
            'height': $(button).height() + 'px',
            'bottom': (bottom + 60) + 'px'
        });
    }, 5000)


}

window.onload = function () { $('#loaderMain').fadeOut() }

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
        var elemento = $(origen).data().scroll;
        if (jash == "#nosotros") {
            $("main").load("content/inicio.html", function (response, status, xhr) {
                if (status == "error") {
                    var msg = "<h4>Ha ocurrido un error: </h4>";
                    $("main").html(msg + "<h1 style='color:#f44336'>" + xhr.status + " " + xhr.statusText + "</h1>");
                } else {
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    window.location.hash = '';
                    if (elemento == 'clientes' && screen.width > 768) {
                        $('html, body').animate({ scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 220 }, 1000);
                    } else {
                        $('html, body').animate({
                            scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 60
                        }, 1000);
                    }
                    $('.menu-list li').removeClass('navNosotros');
                    $('#logo').removeClass('logoNosotros');
                    $('#footer').removeClass('footer-we');
                    loadBrands();
                    if (screen.width < 768) toggleNav();
                }
            })
        } else {
            console.log(elemento)
            // if (elemento == 'estandar' || elemento == 'especializados') {
            //     console.log('test');
            //     $('html, body').animate({
            //         scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top
            //     }, 1000);
            // } else if (elemento == 'salud' || elemento == 'publico') {
            //     $('html, body').animate({
            //         scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 70
            //     }, 1000);
            // } else 
            if (elemento == 'clientes') {
                $('html, body').animate({
                    scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 250
                }, 1000);
            } else {
                $('html, body').animate({
                    scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top
                }, 1000);
            }



            // SEGUNDA EDICION

            // if (elemento == 'clientes') {
            //     if (screen.width < 769) {
            //         $('html, body').animate({
            //             scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 100
            //         }, 1000);
            //         toggleNav();
            //     } else {
            //         $('html, body').animate({
            //             scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 220
            //         }, 1000);
            //     }
            // } else {
            //     if (screen.width < 1025) {
            //         $('html, body').animate({
            //             scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top - 70
            //         }, 1000);
            //         if (screen.width < 769) toggleNav();
            //     } else {
            //         $('html, body').animate({
            //             scrollTop: $('[data-scroll-producto~="' + elemento + '"]').offset().top
            //         }, 1000);
            //     }
            // }
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
            // alert(data);
            var obj = JSON.parse(data);
            $('.slider').html('');
            $.each(obj, function (index, value) {
                $('.slider').append(
                    '<div class="image"><img src="images/logos/' + value + '"></div>'
                );
            });

            if (screen.width < 769) {
                $('.slider').slick({
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplay: false,
                    autoplaySpeed: 4000,
                });
                $('#clientes .slider .image').attr('style', 'width: 90%!important;');
            } else {
                $('.slider').slick({
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    autoplay: false,
                    autoplaySpeed: 4000,
                });
            }
        }
    });
}

$(function () {
    $(document).on('click', '.closeBtnPopup', function (event) {
        $('body').removeClass('greyscreen-open');
        $('#overlayPopup').fadeOut('fast', function () {
            $('#popup').removeClass('popupTickets');
            $('#popup .content').html('');
        });

    });

    $(document).on('click', '[data-popup]', function (event) {
        var elemento = $(this).data().popup;
        $('#popup .content').load("./content/" + elemento + ".html", function (response, status, xhr) {
            if (status == "error") {
                alert('Ha ocurrido un error: ' + response);
            } else {
                if (elemento == 'tickets') $('#popup').addClass('popupTickets');
                $('body').addClass('greyscreen-open');
                $('#overlayPopup').css('display', 'flex').hide().fadeIn('fast');
            }
        });
    });

    $(document).on('click', '#boton-menu', function (event) { toggleNav(); });
    $(document).on('click', '#bg-black', function (event) { toggleNav(); });
});

function toggleNav() {
    $('#menu').removeClass('horizontal-align').toggle("slide", 300);
    $('#bg-black').toggle("fade");
}

function touch() {
    var canvas = document.getElementById('touch');
    canvas.addEventListener('touchstart', touchstart);
    canvas.addEventListener('touchmove', touchmove);
}

function touchstart(e) {
    if (e.targetTouches.length == 1) {
        var touch = e.targetTouches[0];
        xIni = touch.pageX;
        yIni = touch.pageY;
    }
}

function touchmove(e) {
    if (e.targetTouches.length == 1) {
        var touch = e.targetTouches[0];
        if ((touch.pageX > xIni + 70) && (touch.pageY > yIni - 50) && (touch.pageY < yIni + 50)) {
            $('#menu').show('slide', 200);
            $('#bg-black').show('fade', 500);
        }
        if ((touch.pageX < xIni - 40) && (touch.pageY > yIni - 20) && (touch.pageY < yIni + 20)) {
            $('#menu').hide('slide', 300);
            $('#bg-black').hide('fade', 500);
        }
    }
}