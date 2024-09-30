$(function () {
  /* 팝업 */
  if ($.cookie('nopopup') != 'Y') {
    $('.popup_area').css('display', 'block');
  } else {
    $('.popup_area').css('display', 'none');
  }

  $('#popupClose').click(function () {
    event.preventDefault();
    if ($('#nopopup').is(':checked')) {
      $.cookie('nopopup', 'Y', {
        expires: 1,
      });
    }
    $('.popup_area').css('display', 'none');
  });

  /* Header Sticky */
  (function () {
    var header = $('.header');
    var scrolled = false;
    $(window).scroll(function () {
      if (80 < $(window).scrollTop() && !scrolled) {
        header.addClass('sticky');
        scrolled = true;

        document.querySelectorAll('.tab_bar .nav-link').forEach((linkItem) => {
          linkItem.addEventListener('click', () => {
            window.scrollTo(0, 200);
          });
        });
      }
      if (80 > $(window).scrollTop() && scrolled) {
        header.removeClass('sticky');
        scrolled = false;

        document.querySelectorAll('.tab_bar .nav-link').forEach((linkItem) => {
          linkItem.addEventListener('click', () => {
            window.scrollTo(0, 0);
          });
        });
      }
    });
  })();

  /* 모바일 햄버거 버튼 */
  $('.header__toggle-btn').on('click', function () {
    $(this).parents('.header').toggleClass('visible');
  });

  /* 커스텀 파일첨부 */
  $(document).on('change', '.file_input', function () {
    $fileName = $(this).val();

    if ($fileName === '') $fileName === '파일을 선택해주세요.';

    $('.file_name').text($fileName);
  });

  /* 파일첨부 용량 제한 */
  $('input.file_input')
    .off()
    .on('change', function () {
      if (this.files && this.files[0]) {
        var maxSize = 5 * 1024 * 1024; // 1024 * 1024 = 1MB
        var fileSize = this.files[0].size;

        if (fileSize > maxSize) {
          alert('첨부파일 사이즈는 5MB 이내로 등록 가능합니다.');
          $(this).val('');
          return false;
        }
      }
    });

  /* vendor: rangeSlider */
  $('.range_slider').ionRangeSlider({
    grid: true,
    grid_num: 12,
    min: 0,
    max: 300,
    step: 1,
  });

  /* lnb 메뉴 disabled 상태 안내 메시지 */
  $('.lnb > li > a.disabled').on('mouseenter', function () {
    $(this).attr('title', '서비스신청 후 이용하실 수 있습니다.');
  });

  /* vendor 스크롤 애니메이션 */
  AOS.init({
    duration: 1500,
  });

  /* vendor 공지사항 스와이퍼 */
  new Swiper('.home__notice .swiper-container', {
    direction: 'vertical',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
  });

  /* 탑버튼 */
  $('.fixed-btns .top').on('click', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: 0,
    });
  });
});

/* input number maxlength */
function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}
