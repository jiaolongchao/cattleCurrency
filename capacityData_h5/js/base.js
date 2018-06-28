jQuery.extend( jQuery.easing,  {  easeOutExpo: function (x, t, b, c, d) {  return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;  },  easeOutBounce: function (x, t, b, c, d) {  if ((t/=d) < (1/2.75)) {  return c*(7.5625*t*t) + b;  } else if (t < (2/2.75)) {  return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;  } else if (t < (2.5/2.75)) {  return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;  } else {  return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;  }  },  });
$(function(){
    var css =function(t,s){
        s=document.createElement('style');
        s.innerText = t;
        document.body.appendChild(s);
    };
    var num = 7.8;
    var $width = parseInt($('.progressBg').css('width')) * num / 10 + 'px';
    $('.progressBar').animate({width:$width},1000,'easeOutBounce')
    css('.progressBar:before{content:\''+ num +'\'}');

    $('.stockTabTitle li').each(function(index){
        if(index == 0 && $(this).hasClass('active')){
            css('.stockTabTitle li.active:after{margin-left: -25%;}')
        }
        if(index == 1 && $(this).hasClass('active')){
            css('.stockTabText:after{left: 2.4rem;}')
        }
        if(index == 2 && $(this).hasClass('active')){
            css('.stockTabText:after{left: 4.2rem;}')
        }
        if(index == 3 && $(this).hasClass('active')){
            css('.stockTabTitle li.active:after{margin-left: 0} .stockTabText:after{left: 6.15rem;}')
        }
    })
})

function setFontSize(val) { //适配图表字号
    var docEl = document.documentElement;
    if (docEl.clientWidth.clientWidth >= 750) {
        docEl.style.fontSize = '100px';
    } else {
        docEl.style.fontSize = 100 * (docEl.clientWidth / 750) + 'px';
    }
    return parseFloat(docEl.style.fontSize) * val;
}

function checkIsView(o) { //检测是否在可视区域  true 在可视区域 false不在
    var o = $(o);
    var st = $(window).scrollTop();
    var wh = $(window).height();

    var viewPos = st + wh;
    var h = o.height();
    var min = o.offset().top;
    var max = viewPos + h;

    var isView = false;
    if (viewPos >= min && st <= max) {
        isView = true;
    };
    return isView;
};
