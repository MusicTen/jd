// 左侧区域滚动
;(function(){
  var ul = document.querySelector(".jd_content_left ul");
  var jd_content_left = document.querySelector(".jd_content_left");
  var startY = 0; //记录开始位置
  var current = 0; //记录当前ul的位置
  // touchstart 记录开始坐标
  ul.addEventListener("touchstart",function(e){
    startY = e.touches[0].clientY;
    // console.log(startY)
  })
  //touchmove 根据移动的距离,让ul在原来的基础上移动(没有动画)
  ul.addEventListener("touchmove",function(e){
    var distanceY = e.touches[0].clientY - startY;
    ul.style.transition = "none";
    ul.style.transform = "translateY("+ (current+distanceY) +"px)";
  })
  ul.addEventListener("touchend",function(e){
    var distanceY = e.changedTouches[0].clientY - startY;
    current += distanceY;
    if( current > 0){
      current = 0;
    }
    if( current < -(ul.offsetHeight - jd_content_left.offsetHeight)){
      current = -(ul.offsetHeight - jd_content_left.offsetHeight)
    }
    ul.style.transition = "all 1s";
    ul.style.transform = "translateY("+ current+"px)";
  })
})()
// 右侧区域滚动
/*
* iScroll使用注意事项
* 1. 必须要有很长的子元素, 要有一个有宽高的父容器
* 2. 父容器只能有一个子元素, 如果有多个, 其他将会被忽略
* 3. (1) 需要在 onload 中, onload 可以保证图片加载完了, 进行 IScroll 初始化,
*        那么计算子盒子宽高时, 才是准确的
*    (2) 需要清除浮动, 保证计算准确
* */
window.addEventListener("load",function(){
  new IScroll(".jd_content_right",{
    scrollX: false,
    scrollY: true
  })
})





