document.addEventListener("DOMContentLoaded", function () {

  /* main_visual */
  let swiper = new Swiper(".visual_main", {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 20,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      clickable: true,
    },
    navigation: false
  }); //main_visual


  /* 레이아웃 */
  fetch('../json/main.json')
    .then(response => response.json())
    .then(data => {
      for (let category in data) {
        const container = document.querySelector(`.${category}`);
        if (!container) continue;

        const card = data[category].map(item => `
        <section class="roll_item">
          <a href="./html/detail.html">
            <div class="item_img">
              <img src="${item.img}" alt="${item.name}">
            </div>

            <div class="pro_info">
              <p class="name">${item.name}</p>
              <p class="price">${item.won_price}
              ${item.dis_pro ? `<span>${item.dis_pro}</span>` : ''}
              </p>
            </div>
          </a>

          <div class="icon">
            <i class="fa-regular fa-heart heart_icon"></i>
            <i class="fa-solid fa-bag-shopping cart_icon"></i>
          </div>
        </section>`
        ).join('');

        container.innerHTML = card;
      }
    }); //레이아웃
}); //js



$(function () {
  /* 찜하기 */
  $(document).on('click', '.heart_icon', function() {
    $(this).toggleClass('fa-regular fa-solid heart_active');
  });
  /* 장바구니 모달 */
  $(document).on('click', '.cart_icon', function() {
    $('.modal_outer').css('display', 'flex');
    $('body').css('overflow', 'hidden');
  });
  $('.go_shop').on('click', function() {
    $('.modal_outer').css('display', 'none');
  });

  /* 검색박스 */
  $('#search').on('click', function(){
    $('.search_wrap').css('display', 'block');
  });//search_on
  $('.s_close').on('click', function(){
    $('.search_wrap').css('display','none');
  });//search_off

  $('#hambergur').on('click', function () {
    $('.ham_outer').css('display', 'block');

    let index = $('.lnb_title li.lnb_chk').index();
    $('.lnb_sub ul').eq(index).show();
  });//ham_outer 열기

  $('#ham_close').on('click', function () {
    $('.ham_outer').css('display', 'none');
  }); //ham_outer 닫기

  $('#lnb_title li').on('click', function () {
    $('#lnb_title li').removeClass('lnb_chk');
    $(this).addClass('lnb_chk');

    let index = $(this).index();

    $('#lnb_sub ul').hide();
    $('#lnb_sub ul').eq(index).css('display', 'flex');
  })//lnb_title li 클릭이벤트


  /* 쇼퍼블 */
  $('.bxslider').bxSlider({
    mode: 'horizontal',
    captions: false,
    slideWidth: 600,
    controls: false,
  });//쇼퍼블


  /* 푸터 아코디언 */
  $('.aco_title').on('click', function() {
     let icon = $(this).find('i');
     let inner = $(this).next('.aco_inner');

      $('.aco_inner').not(inner).slideUp(300);
      $('.aco_title').not(this).find('i').removeClass('fa-solid fa-caret-up').addClass('fa-solid fa-caret-down');

      inner.slideToggle(300);
      icon.toggleClass('fa-caret-down fa-caret-up');
    });//푸터 아코디언


    
    /* top버튼 */
    $(window).scroll(function(){
      if($(window).scrollTop() >= 250) {
        $('#top').fadeIn(500);
      } else {
        $('#top').fadeOut(500);
        }
    }); //탑버튼 페이드인/아웃

    $('#top').on('click',function(e){
      e.preventDefault();

      $(window).scrollTo(this.hash || 0, 800);
    }); //top 이동

}); //jQuery