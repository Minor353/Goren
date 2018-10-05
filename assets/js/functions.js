// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  /*// swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });*/

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .header_nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.header_nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function workSlider() {

    $('.slider--prev, .slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.slider').find('.slider--item-left'),
          curLeftPos = $('.slider').children().index(curLeft),
          curCenter = $('.slider').find('.slider--item-center'),
          curCenterPos = $('.slider').children().index(curCenter),
          curRight = $('.slider').find('.slider--item-right'),
          curRightPos = $('.slider').children().index(curRight),
          totalWorks = $('.slider').children().length,
          $left = $('.slider--item-left'),
          $center = $('.slider--item-center'),
          $right = $('.slider--item-right'),
          $item = $('.slider--item');

      $('.slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }

    }, 400);

    $('.slider').animate({ opacity : 1 }, 400);

    });

  }

  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  outerNav();
  workSlider();
  transitionLabels();

});


/***************************************************************************************/
/***************************************************************************************/
/**Переключение страниц по различным пунктам навигации**/
const slideToggle = function() {
  const sideItems = document.querySelectorAll('.side-item');
  const headerItems = document.querySelectorAll('.header_nav-item');
  const sectionList = document.querySelectorAll('.section');
  const arrowList = document.querySelectorAll('.section-arrow');
  const arrowTop = document.querySelector('.section-arrow-top');
  
  for(let i = 0; i < sectionList.length; i++) {
    headerItems[i].addEventListener('click', function(e){
      
      e.preventDefault();
      for(let i = 0; i < sectionList.length; i++) {
        sideItems[i].classList.remove('is-active');
        headerItems[i].classList.remove('is-active');
        sectionList[i].classList.remove('section--is-active');
      }

      sideItems[i].classList.add('is-active');
      headerItems[i].classList.add('is-active');
      sectionList[i].classList.add('section--is-active');
    })

    
  }

  for(let i = 0; i < arrowList.length; i++) {
    arrowList[i].addEventListener('click', function(){
      for(let i = 0; i < sectionList.length; i++) {
        sideItems[i].classList.remove('is-active');
        headerItems[i].classList.remove('is-active');
        sectionList[i].classList.remove('section--is-active');
      }
        sideItems[i +1].classList.add('is-active');
        headerItems[i + 1].classList.add('is-active');
        sectionList[i + 1].classList.add('section--is-active');
      
    });
  }

  arrowTop.addEventListener('click', function(){
    
    for(let i = 0; i < sectionList.length; i++) {
      sideItems[i].classList.remove('is-active');
      headerItems[i].classList.remove('is-active');
      sectionList[i].classList.remove('section--is-active');
    }
      sideItems[0].classList.add('is-active');
      headerItems[0].classList.add('is-active');
      sectionList[0].classList.add('section--is-active');
  });
};

slideToggle();

/***************************************************************************************************/
/**Открытие доп секций на странице Услуги **/

/*const servicesPageOpen = function() {
  const pageBtn = document.querySelectorAll('.section-second_services-item');
  const pageItem = document.querySelectorAll('.services-article');
  const closeBtn = document.querySelectorAll('.close-btn');

  for(let i = 0; i < pageBtn.length; i++) {
    pageBtn[i].addEventListener('click', function(e){
      e.preventDefault();
      pageItem[i].classList.remove('services-article--animate-close');
      pageItem[i].classList.add('services-article--animate-open');
    });

    closeBtn[i].addEventListener('click', function(){
      pageItem[i].classList.remove('services-article--animate-open');
      pageItem[i].classList.add('services-article--animate-close');
    })
  }
}

servicesPageOpen();*/

/****************************************************************************************************/

/**Обработка формы секции О нас*/

$('#form').on('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var form = $(e.target),
        data = form.serialize(),
        url = form.attr('action');

    var request = $.ajax({
        type: 'POST',
        url: url,
        data: data
    });

    let formPopup = document.querySelector('.form-popup'),
        formPopupName = document.querySelector('.form-popup__name');

    request.done(function (msg) {
        formPopup.classList.add('form-popup-active');
        formPopupName.textContent = 'Сообщение отправлено';
    });

    request.fail(function (jqXHR, textStatus) {
        formPopup.classList.add('form-popup-active');
        formPopupName.textContent = 'Произошла ошибка! Сообщение не отправлено.';
    })
};

/****************************************************************************************************/

/**Обработка формы Консультация*/

$('#form-help').on('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var form = $(e.target),
        data = form.serialize(),
        url = form.attr('action');

    var request = $.ajax({
        type: 'POST',
        url: url,
        data: data
    });

    let formPopup = document.querySelector('.form-popup'),
        formPopupName = document.querySelector('.form-popup__name');

    request.done(function (msg) {
        formPopup.classList.add('form-popup-active');
        formPopupName.textContent = 'Сообщение отправлено';
    });

    request.fail(function (jqXHR, textStatus) {
        formPopup.classList.add('form-popup-active');
        formPopupName.textContent = 'Произошла ошибка! Сообщение не отправлено.';
    })
};




/*************************************************************************/
/**Форма Получить консультацию*/

const formHelperOpen = function () {
  const formOpenBtn = document.querySelectorAll('.header-toggle');
  const formHelp = document.querySelector('.form-helpcall');
  const formCloseBtn = document.querySelector('.close-btn--form');

  for(let i = 0; i < formOpenBtn.length; i++) {
  formOpenBtn[i].addEventListener('click', function(){
    formHelp.classList.remove('services-article--animate-close');
    formHelp.classList.add('services-article--animate-open');
  });
  }
  formCloseBtn.addEventListener('click', function(){
    formHelp.classList.remove('services-article--animate-open');
    formHelp.classList.add('services-article--animate-close');
  });

  formHelp.addEventListener('click', function(){
    if(event.target == formHelp) {
      formHelp.classList.remove('services-article--animate-open');
      formHelp.classList.add('services-article--animate-close');
    }
  })
};


formHelperOpen();



const closeFormPopup = function () {
  let formPopup = document.querySelector('.form-popup');
  let closeBtn = document.querySelector('.close-popup-btn');
  const formHelp = document.querySelector('.form-helpcall');

  closeBtn.addEventListener('click', function (e) {
      e.preventDefault();

      formPopup.classList.remove('form-popup-active');
      formHelp.classList.remove('services-article--animate-open');
      formHelp.classList.add('services-article--animate-close');
      $("form")[0].reset();
  })
};
closeFormPopup();


/****************Адаптивное меню***********************/

const mobileMenuOpen = function(){
  const burgerBtn = document.querySelector('.burger-mobile');
  const mobileNav = document.querySelector('.header_nav');
  const mobileNavItem = document.querySelectorAll('.header_nav-item');
  const mobileNavDecor = document.querySelector('.header_nav--decor');

  burgerBtn.addEventListener('click', function(){
    mobileNav.classList.toggle('header_nav--active');
    mobileNavDecor.classList.toggle('header_nav--decor-active');
    for(let i = 0; i < mobileNavItem.length; i++){
      mobileNavItem[i].classList.toggle('nav-animate');
    }
  })
}

mobileMenuOpen();



/***************Табы на услугах*************************/

const tabToogle = function(){
  console.log('work');
  
  const tabsBtns = document.querySelectorAll('.section-second_services-btn');
  const tabsPage = document.querySelectorAll('.section-second_services-item-wrap');

  for(let i = 0; i < tabsBtns.length; i++) {
    tabsBtns[i].addEventListener('click', function(){
      for(let i = 0; i < tabsBtns.length; i++) {
        tabsBtns[i].classList.remove('section-second_services-btn--active');
        tabsPage[i].classList.remove('section-second_services-item-wrap--active');
      }
      tabsBtns[i].classList.add('section-second_services-btn--active');
        tabsPage[i].classList.add('section-second_services-item-wrap--active');
    })
  }
}


tabToogle();