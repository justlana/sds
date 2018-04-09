$(document).on('ready', function() {

  $(".slide-two").slick({
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2
  });

  $(".slide-one").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

});
