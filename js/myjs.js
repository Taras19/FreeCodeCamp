document.addEventListener("DOMContentLoaded", function(){
	/* висота сторінки */
  var scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  /* висота екрану */
  var windowHeight = document.documentElement.clientHeight;

  /* поточна прокрутка*/
  var scrollСurrent = document.body.scrollTop || document.documentElement.scrollTop;

  /* кнопка меню */
  var menuIcon = document.querySelector(".menu-icon");
  var menu = document.querySelector(".menu");
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
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(scrollTop > 30){
        menu.classList.add("menu-fixed");
        }
      else{
        menu.classList.remove("menu-fixed");
        }

      /* перемикання .active в пунктах меню*/
    var containerPageAll = document.querySelectorAll(".container-page-js");
      for (var i=0; i < containerPageAll.length; i++){
        var coorContainerPage=containerPageAll[i].getBoundingClientRect();
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
  var menuLinkAll = document.querySelectorAll(".menu li a,.double-down");
  var step =30;
  for(var i = 0; i < menuLinkAll.length; i++){
    menuLinkAll[i].addEventListener("click",function(event){
      menuIcon.classList.remove("menu-icon--open");
      menu.classList.remove("menu--open");
      event.preventDefault();
      var href = this.getAttribute("href");
      var coorHref = document.querySelector(href).getBoundingClientRect();
      if (coorHref.top > 0){
        function scrollDown(){
          var scrollСurrent = window.pageYOffset || document.documentElement.scrollTop;
          var coorHref = document.querySelector(href).getBoundingClientRect();
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
          var scrollСurrent = window.pageYOffset || document.documentElement.scrollTop;
          var coorHref = document.querySelector(href).getBoundingClientRect();
          if(0 > coorHref.top){
            requestAnimationFrame(scrollUp);
            window.scrollTo(0,scrollСurrent-step);
                //console.log(coorHref.top+" "+"coorHref.top");
                //console.log(scrollСurrent-step);
                //console.log(scrollСurrent);
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

  /**/
  let portfolioContainerAll = document.querySelectorAll(".portfolio-container");
  //console.log(portfolioContainerAll.length);
  let listSrc = [
    ["img/world_around_us/page-1.jpg",
    "img/world_around_us/page-2.jpg",
    "img/world_around_us/page-3.jpg"],
    ["img/the_band/page-1.jpg",
    "img/the_band/page-2.jpg",
    "img/the_band/page-3.jpg"],
    ["img/elegant/page-1.jpg",
    "img/elegant/page-2.jpg",
    "img/elegant/page-3.jpg"],
    ["img/eclipse/page-1.jpg",
    "img/eclipse/page-2.jpg",
    "img/eclipse/page-3.jpg"]
    ];
  let listAlt = [
    ["Home page",
    "About myself",
    "Portfolio"],
    ["Home page",
    "Meet our band",
    "Discography"],
    ["Home page",
    "Show your amazing work",
    "Contact us",],
    ["Home page",
    "Our design guidelines",
    "Push yourself your designs"]
  ];
  for (let i = 0; i < portfolioContainerAll.length;i++){
    //console.log(i+" i");
    //console.log(listSrc.length+" listSrc.length");
    for(let k =0; k<listSrc[i].length;k++){
      //console.log(listSrc[i].length+" listSrc[i].length");
      //console.log(k+" k");
      let portfolioFoto = document.createElement("img");
      portfolioFoto.classList.add("portfolio-foto");
      portfolioFoto.src=listSrc[i][k];
      portfolioFoto.alt=listAlt[i][k];
      portfolioContainerAll[i].appendChild(portfolioFoto );
    }
  }
});
