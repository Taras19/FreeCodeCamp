window.addEventListener("pageshow", function(){
  /**/
  let aboutContent = document.querySelector(".about-content");
  let aboutFoto = document.createElement("img");
  aboutFoto.src = "img/about_foto.jpg";
  aboutFoto.alt = "My photo";
  aboutFoto.classList.add("about-foto");
  aboutContent.insertBefore(aboutFoto,aboutContent.children[1]);

  let containerTechnologiesAll = document.querySelectorAll(".container-technologies");
  let listTechnologiesSrc = [
    "img/html.png",
    "img/css.png",
    "img/javascript.png",
    "img/jquery.png",
    "img/boostrap.png",
    "img/github.png"
  ];
  let listTechnologiesAlt = [
    "html",
    "css",
    "javascript",
    "jquery",
    "boostrap",
    "github"
  ];
  for ( let i = 0; i < containerTechnologiesAll.length; i++) {
    let fotoTechnologies = document.createElement("img");
    fotoTechnologies.src=listTechnologiesSrc[i];
    fotoTechnologies.alt=listTechnologiesAlt[i];
    fotoTechnologies.classList.add("foto-technologies");
    containerTechnologiesAll[i].appendChild(fotoTechnologies);
  }

  let portfolioContainerAll = document.querySelectorAll(".portfolio-container");
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
    for(let k =0; k<listSrc[i].length;k++){
      let portfolioFoto = document.createElement("img");
      portfolioFoto.classList.add("portfolio-foto");
      portfolioFoto.src=listSrc[i][k];
      portfolioFoto.alt=listAlt[i][k];
      portfolioContainerAll[i].appendChild(portfolioFoto );
    }
  }

  /* вставка карти*/
  let body = document.querySelector("body");
  let scriptMap = document.createElement("script");
  scriptMap.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAi4qXRc7OLa21zTqg2m87lyx4GAkEnbO8&callback=initMap";
  scriptMap.async = true;
  scriptMap.defer = true;
  body.insertBefore(scriptMap,body.lastElementChild);

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
      /* висота сторінки, при першому оголошенні не всі картинки могли підвантажитись
      тому розмір сторінки переоприділяю */
      scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        );
      if (coorHref.top > 0){
        function scrollDown(){
          let scrollСurrent = window.pageYOffset || document.documentElement.scrollTop;
          let coorHref = document.querySelector(href).getBoundingClientRect();
          if( 0 < coorHref.top && scrollСurrent+step <= scrollHeight - windowHeight){
            requestAnimationFrame(scrollDown);
            window.scrollTo(0,scrollСurrent+step);
          }
          else if(0 < coorHref.top && scrollСurrent+step > scrollHeight - windowHeight){
            window.scrollTo(0,scrollHeight - windowHeight);
            cancelAnimationFrame(scrollDown); 
          }
          else if(0 < coorHref.top && scrollСurrent === scrollHeight - windowHeight){
            /* зупинка виклику функції */
            cancelAnimationFrame(scrollDown);
          }
                            
          else if( 0 > coorHref.top || 0 == coorHref.top){
            window.scrollTo(0,scrollСurrent+coorHref.top);
            /* зупинка виклику функції */
            cancelAnimationFrame(scrollDown);
          }
        }
        scrollDown();  
      }
      else if (coorHref.top < 0){
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
  
  /* для мобільних opacity:1 */
  if ('ontouchstart' in window) {
    let portfolioFotoAll = document.querySelectorAll(".portfolio-foto");
    for (let i = 0; i < portfolioFotoAll.length; i++) {
      portfolioFotoAll[i].classList.add("portfolio-foto__touch");
    }
  }
});