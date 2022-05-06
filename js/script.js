$(document).ready(function () {
  // 모달창
  let modal_close = $(".modal-close");
  let modal = $(".modal");

  modal_close.click(function () {
    modal.hide();
  });

  // 전체 메뉴

  // 전체 메뉴 보기
  let all = $("#all");
  // 전체 메뉴 버튼 관련 타이머
  let all_timer;
  let all_timer_delay = 100;

  // 전체 메뉴
  let all_menu = $(".all-menu");
  // 기본 메뉴
  let all_list_cate_li = $(".all-list-cate > li");
  // 상세 메뉴
  let all_menu_detail_list = $(".all-menu-detail-list");
  // 전체 dropdown 메뉴 관련 타이머
  let all_menu_timer;
  let all_menu_timer_delay = 100;

  // 전체메뉴 버튼 mouseover, mouseleave
  all.mouseenter(function () {
    all_menu.css("visibility", "visible");
  });
  all.mouseleave(function () {
    all_timer = setTimeout(hideMenu, all_timer_delay);
  });
  // 전체메뉴에 mouseover, mouseleave
  all_menu.mouseenter(function () {
    clearTimeout(all_timer);
  });
  all_menu.mouseleave(function () {
    clearTimeout(all_timer);
    all_timer = setTimeout(hideMenu, all_timer_delay);
  });

  function hideMenu() {
    all_menu.css("visibility", "hidden");
  }

  // 기본 메뉴 : nicescroll 적용
  let all_menu_wrap = $(".all-menu-wrap");
  all_menu_wrap.niceScroll({
    cursoropacitymax: 0.3,
    cursorwidth: "7px",
    cursorborderradius: "10px",
  });

  $.each(all_list_cate_li, function (index, item) {
    $(this).mouseenter(function () {
      clearTimeout(all_menu_timer);
      // 기본 메뉴에 mouseenter하면 기본메뉴 너비가 420px로 증가
      all_menu.addClass("all-menu-active");
      // 해당 기본 메뉴와 연결돼 있는 상세메뉴가 펼쳐짐
      all_menu_detail_list.hide();
      all_menu_detail_list.eq(index).show();
    });

    $(this).mouseleave(function () {
      clearTimeout(all_menu_timer);
      all_menu_timer = setTimeout(allMenuHide, all_menu_timer_delay);
    });
  });

  // 상세 메뉴
  let all_menu_detail = $(".all-menu-detail");
  all_menu_detail.mouseenter(function () {
    clearTimeout(all_menu_timer);
  });
  all_menu_detail.mouseleave(function () {
    clearTimeout(all_menu_timer);
    all_menu_timer = setTimeout(allMenuHide, all_menu_timer_delay);
  });

  // 상세 메뉴 사라지기
  function allMenuHide() {
    clearTimeout(all_menu_timer);
    all_menu.removeClass("all-menu-active");
  }

  // 전체메뉴의 높이는 웹브라우저의 높이를 기준으로 지정
  all_menu.css("height", "calc(100vh - 200px)");

  // 로그인 펼침목록
  let login_menu = $("#login-menu");
  let dropdown_list_login = $(".dropdown-list-login");
  login_menu.click(function (event) {
    event.preventDefault();
    dropdown_list_login.toggle();
    // 참여 & 더보기
    dropdown_list_event.hide();
    dropdown_list_more.hide();

    more.removeClass("dropdown-list-more-active");
    dropdown.removeClass("dropdown-list-event-active");
  });

  // 이벤트목록
  let dropdown = $("#dropdown");
  let dropdown_list_event = $(".dropdown-list-event");
  dropdown.click(function (event) {
    dropdown_list_event.toggle();

    dropdown.toggleClass("dropdown-list-event-active");
    more.removeClass("dropdown-list-more-active");

    dropdown_list_more.hide();
    dropdown_list_login.hide();
  });

  // 더보기 목록
  let more = $("#more");
  let dropdown_list_more = $(".dropdown-list-more");
  more.click(function (event) {
    event.preventDefault();
    dropdown_list_more.toggle();

    // 내용을 변경하기
    let temp = more.hasClass("dropdown-list-more-active");
    if (temp != true) {
      more.html("접기<i></i>");
    } else {
      more.html("더보기<i></i>");
    }

    more.toggleClass("dropdown-list-more-active");
    dropdown.removeClass("dropdown-list-event-active");

    dropdown_list_event.hide();
    dropdown_list_login.hide();
  });

  // 펼침기능
  let link_list = $(".link-list");
  let link_bt = $(".link-bt");
  link_bt.click(function () {
    link_list.stop().slideToggle(300);
  });

  // 위로가기 기능
  let gotop = $(".gotop");
  gotop.click(function () {
    $("html, body").stop().animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  // 스크롤을 내리면 relative였던 header가 fixed로 바뀐다 (padding 조정)
  let header_main = $(".header-main");
  $(window).scroll(function () {
    // 스크롤 바가 이동한 거리 체크
    let sc = $(window).scrollTop();
    if (sc >= 68) {
      header_main.addClass("header-main-active");
      $(".contents").css("padding-top", 63);
    } else {
      header_main.removeClass("header-main-active");
      $(".contents").css("padding-top", 0);
    }
  });
});

window.onload = function () {
  // 상단 슬라이드
  let sw_visual = new Swiper(".sw-visual", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
    loop: true,
    navigation: {
      nextEl: ".sw-visual-next",
      prevEl: ".sw-visual-prev",
    },
    pagination: {
      el: ".sw-visual-pg",
      type: "fraction",
    },
  });

  let sw_visual_pause = $(".sw-visual-pause");
  sw_visual_pause.click(function () {
    // sw-visual-pause-active 적용 되었는지 true, false
    let temp = $(this).hasClass("sw-visual-pause-active");

    if (temp != true) {
      // 적용이 안되었다. 그래서 적용
      $(this).addClass("sw-visual-pause-active");
      sw_visual.autoplay.stop();
    } else {
      // 적용이 되었다.그래서 적용해제
      $(this).removeClass("sw-visual-pause-active");
      sw_visual.autoplay.start();
    }
  });

  // 비주얼 모달창
  let visual_modal_open = $(".sw-visual-bt");
  let visual_modal_close = $(".visual-modal-close");
  let visual_modal = $(".visual-modal");

  visual_modal_open.click(function () {
    visual_modal.fadeIn();
  });

  visual_modal_close.click(function () {
    visual_modal.fadeOut();
  });

  // 알뜰상품 슬라이드
  new Swiper(".sw-sale", {
    slidesPerView: 3,
    spaceBetween: 10,
    // loop: true,
    slidesPerGroup: 3,
    navigation: {
      nextEl: ".sw-sale-next",
      prevEl: ".sw-sale-prev",
    },
    pagination: {
      el: ".sw-sale-pg",
      type: "fraction",
    },
  });

  // 추천물품 슬라이드
  new Swiper(".sw-copartner", {
    slidesPerView: 3,
    spaceBetween: 10,
    // loop: true,
    slidesPerGroup: 3,
    navigation: {
      nextEl: ".sw-copartner-next",
      prevEl: ".sw-copartner-prev",
    },
    pagination: {
      el: ".sw-copartner-pg",
      type: "fraction",
    },
  });

  // 지금 가장 많이 이용하는 인기물품
  // 카테고리별 데이터
  let data_arr = [];
  // 타이틀 데이터
  let data_title = [];

  // popular 데이터 출력을 위한 데이터
  fetch("./data.json")
    .then((res) => res.json())
    // result는 임의의 결과값이며 res.json의 결과값.
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        let data = result[i];
        data_title[i] = data.title;
        data_arr[i] = data.arr;
      }

      p_change(data_arr[0]);
      $(".section-bt-tab").text(`${p_tab.eq(0).text()} 더보기`);
    });

  // 내용이 나올 장소
  let p_bottom = $(".popular-bottom");

  // 내용 갱신
  function p_change(_arr) {
    // 최종 a 태그 html 을 저장하는 용도
    let temp = "";

    for (let i = 0; i < _arr.length; i++) {
      let data = _arr[i];

      temp += `<a href="${data.link}" class="good-link">
                <span class="good-img">
                    <img src="images/${data.img}" alt="제품">
                </span>
                <div class="good-info">`;

      if (data.cate != "") {
        temp += `<span class="good-cate"><em class="good-cate-txt">${data.cate}</em></span>`;
      }

      temp += `
                    <span class="good-title">
                    ${data.title}
                    </span>
                    <span class="good-price">
                        <b>${data.price}</b>원
                    </span>
                </div>`;

      // data type에 따라서 tag 탈부착
      if (data.type == 0) {
      } else if (data.type == 1) {
        temp += `<span class="good-tag">${data.tag}</span>`;
      } else if (data.type == 2) {
        temp += `<span class="good-tag good-tag-red">${data.tag}</span>`;
      }

      temp += `<button class="good-cart"></button></a>`;
    }

    p_bottom.html(temp);
    p_bottom.find("a:first-child").css("margin-left", 0);
  }

  // Popular 버튼 클릭시 실행
  let p_tab = $(".sw-popular .swiper-slide a");

  // p_tab을 클릭시 p_change 구현하기
  $.each(p_tab, function (index) {
    $(this).click(function (event) {
      event.preventDefault();
      p_change(data_arr[index]);

      p_tab.removeClass("popular-bt-focus");
      $(this).addClass("popular-bt-focus");

      let temp = data_title[index];
      $(".section-bt-tab").text(`${temp} 더보기`);
    });
  });

  // 추천물품 슬라이드
  new Swiper(".sw-popular", {
    slidesPerView: 7,
    spaceBetween: 10,
    navigation: {
      nextEl: ".popular-slide-next",
      prevEl: ".popular-slide-prev",
    },
  });

  // 브랜드 슬라이드
  new Swiper(".sw-brand", {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
      nextEl: ".sw-brand-next",
      prevEl: ".sw-brand-prev",
    },
    pagination: {
      el: ".sw-brand-pg",
      type: "fraction",
    },
  });

  // 배너 슬라이드
  new Swiper(".sw-banner", {
    slidesPerView: 2,
    spaceBetween: 0,
    navigation: {
      nextEl: ".banner-next",
      prevEl: ".banner-prev",
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
  });

  // 이용후기 슬라이드
  new Swiper(".sw-review", {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
      nextEl: ".sw-review-next",
      prevEl: ".sw-review-prev",
    },
    pagination: {
      el: ".sw-review-pg",
      type: "fraction",
    },
  });

  // 공지사항 탭메뉴
  let notice_btn = $(".notice-menu button");
  let notice_list = $(".notice-list");

  $.each(notice_btn, function (index) {
    $(this).click(function () {
      notice_btn.removeClass("notice-menu-focus");
      notice_list.removeClass("notice-list-focus");

      notice_btn.eq(index).addClass("notice-menu-focus");
      notice_list.eq(index).addClass("notice-list-focus");
    });
  });
};
