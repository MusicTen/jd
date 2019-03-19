// 头部滚动透明度改变
;(function(){
  var header = document.querySelector('.jd_header');
  window.addEventListener("scroll",function(){
    // console.log(123);
    var opacity = 0;
    var scrollTop = window.pageYOffset;
    if ( scrollTop > 400 ) {
      opacity = 0.9;
    } else {
      opacity = scrollTop/ 400 *0.9
    }
    header.style.background = "rgba(222, 24, 27, " + opacity + ")";
  });
})();

// 动态获取秒杀商品个数,设置其ul宽
;(function(){
  var ul = document.querySelector('.jd_seckill .main ul')
  var lis = document.querySelectorAll('.jd_seckill .main ul li');
  var liWidth = lis[0].offsetWidth;
  ul.style.width = lis.length * liWidth + 'px';
  new IScroll('.jd_seckill .main',{
    scrollX: true,
    scrollY: false
  })
})();

//banner轮播图
//浮动版
// ;(function(){
//   var ul = document.querySelector('.jd_banner ul');
//   var lis = ul.children;
//   var width = lis[0].offsetWidth;
//   var points = document.querySelectorAll('.jd_banner ol li');
//   var index = 1;
//   var timer = setInterval(function(){
//     index++;
//     addTransition()
//     setTransform( -index * width )
//   },2000);
//   ul.addEventListener("transitionend",function(){
//     if (index >= lis.length - 1 ) {
//       index = 1;
//       removeTransition()
//       setTransform( -index * width )
//     }
//     if ( index <= 0 ) {
//       index = lis.length-2;//首尾各加了一个假图
//       removeTransition()
//       setTransform( -index * width )
//     }
//     // 同步小圆点
//     // 上面的判断已经对 index 做了处理, 限制在了 1-8
//     // 小圆点索引 0-7, 让index-1的小圆点, 高亮即可
//     // 先让所有的不亮, 移除类名
//     points.forEach(function(v,i){
//       v.classList.remove('current');
//       points[index-1].classList.add('current');
//     });
//   });

//   // 需求:
//   // 1. 手指滑动时, ul 要跟着手指动
//   // 2. 滑动完成, 需要判断左滑动还是右滑动
//   var start = 0; //记录开始坐标
//   var startTime = 0; // 记录开始的时间
//   ul.addEventListener('touchstart',function(e){
//     clearInterval(timer)
//     // console.log(123)
//     startTime = new Date();
//     start =  e.changedTouches[0].clientX;
//   });
//   ul.addEventListener('touchmove',function(e){
//     var distance = e.changedTouches[0].clientX- start;
//     // console.log(distance);
//     removeTransition();
//     setTransform( -index*width + distance );

//   })

//   // 手指离开屏幕
//   // 1. 根据移动的距离
//   //    (1) 如果向右滑动的距离 > 1/3 宽度, 向右滑动, 显示上一张
//   //    (2) 如果向左滑动的距离 > 1/3 宽度, 向左滑动, 显示下一张
//   //    (3) 如果滑动的距离小于 1/3的宽度, 归位
//   // 2. 需要开启定时器
//   // 3. 添加快速滑动效果
//   //    滑动的时间在 200ms 内, 滑动的距离超过 50, 我们认为用户想要切换图片
//   ul.addEventListener('touchend',function(e){
//     var distanceX = e.changedTouches[0].clientX-start;
//     var time = new Date() - startTime;
//     if(distanceX > width / 3 || time < 200 && distanceX > 50) {
//       index--;
//     } else if (distanceX < -width / 3 || time < 200 && distanceX < -50){
//       index++;
//     }
//     // 归位
//     addTransition();
//     setTransform( -index*width );
//     //开启计时器
//     timer = setInterval(function(){
//       index++;
//       addTransition()
//       setTransform( -index * width )
//     },2000);
//   })

//   //当窗口大小改变时,重新获取li的宽度
//   window.addEventListener('resize',function(){
//     width = lis[0].offsetWidth;
//     removeTransition()
//     setTransform( -index * width )
//   })


//   // 封装一些简单的方法, 处理兼容性
//   // 添加过渡
//   function addTransition(){
//     ul.style.transition = "all .5s";
//     ul.style.webkitTransition = "all .5s";
//   };
//   // 移除过渡
//   function removeTransition(){
//     ul.style.transition = "none";
//     ul.style.webkitTransition = "none";
//   };
//   // 设置位置
//   function setTransform( value ) {
//     ul.style.transform = "translateX(" + value + "px)";
//     ul.style.webkitTransform = "translateX(" + value + "px)";
//   };
// })();
//定位版
;(function(){
  window.addEventListener("load",function(){
    var ul = document.querySelector(".jd_banner ul");
    var lis = ul.children;
    var liHeight = lis[0].offsetHeight;
    var width = lis[0].offsetWidth; // 获取一个li的宽度
    var points = document.querySelectorAll(".jd_banner ol li");

    // 控制定时器的时间
    var interval = 4000;

    // 设置给ul
    ul.style.height = liHeight + "px";

    // 三个最关键的位置, 将三个关键位置的索引初始化好
    var prev = lis.length - 1;
    var now = 0;
    var next = 1;

    // 将三张图片, 根据三个关键位置存的下标, 将图片移动过来
    lis[prev].style.transform = "translateX(" + (-width) +"px)";
    lis[now].style.transform = "translateX(0px)";
    lis[next].style.transform = "translateX(" + width + "px)";


    // 显示下一张图片
    function showNext() {
      // 1. 将 prev 里面存的索引 所对应图片放到牌堆 (不需要过渡)
      lis[prev].style.transition = "none";
      lis[prev].style.transform = "translateX(" + 2 * width + "px)";

      // 2. 更新三个关键位置所存的图片索引
      prev = now;
      now = next;
      next++;

      // 如果 next 超过了最大值, 说明没图片了, 应该重新从 0 开始, 下一张应该是第0张了
      if ( next > lis.length - 1 ) {
        next = 0;
      }

      // 3. 将三张图片, 根据三个关键位置存的下标, 把图片移动过来
      // 添加过渡
      lis[prev].style.transition = "all .5s";
      lis[now].style.transition = "all .5s";
      lis[next].style.transition = "all .5s";

      lis[prev].style.transform = "translateX(" + (-width) +"px)";   // 0
      lis[now].style.transform = "translateX(0px)";  // 1
      lis[next].style.transform = "translateX(" + width + "px)";  // 2

      // 4. 设置小圆点, 根据 now 设置即可, 让now索引的小圆点添加 current类, 其他的移除current
      points.forEach(function( v, i ) {
        v.classList.remove("current");
      })
      //console.log(now)
      points[now].classList.add("current");
    }
    function showPrev(){
      lis[next].style.transition = "none";
      lis[next].style.transform = "translateX("+ 2*width +"px)";
      next = now;
      now = prev;
      prev--;
      if( prev < 0) {
        prev = lis.length-1
      }
      lis[prev].style.transition = "none";
      lis[now].style.transition = "all .5s";
      lis[next].style.transition = "all .5s";
      lis[prev].style.transform = "translateX("+ -width +"px)";
      lis[now].style.transform = "translateX(0px)";
      lis[next].style.transform = "translateX("+ width +"px)";
      points.forEach(function(v,i){
        v.classList.remove("current");
      })
      points[now].classList.add("current");
    }
    
    var timer = setInterval(showNext,interval);
    /*
    * touchstart:
    * 1. 记录开始时间(实现快滑),
    * 2. 记录开始位置(将来计算移动的距离)
    * 3. 清除定时器
    * */
    var startTime = 0;
    var startX = 0;
    ul.addEventListener("touchstart",function(e){
      startTime = new Date();
      startX = e.touches[0].clientX;
      clearInterval(timer);
    })
    ul.addEventListener("touchmove",function(e){
      var distanceX = e.touches[0].clientX - startX;
      
      lis[prev].style.transition = "none";
      lis[now].style.transition = "none";
      lis[next].style.transition = "none";
      lis[prev].style.transform = "translateX("+ (distanceX - width) +"px)"
      lis[now].style.transform = "translateX("+ distanceX +"px)"
      lis[next].style.transform = "translateX("+ (distanceX + width) +"px)"
    })
    ul.addEventListener("touchend",function(e){
      var time = new Date() - startTime;
      var distanceX = e.changedTouches[0].clientX - startX;
      if( distanceX > width/3 || time < 200 && distanceX > 50) {
        showPrev();
      }
      else if( distanceX < -width/3 || time < 200 && distanceX < -50) {
        showNext();
      } 
      else {
        lis[prev].style.transition = "all .5s";
        lis[now].style.transition = "all .5s";
        lis[next].style.transition = "all .5s";

        lis[prev].style.transform = "translateX(" + (-width) +"px)";
        lis[now].style.transform = "translateX(0px)";
        lis[next].style.transform = "translateX(" + width + "px)";
      }
      timer = setInterval(showNext,interval);
    })
    window.addEventListener('resize',function(){
      width = lis[0].offsetWidth;
      ul.style.height = lis[0].offsetHeight + "px";
      // 需要根据三个位置的索引, 设置三张图片的位置, 不需要动画
      lis[prev].style.transition = "none";
      lis[now].style.transition = "none";
      lis[next].style.transition = "none";

      lis[prev].style.transform = "translateX(" + (-width) +"px)";
      lis[now].style.transform = "translateX(0px)";
      lis[next].style.transform = "translateX(" + width + "px)";

    })
  })
})()

// 秒杀倒计时
;(function(){
  var spans = document.querySelectorAll('.jd_seckill .time span');
  var skTime = new Date('2018/6/22 12:00:00')

  function setTime(){
    var now = new Date();
    var time = parseInt((skTime-now) / 1000);
    if(time < 0) {
      // 如果时间到了, 或者是过去的时间, 清除定时器
      time = 0;
      clearInterval(timer);
    }
    var hours = parseInt(time / 3600);
    var minutes= parseInt(time / 60) % 60;
    var seconds= time % 60;
    spans[0].innerHTML = addZero(hours);
    spans[2].innerHTML = addZero(minutes);
    spans[4].innerHTML = addZero(seconds);
  }
  setTime();
  var timer = setInterval(setTime,1000);
  // 给小于10的数字前面 + 0
  function addZero(n){
    return n < 10 ? "0" + n : n;
  };
})()

// 京东快报
;(function(){
  var ul = document.querySelector('.jd_news ul');
  var lis = ul.children;
  var index = 0;
  setInterval(function(){
    // if ( index >= lis.length-1) {
    //   index = 0;
    //   ul.style.transition = "none";
    //   ul.style.webkitTransition = "none";
    //   ul.style.transform = "translateY(-" + index * lis[0].offsetHeight + "px)";
    //   ul.style.webkitTtransform = "translateY(-" + index * lis[0].offsetHeight + "px)";
    // }
    // ul.offsetWidth;
    index++;
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";
    ul.style.transform = "translateY(-" + index * lis[0].offsetHeight + "px)";
    ul.style.webkitTtransform = "translateY(-" + index * lis[0].offsetHeight + "px)";
  },1000);
  ul.addEventListener('transitionend',function(){
    if ( index >= lis.length-1) {
      index = 0;
      ul.style.transition = "none";
      ul.style.webkitTransition = "none";
      ul.style.transform = "translateY(0px)";
      ul.style.webkitTtransform = "translateY(0px)";
    }
  })
})();














