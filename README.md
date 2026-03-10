## 📌 Project Overview
web - 웹 개발 학습 초기에 제작한 적응형 쇼핑몰 프로젝트로, 브랜드 기획과 콘셉트 설정부터 디자인 및 퍼블리싱까지 전 과정을 단독으로 진행했습니다. JavaScript 없이 CSS만으로 구현한 웹사이트입니다.
mobile - 웹 개발 초기에 제작한 적응형 쇼핑몰을 모바일 버전으로 코드 구조를 개선하며 퍼블리싱 역량을 성장시킨 단독 프로젝트입니다.

## ⏱️ Development Period
web -코딩기간 : 2025.10.24 ~ 25/11/14(22일)
mobile - 코딩 기간 : 2026.01.06 ~ 2026.01.20 (15일)

## 🛠️ Tech Stack
-web-
HTML3
CSS

-mobile-
1. HTML
2. CSS
3. JavaScript
4. jQurey

**************************************************
<web_site 캐러셀 css구현>
<img width="1110" height="510" alt="image" src="https://github.com/user-attachments/assets/5c4e4b1b-db47-4d02-b3b4-26854f27b67c" />

<mobile_site Swiper.js 구현>
<img width="424" height="401" alt="image" src="https://github.com/user-attachments/assets/ddfc1da9-59a4-4697-8cf0-436791595200" />


/* web_서브베너 캐러셀 html */
```html
<div class="banner_zone">
    <div class="visual_main">
      <img src="./img/visual_main.png" alt="비주얼메인">
    </div> <!--visual_main-->

    <div class="sub_banner">
      <input type="radio" name="s_banner" id="s_banner01" checked>
      <input type="radio" name="s_banner" id="s_banner02">
      <input type="radio" name="s_banner" id="s_banner03">

      <div class="sheet">
        <div class="bn_sheet01">
          <a href="./detail/detail.html" class="sh01_img">
            <img src="./img/sub_banner01.png" alt="서브1">
          </a>

          <label for="s_banner03" class="sh01_left"></label>
          <label for="s_banner02" class="sh01_right"></label>
        </div> <!--bn_sheet01-->

        <div class="bn_sheet02">

          <a href="./detail/detail.html" class="sh02_img">
            <img src="./img/sub_banner02.png" alt="서브2">
          </a>


          <label for="s_banner01" class="sh02_left"></label>
          <label for="s_banner03" class="sh02_right"></label>
        </div> <!--bn_sheet02-->

        <div class="bn_sheet03">

          <a href="./detail/detail.html" class="sh03_img">
            <img src="./img/sub_banner03.png" alt="서브3">
          </a>


          <label for="s_banner02" class="sh03_left"></label>
          <label for="s_banner01" class="sh03_right"></label>
        </div> <!--bn_sheet03-->

      </div><!--sheet-->


      <div class="indi">
        <label for="s_banner01"></label>
        <label for="s_banner02"></label>
        <label for="s_banner03"></label>
      </div>
    </div> <!--sub_banner-->
  </div> <!--banner_zone-->
```
/* web_서브베너 캐러셀 css */
```css
/*****************   banner_zone    *****************/
.banner_zone {
  width: 1077px; height: 477px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
}

.banner_zone .visual_main {
  width: 713px;
}
.banner_zone .visual_main img{
  width: 100%; 
}

.banner_zone .sub_banner {
  width: 349px;
  position: relative;
}
#s_banner01, #s_banner02, #s_banner03 {
  display: none;
}

.sheet>div {display: none;}

#s_banner01:checked ~ .sheet .bn_sheet01 {display: block;}
#s_banner02:checked ~ .sheet .bn_sheet02 {display: block;}
#s_banner03:checked ~ .sheet .bn_sheet03 {display: block;}

#s_banner01:checked ~ .indi label:nth-child(1),
#s_banner02:checked ~ .indi label:nth-child(2),
#s_banner03:checked ~ .indi label:nth-child(3) {
  background-color: #00980A;
}

.banner_zone .sub_banner .indi{
  display: flex;
  position: absolute;
  bottom: 10px;
  left: calc(50% - 30px);
}
.banner_zone .sub_banner .indi label {
    display: inline-block;
    width: 15px; 
    height: 15px;
    border-radius: 50%; 
    background-color: #ccc;
    cursor: pointer;
    margin-right: 5px;
  }


/*************  bn_sheet01  ***********/
.banner_zone .sub_banner .bn_sheet01 {
  position: relative;
}
.sub_banner .bn_sheet01 .sh01_img {
  display: block;
  width: 349px;
  overflow: hidden;
}
.sh01_img img {
  width: 100%;
}

.banner_zone .sub_banner .bn_sheet01 .sh01_left {
  width: 48px; height: 48px;
  position: absolute;
  top: calc(50% - 48px); left: -15px;
  cursor: pointer;
  background-image: url('./img/arrow_left_icon.png');
  background-size: cover;
}
.banner_zone .sub_banner .bn_sheet01 .sh01_left:hover {
  background-image: url('./img/arrow_left_icon_hover.png');
  background-size: cover;
}
.banner_zone .sub_banner .bn_sheet01 .sh01_right {
  width: 48px; height: 48px;
  position: absolute;
  top: calc(50% - 48px); right: -15px;
  cursor: pointer;
  background-image: url('./img/arrow_right_icon.png');
  background-size: cover;
}
.banner_zone .sub_banner .bn_sheet01 .sh01_right:hover {
  background-image: url('./img/arrow_right_icon_hover.png');
  background-size: cover;
}
…
```

##

/* mobile_main_visual swiper js */
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
##
/* web_ 레이아웃 */
```html
<div class="sh01 product">
    <div class="productAll">
        <a href="../detail/detail.html">
            <div class="product_img">
                <img src="./img/sh01.jpg" alt="탭시트01">
            </div> <!--product_img-->

            <div class="product_overlay overlay"></div><!--overlay-->
        </a>
    <div class="pro_button">
        <button class="cart">
            <div><img src="./img/shopping_cart_icon.png" alt="장바구니"></div>
        </button> <!--cart-->
        <button class="bookmark">
            <div><img src="./img/bookmark_icon.png" alt="찜하기"></div>
        </button> <!--bookmark-->
    </div><!--pro_button-->
</div> <!--.productAll-->

    <a href="../detail/detail.html">
        <div class="product_txt">
            <p>[식물+화분커버] 나비란 공기정화식물</p>
            <div class="pt_bottom">
                <p>32,000원<span>23%</span></p>
                <p>3,500원</p>
            </div>
            <div class="deli_icon"><img src="./img/delivery_icon.png" alt="배달"></div>
        </div>
    </a>
</div> <!--sh01-->
```

/* mobile_sub 레이아웃 */
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
/* mobile_옵션 선택 시 정렬 처리 */
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

/* web_탭전환 */
/* Tab Menu css */
```css
#tab_btn01:checked~ .sub_tab .label_box label:nth-child(1), 
#tab_btn02:checked~ .sub_tab .label_box label:nth-child(2), 
#tab_btn03:checked~ .sub_tab .label_box label:nth-child(3), 
#tab_btn04:checked~ .sub_tab .label_box label:nth-child(4) {
  border-bottom: 1px solid #00980A;
}
#tab_btn01, #tab_btn02, #tab_btn03, #tab_btn04 {
  display: none;
}

.tab_sh .sh {display: none;}
#tab_btn01:checked ~ .sub_tab .tab_sh .tab_sh01,
#tab_btn02:checked ~ .sub_tab .tab_sh .tab_sh02,
#tab_btn03:checked ~ .sub_tab .tab_sh .tab_sh03,
#tab_btn04:checked ~ .sub_tab .tab_sh .tab_sh04 {display: block;}
```

/* mobile_탭전환 */
```js
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

    });
```

##

/* 찜하기 jQuery */
```js
$(document).on('click', '.heart_icon', function() {
  $(this).toggleClass('fa-regular fa-solid heart_active');
});
```
<img width="176" height="250" alt="image" src="https://github.com/user-attachments/assets/36e6b34f-3d97-4399-8514-1b9497bc8ebc" />
<img width="174" height="251" alt="image" src="https://github.com/user-attachments/assets/87a39f52-ddac-4343-9e2a-e5ed9f740048" />


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
<img width="414" height="274" alt="image" src="https://github.com/user-attachments/assets/0f1984e5-dff9-4733-bf8d-7c437c25933a" />


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

 /* pagination */
 ```js
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
  });
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
<img width="403" height="215" alt="image" src="https://github.com/user-attachments/assets/cf51d66d-d701-45ce-8faf-191062fb3f8b" />


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

/* 뒤로가기 */
```js
document.querySelector('.back').addEventListener('click', function (e) {
    e.preventDefault();
    history.back();
});
```

/* 이미지 클릭 이벤트 */
```js
$('.small_img li img').on('click', function () {
  const src = $(this).attr('src');

  $('.big_img').css('background-image', `url(${src})`);
});
```

/* move_bar hashtag scrollTo */
```js
$('.move_bar li a').on('click', function (e) {
  e.preventDefault();

  $('.move_bar li').removeClass('bar_chk');
  $(this).closest('li').addClass('bar_chk');

  let target = this.hash;
  let offsetTop = $(target).offset().top - 115;

  $(window).scrollTo(offsetTop, 800);
});
```

/* data toggle */
```js
$('.data_btn').on('click', function () {
  $('.data02').toggle();

  $(this).find('i').toggleClass('fa-angle-down fa-angle-up');

  if ($(this).hasClass('fa-angle-down')) {
    $(this).find('p').text('상품설명 더보기');
  } else {
    $(this).find('p').text('상품설명 닫기');
  }
});
```
