document.addEventListener("DOMContentLoaded", function () {
  /* 레이아웃 */
  fetch('./json/sub.json')
    .then(response => response.json())
    .then(data => {

      const originData = JSON.parse(JSON.stringify(data));

      function layout(sel = '') {
        for (let category in data) {
          const container = document.querySelector(`.${category}`);
          if (!container) continue;

          let option = '';
          if (category !== 'best') {
            
            option = `
              <div class="option_wrap">
    <select class="option_box" data-category="${category}">
      <option value="" ${sel === '' ? 'selected' : ''}>옵션</option>
      <option value="op01" ${sel === 'op01' ? 'selected' : ''}>인기도순</option>
      <option value="op02" ${sel === 'op02' ? 'selected' : ''}>최신등록순</option>
      <option value="op03" ${sel === 'op03' ? 'selected' : ''}>낮은가격순</option>
      <option value="op04" ${sel === 'op04' ? 'selected' : ''}>높은가격순</option>
      <option value="op05" ${sel === 'op05' ? 'selected' : ''}>리뷰 많은순</option>
    </select>
  </div>
            `;
          }

          const card = data[category].map((item, index) => `
            <section class="roll_item">
              <a href="../html/detail.html">
                <div class="item_img">
                  <img src="${item.img}" alt="${item.name}">
                  <span class="rank_number">${category === 'best' ? index + 1 : ''}</span> <!--랭킹숫자-->
                </div>
                <div class="pro_info">
                  <p class="name">${item.name}</p>
                  <p class="price">${item.won_price}${item.dis_pro ? `<span>${item.dis_pro}</span>` : ''}</p>
                </div>
              </a>

              <div class="icon">
                <i class="fa-regular fa-heart heart_icon"></i>
                <i class="fa-solid fa-bag-shopping cart_icon"></i>
              </div>
            </section>
          `).join('');

          container.innerHTML = option + card;
        }
      } // layout

      /* 옵션 선택 시 정렬 처리 */
      document.body.addEventListener('change', function(e){
        if(!e.target.classList.contains('option_box')) return;

        const category = e.target.dataset.category;
        const sortType = e.target.value;

        if(sortType === "") {
          data[category] = JSON.parse(JSON.stringify(originData[category])); 

        } else {
          data[category].sort((a,b) => {
            switch(sortType){
              case 'op01': return Number(b.pop) - Number(a.pop); // 인기도순
              case 'op02': return Number(b.register) - Number(a.register); // 최신등록순
              case 'op03': return Number(a.price) - Number(b.price); // 낮은가격순
              case 'op04': return Number(b.price) - Number(a.price); // 높은가격순
              case 'op05': return Number(b.review) - Number(a.review); // 리뷰많은순
            }
          });
        }
        layout(sortType);
      });

      /* 탭전환 */
      $('.gnb li').on('click', function () {
      $('.gnb li').removeClass('gnb_chk');
      $(this).addClass('gnb_chk');

      let index = $(this).index();
      $('.tab_box > section').hide().eq(index).css('display', 'flex');

      for (let key in data) {
        data[key] = JSON.parse(JSON.stringify(originData[key]));
      }
      
      layout(''); 
    });

      layout();

    }); //fetch

  /* 해쉬태그로 해당탭 이동 */
  const hash = window.location.hash;
  if (hash) {
    const tabMap = {
      '#tab01': 0,
      '#tab02': 1,
      '#tab03': 2,
      '#tab04': 3,
      '#tab05': 4
    };

    const index = tabMap[hash];
    if (index !== undefined) {
      $('.gnb li').removeClass('gnb_chk');
      $('.gnb li').eq(index).addClass('gnb_chk');

      const tab = $('.tab_box > section');
      tab.hide();
      tab.eq(index).css('display', 'flex');
    }
  } //해쉬태그로 해당탭 이동

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
  

  /* ham메뉴 */
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



  /* pagination */
  $('.pagination li.num').on('click', function () {
    $('.pagination li.num').removeClass('num_chk');
    $(this).addClass('num_chk');
  });//num

  $('.pagination li i').on('click', function () {
    let num = $('.pagination li.num');
    let chk = $('.pagination li.num.num_chk');
    let prev = chk.prev('.num');
    let next = chk.next('.num');

    if ($(this).hasClass('fa-angles-left')) {
      num.removeClass('num_chk');
      $('.pagination li.num:first').addClass('num_chk');
    } //제일처음

    else if ($(this).hasClass('fa-angle-left')) {
      if (prev.length > 0) {
        chk.removeClass('num_chk');
        prev.addClass('num_chk');
      }
    } //이전

    else if ($(this).hasClass('fa-angle-right')) {
      if (next.length > 0) {
        chk.removeClass('num_chk');
        next.addClass('num_chk');
      }
    } //다음

    else if ($(this).hasClass('fa-angles-right')) {
      num.removeClass('num_chk');
      $('.pagination li.num:last').addClass('num_chk');
    } //제일마지막

  });//arrow


  /* 푸터 아코디언 */
  $('.aco_title').on('click', function () {
    let icon = $(this).find('i');
    let inner = $(this).next('.aco_inner');

    $('.aco_inner').not(inner).slideUp(300);
    $('.aco_title').not(this).find('i').removeClass('fa-solid fa-caret-up').addClass('fa-solid fa-caret-down');

    inner.slideToggle(300);
    icon.toggleClass('fa-caret-down fa-caret-up');
  });//푸터 아코디언

  /* top버튼 */
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 250) {
      $('#top').fadeIn(500);
    } else {
      $('#top').fadeOut(500);
    }
  }); //탑버튼 페이드인/아웃

  $('#top').on('click', function (e) {
    e.preventDefault();

    $(window).scrollTo(this.hash || 0, 800);
  });//top이동


});//jQuery