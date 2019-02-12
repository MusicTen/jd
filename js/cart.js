//功能1:全选反选
;(function(){
  var checkbox = document.querySelectorAll(".jd_checkbox");
  var title_checkbox = document.querySelector(".goods_title .jd_checkbox");
  var content_checkbox = document.querySelectorAll(".goods_wraper .jd_checkbox");
  var total = 0;
  checkbox.forEach(function( v, i){
    v.addEventListener("click", function(){
      this.classList.toggle("checked")
      // console.log(1)
    })
  })
  title_checkbox.addEventListener("click",function(){
    if(this.classList.contains("checked")){
      content_checkbox.forEach(function(v,i) {
        v.classList.add("checked");
        total = content_checkbox.length;
      })
    } else {
      content_checkbox.forEach(function(v,i) {
        v.classList.remove("checked");
        total = 0;
      })
    }
  })
  // console.log(content_checkbox.length);
  content_checkbox.forEach(function(v,i) {
    v.addEventListener("click", function(){
      if(v.classList.contains("checked")){
        total++;
      }else {
        total--;
      }
      if(total == content_checkbox.length) {
        title_checkbox.classList.add("checked")
      } else {
        title_checkbox.classList.remove("checked")
      }
      console.log(total);
    })
  })
})();


//功能2:垃圾桶动画
;(function(){
  var deleteBoxs = document.querySelectorAll(".delete");
  var jd_modal = document.querySelector('.jd_modal');
  var cancel = document.querySelector(".cancel");
  var currentbox;
  deleteBoxs.forEach(function(v,i){
    v.addEventListener("click", function(){
      this.classList.add("current");
      jd_modal.style.display = "block";
      currentbox = this;
    })
  })
  cancel.addEventListener("click",function(){
    currentbox.classList.remove("current");
    jd_modal.style.display = "none";
  })
})();

