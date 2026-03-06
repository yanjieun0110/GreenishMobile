## 📌 Project Overview
웹 개발 초기에 제작한 적응형 쇼핑몰을 모바일 버전으로 코드 구조를 개선하며 퍼블리싱 역량을 성장시킨 단독 프로젝트입니다.

## ⏱️ Development Period
코딩 기간 : 2026.01.06 ~ 2026.01.20 (15일)

## 🛠️ Tech Stack
1. HTML 5
2. CSS
3. JavaScript
4. jQurey

**************************************************
/* main_visual swiper js */
```js
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
  });
```

/* fetch layout js */
```js
document.addEventListener("DOMContentLoaded", function () {
  fetch('./json/main.json')
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
    });
});
```

/* sub 레이아웃 */
```js
fetch('../json/sub.json')
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
      } 
```
/* 옵션 선택 시 정렬 처리 */
```js
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
```

/* 찜하기 jQuery */
```js
$(document).on('click', '.heart_icon', function() {
  $(this).toggleClass('fa-regular fa-solid heart_active');
});
```

/* 장바구니 모달 jQuery */
```js
$(document).on('click', '.cart_icon', function() {
  $('.modal_outer').css('display', 'flex');
  $('body').css('overflow', 'hidden');
});
$('.go_shop').on('click', function() {
  $('.modal_outer').css('display', 'none');
});
```

/* lnb_title li 클릭이벤트 jQuery */
```js
$('#lnb_title li').on('click', function () {
  $('#lnb_title li').removeClass('lnb_chk');
  $(this).addClass('lnb_chk');

  let index = $(this).index();

  $('#lnb_sub ul').hide();
  $('#lnb_sub ul').eq(index).css('display', 'flex');
})
```

/* 푸터 아코디언 */
```js
$('.aco_title').on('click', function() {
   let icon = $(this).find('i');
   let inner = $(this).next('.aco_inner');

    $('.aco_inner').not(inner).slideUp(300);
    $('.aco_title').not(this).find('i').removeClass('fa-solid fa-caret-up').addClass('fa-solid fa-caret-down');

    inner.slideToggle(300);
    icon.toggleClass('fa-caret-down fa-caret-up');
});
```

/* top_event jQuery */
```js
$(window).scroll(function(){
  if($(window).scrollTop() >= 250) {
    $('#top').fadeIn(500);
  } else {
    $('#top').fadeOut(500);
  }
});

$('#top').on('click',function(e){
  e.preventDefault();

  $(window).scrollTo(this.hash || 0, 800);
});
```
