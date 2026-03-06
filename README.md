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

