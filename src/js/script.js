/* global $ */
import $ from 'jquery';
import Tab from 'bootstrap';
import LazyLoad from 'vanilla-lazyload';
import { slick } from 'slick-carousel';

var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
});

$(function() {
    function support_format_webp() {
      var elem = document.createElement('canvas');
      if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
      } else {
        return false;
      }
    }

    if (!support_format_webp()) {
      $('body').addClass('webp-not-supported');
    }

    $('.scrollme').on('click', function (event) {
        event.preventDefault();
        var $hash = $(this.hash);
        $('html, body').animate({
            scrollTop: $hash.offset().top,
        }, 300);
    });

    $(window).on('scroll', function(e) {
        var scroll = $(window).scrollTop();

        if ( scroll > $('#ouzzi').offset().top - window.innerHeight ) {
            $('.inscricao-mobile-fixed').css('bottom', scroll - $('#ouzzi').offset().top + window.innerHeight);
        } else {
            $('.inscricao-mobile-fixed').css('bottom', '0px' );
        }
    }).trigger('scroll');

    function slickCarousel() {
      $('.slider-beneficios').slick({
          infinite: true,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1,
          fade: false,
          dots: false,
          arrows: true,
          prevArrow: '<div class="slick-prev"></div>',
          nextArrow: '<div class="slick-next"></div>',
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
      });
    }

    function destroyCarousel() {
      if ($('.slider-beneficios').hasClass('slick-initialized')) {
        $('.slider-beneficios').slick('destroy');
      }
    }

    slickCarousel();

    $('.switch').on('click', function(){
      $(this).closest('section').toggleClass('estagio');
      $(this).closest('section').toggleClass('trainee');
      $(this).toggleClass('estagio');
      $(this).toggleClass('trainee');
      
      if($(this).data('slider')) {
        destroyCarousel();
        slickCarousel();
      }
    });
});