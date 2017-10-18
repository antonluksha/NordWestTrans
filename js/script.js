(function ($) {
    $(document).ready(function () {


        var lpReady = false;

        function lpGoToActive() {
            var lpPath = window.location.pathname.replace('/', ''),
                lpTrgt;
            if (lpPath != '') {
                lpTrgt = $('#' + lpPath);


                if (lpTrgt.length > 0) {
                    $('body, html').scrollTop(0);

                    if (!$(lpTrgt).hasClass('changingSection')) {

                        $(lpTrgt).addClass('changingSection');
                        var curTab = $(document).find('.activeSection'),
                            nextTab = $(lpTrgt);

                        curTab.removeClass('activeSection');
                        nextTab.addClass('activeSection');
                        var curHeight = curTab.outerHeight();
                        nextTab.show();
                        var nextHeight = nextTab.outerHeight();
                        nextTab.hide();
                        if (curHeight < nextHeight) {
                            $('body, html').scrollTop(0);
                        }

                        curTab.fadeOut(500, function () {
                            if (curHeight > nextHeight) {
                                $('body, html').scrollTop(0);
                            }
                            nextTab.fadeIn(500, function () {
                                curTab.removeClass('activeSection');
                                nextTab.addClass('activeSection');
                                nextTab.removeClass('changingSection');
                            });
                        });
                    }


                }
            }
            setTimeout(function () {
                lpReady = true;
            }, 500);
        }

        lpGoToActive(); // запуск функции ()- есть скобки
        $(window).on('load', lpGoToActive); // в качестве аргумента передается сама фунция () - нет скобок



        /* ========== accordion ===============*/

        $(".toggle-accordion").on("click", function () {
            var accordionId = $(this).attr("accordion-id"),
                numPanelOpen = $(accordionId + ' .collapse.in').length;

            $(this).toggleClass("active");

            if (numPanelOpen == 0) {
                openAllPanels(accordionId);
            } else {
                closeAllPanels(accordionId);
            }
        });

        openAllPanels = function (aId) {
            console.log("setAllPanelOpen");
            $(aId + ' .panel-collapse:not(".in")').collapse('show');
        }
        closeAllPanels = function (aId) {
            console.log("setAllPanelclose");
            $(aId + ' .panel-collapse.in').collapse('hide');
        }


        /* ========== slider ===============*/
        $('.slider').owlCarousel({
            items: 1,
            nav: true,
            loop: true,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
        });

        /* ========== slideShow ===============*/
        $('.portfolio').owlCarousel({
            items: 1,
            nav: true,
            slideBy: 1,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        });
        $('.portfolioNav').owlCarousel({
            nav: true,
            slideBy: 1,
            dots: false,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                768: {
                    items: 3,
                }
            }
        });
        $(".portfolio").on('changed.owl.carousel', function (chengeTab1) {
            var move1 = chengeTab1.item.index;
            $(".portfolioNav").trigger('to.owl.carousel', move1 - 1);
        });
        $(".portfolioNav .owl-item").on('click', function (chengeTab2) {
            var move2 = $(this).index();
            $(".portfolio").trigger('to.owl.carousel', move2);
            $(".portfolioNav").trigger('to.owl.carousel', move2 - 1);
        });

        $('.nwt-gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });


        /* ========== экраны ===============*/
        var nwtNav = $('header ul');

        nwtNav.find('li a').on('click', function (event) {
            var linkTrgt = $($(this).attr('href'));
            var linkTrgt2 = $(this).attr('href');
            if (linkTrgt.length > 0) {
                event.preventDefault();
                if (!$(linkTrgt).hasClass('changingSection')) {

                    $(linkTrgt).addClass('changingSection');
                    var curTab = $(document).find('.activeSection'),
                        nextTab = $(linkTrgt);

                    curTab.removeClass('activeSection');
                    nextTab.addClass('activeSection');
                    var curHeight = curTab.outerHeight();
                    nextTab.show();
                    var nextHeight = nextTab.outerHeight();
                    nextTab.hide();
                    if (curHeight < nextHeight) {
                        $('body, html').scrollTop(0);
                    }

                    curTab.fadeOut(500, function () {
                        if (curHeight > nextHeight) {
                            $('body, html').scrollTop(0);
                        }
                        nextTab.fadeIn(500, function () {
                            curTab.removeClass('activeSection');
                            nextTab.addClass('activeSection');
                            nextTab.removeClass('changingSection');
                        });
                    });
                }


            }

            //  HTML5 History
            // Сохраняем состояние

            if (lpReady) {
                console.log(linkTrgt.attr('id'));
                window.history.pushState({
                    curItemName: linkTrgt.attr('id')
                }, linkTrgt.attr('id'), '/' + linkTrgt.attr('id'));
            }

        });
        /* ========== feedback ===============*/

        $('#nwt-fb1').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: '.nwt-fb1-link',
            fbColor: '#7952b3'
        });
        $('#nwt-fb2').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: false,
            fbColor: '#7952b3'
        });

        /* ========== georrafi ===============*/


        /* ========== Servises ===============*/

        $('.nwt-mfp-inline').magnificPopup({
            type: 'inline'
        });


        /* ==================КАРТА ЯНДЕКС==================*/

        $.fn.nwtMapInit = function () {

            var nwtMapOptions = {
                center: [53.923259, 27.510591],
                zoom: 16,
                controls: ['fullscreenControl', 'zoomControl']
            }

            if (window.innerWidth < 768) {
                nwtMapOptions.behaviors = ['multiTouch'];
            } else {
                nwtMapOptions.behaviors = ['drag']
            }

            var nwtMap = new ymaps.Map('nwt-map', nwtMapOptions);

            var nwtPlacemark = new ymaps.Placemark(nwtMapOptions.center, { //создание маркера
                hintContent: 'НордВестТранс',
                balloonContentHeader: 'НордВестТранс',
                balloonContentBody: 'Логистическая компания',
                balloonContentFooter: 'улица Тимирязева, 65А, офис 607',
            });

            nwtMap.geoObjects.add(nwtPlacemark); //влючение маркета

        };


        /* ========== обертка ===============*/
    });
})(jQuery);

/* ========== Angular ===============*/

//
//var app = angular.module('myApp', []);
//
//app.controller('myCtrl', ['$scope', function ($scope) {
//    
//       $scope.priceTitle = "Прайс-лист";
//    $scope.list = [
//        {
//            name: 'КАРГО 911',
//            date: '2017-09-02',
////            comment: 'У нас с данной компанией была перевозка из Украины в Минск. Очень надежные, всегда вовремя информировали о местонахождении машины, оперативно доставили груз. Побольше бы таких перевозчиков. Советую сотрудничать с данной компанией.',
//            id: 1,
//        }, {
//            name: 'ЧТУП БРАВТ',
//            date: '2017-07-11',
////            comment: 'Огромное спасибо за работу. Все очень профессионально и четко. И особая благодарность Сюзанне.',
//            id: 2,
//        }, {
//            name: 'ЧТУП Амато',
//            date: '2017-02-09',
////            comment: 'Отдельное спасибо Виктории. Четкий, оперативный работник, приятно иметь дело в любых вопросах. Оплата всегда вовремя.',
//            id: 3,
//        }, {
//            name: 'ООО АЯК-БЕЛ',
//            date: '2016-11-08',
////            comment: 'Спасибо за приятное сотрудничество! Уже на протяжении 3 лет возим грузы из России и не только компанией Амато. Всегда слаженная работа коллектива. Особо хотим поблагодарить Ирину, всегда профессиональный и чуткий подход. Информирует на каждом этапе загрузки, доставки, о состоянии заказа. Все возникшие заминки в загрузке, комплектности груза и прочие форс-мажоры решаются оперативно и с лояльностью к Заказчику.',
//            id: 4,
//        }
//    ];
//
//
//
//
//
//
//
//
//
//}]);
//
