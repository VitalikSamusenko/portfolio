console.log('1 Смена изображений в секции portfolio +25',
'при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20',
'кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5',
'Перевод страницы на два языка +25',
'при клике по надписи ru англоязычная страница переводится на русский язык +10',
'при клике по надписи en русскоязычная страница переводится на английский язык +10',
'надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5',
'Переключение светлой и тёмной темы +25',
'На страницу добавлен переключатель при клике по которому:',
'тёмная тема приложения сменяется светлой +10',
'светлая тема приложения сменяется тёмной +10',
'после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5',
'Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5',
'Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5');

import i18Obj from './translate.js';




const hamburger = document.querySelector('.hamburger');
const hl = document.querySelector('.header__list');
const nav = document.querySelectorAll('.header__item_link');
const ov = document.querySelector('.overlay');
const hs = document.querySelectorAll('.hamburger span');

function toggleMenu() {
    hamburger.classList.toggle('hamburger__active');
    hl.classList.toggle('header__list-active');
    ov.classList.toggle('overlay-active');
    if(theme == 'dark')
    {
        hs.forEach(i => i.classList.toggle('light-theme'));
        hl.classList.toggle('light-theme');
        nav.forEach(i => i.classList.toggle('light-theme'));
    }
  
}

hamburger.addEventListener('click', toggleMenu);


function closeMenu(event) {
    if ((event.target.classList.contains('header__item_link'))||(event.target.classList.contains('overlay-active'))) {
        hamburger.classList.remove('hamburger__active');
        hl.classList.remove('header__list-active');
        ov.classList.remove('overlay-active');
    }
}
  
hl.addEventListener('click', closeMenu);
ov.addEventListener('click', closeMenu);


// Смена картинок в portfolio

const portfolioBtn = document.querySelector('.portfolio__buttons');
const portfolioImages = document.querySelectorAll('.portfolio__img');
const portfolioB = document.querySelectorAll('.portfolio__buttons');
const portfolioBtns = document.querySelector('.buttons__wrapper');


const seasons = ['winter', 'spring', 'summer', 'autumn'];
function preloadImages() {
    seasons.forEach((item) => {
        for(let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${item}/${i}.jpg`;
          }
    })
    
  }
preloadImages();

function changeImage(event) {
    if(event.target.classList.contains('portfolio__buttons')) {
       
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    }
}
portfolioBtns.addEventListener('click', changeImage);

function changeActive(event) {
    portfolioB.forEach((i) => i.classList.remove('buttons-active'));
    event.target.classList.add('buttons-active');
}

portfolioB.forEach((item) => item.addEventListener('click', changeActive));

//Изменение языка

const hsi = document.querySelectorAll('.header__switch_item');

function changeActiveLang(event) {
    hsi.forEach((i) => i.classList.remove('header__switch_item-active'));
    event.target.classList.add('header__switch_item-active'); 
    getTranslate(event.target.textContent);
    lang=event.target.textContent;
    console.log(lang);
}


hsi.forEach((item) => item.addEventListener('click', changeActiveLang));


const tr = document.querySelectorAll('[data-i18]');
function getTranslate(lang){
    tr.forEach((item) => {
        for(let q in i18Obj[lang]) {
            if(item.dataset.i18 == q){
                if (item.placeholder) {
                    item.placeholder = i18Obj[lang][q];
                  }else{                
                    item.textContent = i18Obj[lang][q];}
            }
            
        }

    })
}



// Измененине темы

const t = ['body','.section__title','.section__title span','.skills','.portfolio','.video','.price','.section__title-left','.section__title-left>span','.portfolio__buttons']; 
const st = document.querySelector('.header__switch-theme_img');
const svg =  document.querySelector('.header__switch-theme_img use');
function themeToggle(event){
    t.forEach((item)=> {
        let cl = document.querySelectorAll(item);
        cl.forEach((i) => {
            i.classList.toggle('light-theme');
        })
    })
    st.classList.toggle('active');
    if(!st.classList.contains('active')){
        svg.setAttribute('href', './assets/svg/sprite.svg#sun');
    }else{
        svg.setAttribute('href', './assets/svg/sprite.svg#moon');
    }
    if (theme === 'light')theme = 'dark';
    else theme = 'light'
}

st.addEventListener('click', themeToggle);


// Local storage
let lang = 'en';
let theme = 'dark';

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('lang')) {
      const l = localStorage.getItem('lang');
      getTranslate(l);
      hsi.forEach((i) => {
        i.classList.remove('header__switch_item-active')
        if (i.textContent == l){ i.classList.add('header__switch_item-active')}
        });
        lang=l;
    }

    if(localStorage.getItem('theme')) {
        const t = localStorage.getItem('theme');
        if (t == "dark"){
            themeToggle();
        }
        theme=t;
      }
  }
  window.addEventListener('load', getLocalStorage)





  var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('mouseover', animateButton);
  }


//   player

const video = document.querySelector('.video__viewer'),
        playBtn = document.querySelector('.play-icon.play'),
        progress = document.querySelector('.progress'),
        volume = document.querySelector('.volume'),
        volumeImg = document.querySelector('.play-icon.volumes'),
        videoBtn = document.querySelector('.video__button'),
        videoImg = document.querySelector('.video__img-pc');

// play/pause 
function toggleVideoStatus(){
    if(video.paused){
        video.play();
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
        videoBtn.style="display:none;";
        videoImg.style="display:none;";
    }else {
        video.pause();
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
        videoBtn.style="display:block;";
    }
}

playBtn.addEventListener('click', toggleVideoStatus);
videoBtn.addEventListener('click', toggleVideoStatus);
video.addEventListener('click', toggleVideoStatus);


//progress

function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100;
    progress.style="background:linear-gradient( to right, #bdae82 "+progress.value+"%, #bdae82 0%, #c8c8c8 0%, #c8c8c8 100% );";
}

video.addEventListener('timeupdate', updateProgress);

//rewind

function videoRewind(){
    let w = progress.value;
    video.currentTime = (video.duration/100)*w;
}

progress.addEventListener('input', videoRewind);

//volume
video.volume = volume.value/100;
function changeVolume(){
    volume.style="background:linear-gradient( to right, #bdae82 "+volume.value+"%, #bdae82 0%, #c8c8c8 0%, #c8c8c8 100% );";
    video.volume = volume.value/100;
    if (video.volume==0){
        volumeImg.classList.remove('volume-icon');
        volumeImg.classList.add('mute');
    }else{
        volumeImg.classList.remove('mute');
        volumeImg.classList.add('volume-icon');
    }
}

volume.addEventListener('input', changeVolume);
let v = video.volume;

function toggleVolume(){
    
    if (video.volume!==0){
        volumeImg.classList.remove('volume-icon');
        volumeImg.classList.add('mute');
        v = video.volume;
        video.volume=0;
        volume.value=0;
        volume.style="background:linear-gradient( to right, #bdae82 "+volume.value+"%, #bdae82 0%, #c8c8c8 0%, #c8c8c8 100% );";
    }else{   
        volumeImg.classList.remove('mute');
        volumeImg.classList.add('volume-icon');
        video.volume=v;
        volume.value=v*100;
        volume.style="background:linear-gradient( to right, #bdae82 "+volume.value+"%, #bdae82 0%, #c8c8c8 0%, #c8c8c8 100% );";
}
}


volumeImg.addEventListener('click', toggleVolume);
