//Initialize all swiper sliders
const swipers = document.querySelectorAll('.swiper');
swipers.forEach((swiperElement) => {
  new Swiper(swiperElement, {
    loop: true,

    pagination: {
      el: swiperElement.querySelector('.swiper-pagination'),
    },

    navigation: {
      nextEl: swiperElement.querySelector('.swiper-button-next'),
      prevEl: swiperElement.querySelector('.swiper-button-prev'),
    },
  });
});