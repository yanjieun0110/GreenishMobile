document.addEventListener("DOMContentLoaded", function () {

  /* 뒤로가기 */
  document.querySelector('.back').addEventListener('click', function (e) {
    e.preventDefault();
    history.back();
  }); //뒤로가기

  /* review */
  fetch('./json/review.json')
    .then(res => res.json())
    .then(data => {

      const originData = JSON.parse(JSON.stringify(data));

      function makeStars(starCount) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
          stars += `<i class="fa-solid fa-star ${i <= starCount ? 'active' : ''}"></i>`;
        }
        return stars;
      }

      function layout(reviews) {
        const container = document.querySelector('.review_inner');

        const card = reviews.map(item => `
          <div class="r_inner">
            <div class="i_top">
              <p class="user_name">${item.name}</p>
              <p><span>${item.date_two}</span> 작성</p>
            </div>

            <div class="i_bottom">
              <div class="i_img">
                <img src="${item.img}" alt="${item.name}">
              </div>

              <div class="i_right">
                <ul class="i_choice">
                  <li>식물 선택: <span>${item.plant}</span></li>
                  <li>추가상품(선택): <span>${item.option}</span></li>
                </ul>

                <div class="star">
                  ${makeStars(item.star)}
                </div>

                <p class="txt">${item.txt}</p>
              </div>
            </div>
          </div>
        `).join('');

        container.innerHTML = card;
      }

      layout(originData.review);

      function applyFilter() {
        const starSelect = document.getElementById('s_star');
        const optionSelect = document.getElementById('s_option');

        if (document.activeElement === starSelect) {
          optionSelect.value = ''; 
        } else if (document.activeElement === optionSelect) {
          starSelect.value = ''; 
        }

        const starVal = document.getElementById('s_star').value;
        const optionVal = document.getElementById('s_option').value;

        let filtered = [...originData.review];

        // 별점 필터
        if (starVal) {
          const starNum = parseInt(starVal.replace('star', ''), 10);
          filtered = filtered.filter(r => r.star === starNum);
        }

        // 옵션 필터
        if (optionVal) {
          if (optionVal === 'op01') {
            filtered.sort((a, b) => b.star - a.star);
          } else if (optionVal === 'op02') {
            filtered.sort((a, b) => a.star - b.star);
          } else if (optionVal === 'op03') {
            filtered = filtered.filter(r => r.img && r.img.trim() !== '');
          }
        }

        layout(filtered);
      }
      
      document.getElementById('s_star').addEventListener('change', applyFilter);
      document.getElementById('s_option').addEventListener('change', applyFilter);

    });// 리뷰 레이아웃




  /* rec 레이아웃 */
  fetch('../json/detail.json')
    .then(res => res.json())
    .then(data => {

      function recLayout() {
        const container = document.querySelector('.rec');

        const card = data.map(item => `
            <section class="roll_item">
          <a href="../html/detail.html">
            <div class="item_img">
              <img src="${item.img}" alt="${item.name}">
              <span class="rank_number"></span>
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
        </section>
        `).join('');
        container.innerHTML = card;
      }
      recLayout();
    });
});//js

/* buy_box */







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


  /* 햄버거버튼 */
  $('#hambergur').on('click', function () {
    $('.ham_outer').css('display', 'block');

    let index = $('.lnb_title li.lnb_chk').index();
    $('.lnb_sub ul').eq(index).show();
  }); //ham_menu_on

  $('#ham_close').on('click', function () {
    $('.ham_outer').css('display', 'none');
  }); //ham_menu_off

  $('#lnb_title li').on('click', function () {
    $('#lnb_title li').removeClass('lnb_chk');
    $(this).addClass('lnb_chk');

    let index = $('.lnb_title li.lnb_chk').index();
    $('#lnb_sub ul').hide();
    $('#lnb_sub ul').eq(index).css('display', 'flex');
  }); //lnb_title li 클릭이벤트



  /* 이미지 클릭 이벤트 */
  $('.small_img li img').on('click', function () {
    const src = $(this).attr('src');

    $('.big_img').css('background-image', `url(${src})`);
  }); //이미지 클릭 이벤트


  /* move_bar */
  $('.move_bar li a').on('click', function (e) {
    e.preventDefault();

    $('.move_bar li').removeClass('bar_chk');
    $(this).closest('li').addClass('bar_chk');

    let target = this.hash;
    let offsetTop = $(target).offset().top - 115;

    $(window).scrollTo(offsetTop, 800);
  }); //move_bar 해쉬 스크롤투


  $(window).on('scroll', function () {
    const scr = $(window).scrollTop() + 250;
    const sections = [
      { el: $('#data') },
      { el: $('#review') },
      { el: $('#delivery') },
      { el: $('#recommend') }
    ];

    let activeIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].el.length && scr >= sections[i].el.offset().top) {
        activeIndex = i;
      }
    }

    $('.move_bar li').removeClass('bar_chk').eq(activeIndex).addClass('bar_chk');
  });
  $(window).trigger('scroll'); //move_bar 스크롤 이벤트


  /* data */
  $('.data_btn').on('click', function () {
    $('.data02').toggle();

    $(this).find('i').toggleClass('fa-angle-down fa-angle-up');

    if ($(this).hasClass('fa-angle-down')) {
      $(this).find('p').text('상품설명 더보기');
    } else {
      $(this).find('p').text('상품설명 닫기');
    }
  }); //data 토글 및 버튼


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


  /* review_write */
  $('#r_btn').on('click', function () {
    $('.review_write').css('display', 'flex');
    $('body').css('overflow', 'hidden');
  }); //review_write_on

  $('#w_xBtn').on('click', function () {
    $('.review_write').css('display', 'none');
    $('body').css('overflow', '');
  }); //review_write_off

  $('.w_star i').on('click', function () {
    const index = $(this).index();

    $(this).nextAll().addClass('w_chk');

    $(this).prevAll().removeClass('w_chk');
    $(this).removeClass('w_chk');
  });


  function showToast() {
    $('.toast p').text('리뷰작성이 완료 되었습니다');

    $('.toast_outer').css('display', 'flex');

    setTimeout(function () {
      $('.toast_outer').css('display', 'none');
      $('.review_write').hide();
    }, 3000);
  }
  $('.submit').on('click', function () {
    showToast();
  }); //리뷰 토스트


  /* nav_wrap */
  $('.nav_zim i').on('click', function(){
    $(this).toggleClass('fa-regular fa-solid heart_active');
  });//찜버튼

  $('.nav_btn .cart').on('click', function(){
    let display = $('.nav_wrap').css('display');

    if(display === 'none'){
        $('.nav_wrap').css('display', 'flex'); // 모달 열기
    } else if(display === 'flex'){
        alert('장바구니에 담겼습니다');
        $('.nav_wrap').css('display', 'none');
    }
  });//모달열기 or 장바구니

  $('.nav_btn .buy').on('click', function(){
    let display = $('.nav_wrap').css('display');

    if(display === 'none'){
        $('.nav_wrap').css('display', 'flex'); // 모달 열기
    } else if(display === 'flex'){
        alert('구매페이지로 이동합니다.');
        $('.nav_wrap').css('display', 'none');
    }
  });//모달열기 or 바로구매

  $('.selector_box').on('click', function(e){
    e.stopPropagation();
  });
  $('.nav_wrap').on('click', function(){
    $(this).css('display', 'none');
  }); //바깥 클릭 시 닫기
  $('#close_buy').on('click',function(){
    $(this).closest('section').css('display', 'none');
  }); //x버튼

  let cnt = 1;
  let price = 27000;
  function pay() {
    let total = price * cnt;
    $('.price').text(total.toLocaleString() + '원');
    $('.last_total span').text((total + 3500).toLocaleString() + '원');
  }
  $('#minus').click(function(){
    if (cnt > 1) {
      cnt --;
    } else{
      alert('최소 1개 이상 구매가 가능합니다.');
    }
    $('.count_box').text(cnt);
    pay();
  });//마이너스버튼
  $('#plus').click(function(){
    cnt ++;
    if (cnt > 10) {
      cnt = 10;
      alert('최대 10개까지 구매 가능합니다.')
    }
    $('.count_box').text(cnt);
    pay();
  });//플러스버튼


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