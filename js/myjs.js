document.addEventListener("DOMContentLoaded", function(){
	/* висота сторінки */
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  /* висота екрану */
  let windowHeight = document.documentElement.clientHeight;

  /* поточна прокрутка*/
  let scrollСurrent = document.body.scrollTop || document.documentElement.scrollTop;

  /* кнопка меню */
  let menuIcon = document.querySelector(".menu-icon");
  let menu = document.querySelector(".menu");
    menuIcon.addEventListener("click",function(){
      menuIcon.classList.toggle("menu-icon--open");
      menu.classList.toggle("menu--open");
    });

  /* перевизначення поточної прокрутки,висоти екрану,висоти сторінки */
  window.addEventListener("resize",function(){
    /* висота сторінки */
    scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
      );

    /* висота екрану */
    windowHeight = document.documentElement.clientHeight;
      
    /* поточна прокрутка*/
    scrollСurrent = document.body.scrollTop || document.documentElement.scrollTop;
  });

  /*перехід меню з position:static на fixed*/
  window.addEventListener("scroll",function(){
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(scrollTop > 30){
        menu.classList.add("menu-fixed");
        }
      else{
        menu.classList.remove("menu-fixed");
        }

      /* перемикання .active в пунктах меню*/
    let containerPageAll = document.querySelectorAll(".container-page-js");
      for (let i=0; i < containerPageAll.length; i++){
        let coorContainerPage=containerPageAll[i].getBoundingClientRect();
          if(coorContainerPage.top < windowHeight/2 && coorContainerPage.bottom > windowHeight/2){
            document.querySelector(".menu li.active").classList.remove("active");
            document.querySelectorAll(".menu li")[i].classList.add("active");
          }
          else if(scrollСurrent == scrollHeight - windowHeight){
            document.querySelector(".menu li.active").classList.remove("active");
            containerPageAll[containerPageAll.length-1].classList.add("active");
          }
      }
  });
  /* подія для пунктів меню */
  let menuLinkAll = document.querySelectorAll(".menu li a,.double-down");
  let step =30;
  for(let i = 0; i < menuLinkAll.length; i++){
    menuLinkAll[i].addEventListener("click",function(event){
      menuIcon.classList.remove("menu-icon--open");
      menu.classList.remove("menu--open");
      event.preventDefault();
      let href = this.getAttribute("href");
      let coorHref = document.querySelector(href).getBoundingClientRect();
      if (coorHref.top > 0){
        function scrollDown(){
          let scrollСurrent = window.pageYOffset || document.documentElement.scrollTop;
          let coorHref = document.querySelector(href).getBoundingClientRect();
          if( 0 < coorHref.top && scrollСurrent !== scrollHeight - windowHeight){
            requestAnimationFrame(scrollDown);
            window.scrollTo(0,scrollСurrent+step);
                            
          }
          else if(scrollСurrent == scrollHeight - windowHeight){
            window.scrollTo(0,scrollHeight - windowHeight);
            /* зупинка виклику функції */
            cancelAnimationFrame(scrollDown);
          }
                            
          else {
            window.scrollTo(0,scrollСurrent+coorHref.top);
            /* зупинка виклику функції */
            cancelAnimationFrame(scrollDown);
          }
        }
        scrollDown();  
      }
      else{
        function scrollUp(){
          let scrollСurrent = window.pageYOffset || document.documentElement.scrollTop;
          let coorHref = document.querySelector(href).getBoundingClientRect();
          if(0 > coorHref.top){
            requestAnimationFrame(scrollUp);
            window.scrollTo(0,scrollСurrent-step);
                
          }
          else{
            window.scrollTo(0,scrollСurrent+coorHref.top);
            /* зупинка виклику функції */
            cancelAnimationFrame(scrollUp);
          }
        }
        scrollUp();
      }
    });
  }
  
});
