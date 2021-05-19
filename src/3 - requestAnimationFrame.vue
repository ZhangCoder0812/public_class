<template>
  <div id="app"></div>
</template>

<script>
export default {
  mounted() {
    let box = document.querySelector("#app"),
      minL = 0,
      maxL = document.documentElement.clientWidth - box.offsetWidth,
      direction = "right",
      step = 10,
      timer = null;
    function move() {
      // 获取当前的位置 在这个基础上 向左或向右移动
      let curL = parseFloat(getComputedStyle(box)["left"]);
      if (direction == "right") {
        curL += step;
        if (curL >= maxL) {
          curL = maxL;
          direction = "left";
        }
      } else {
        curL -= step;
        if (curL <= minL) {
          curL = minL;
          direction = "right";
        }
      }
      box.style.left = `${curL}px`;
      timer = requestAnimationFrame(move);
    }
    //  timer = setInterval(move, 5);
    timer = requestAnimationFrame(move);
    /* 
      60HZ 一秒钟刷新60次 即16.7ms刷新一次 才能看到最新的效果
      元素 5ms运动一次
        开始 0 
        5ms 位置10
        10ms 位置20 
        15ms 位置30 「此时已经运动3次了 但是屏幕16.7ms刷新一次 所以看不到效果」
         --- 到达16.7ms刷新一次 位置直接蹦到了30 跳过了规定的step为10看到的效果 所以定时器动画会卡顿/抖动/丢帧---
        20ms 位置40 

        还有一个原因是定时器是异步宏任务，可能会不准时。
        使用 requestAnimationFrame 替代
          - 由系统决定回调函数的执行时机
          - 当页面最小化/路由跳转时 requestAnimationFrame不会被执行 而定时器会被执行
            requestAnimationFrame 只有在页面激活状态才会被执行
          - 函数截流：回调函数在屏幕每一次刷新间隔中只执行一次
          - 集中处理改变样式：将每一贞的样式改变收集起来 在一次回流/重绘中完成
            在隐藏或者不可见的元素中 将不会进行回流/重绘
          - 为了兼容处理 不支持requestAnimationFrame情况下 定时器动画时间一般写 16.7 
      
      requestIdleCallback:在浏览器空闲的时候调用回调函数，这样一些不重要的任务可以延后执行
                          防止页面卡顿，只有新版浏览器才支持。
    */
  },
};
</script>

<style lang="less">
div {
  width: 80px;
  height: 90px;
  background: orange;
  position: absolute;
  left: 0;
}
</style>