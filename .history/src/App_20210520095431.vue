<template>
  <div class="dy_box">
   
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
 
  
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.dy_box {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  .list_box {
    .video_box {
      position: relative;
      width: 100%;
      height: 100vh;
      .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: #000;
      }
      .content_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        background: rgba(0, 0, 0, 0);
        .title {
          position: absolute;
          bottom: 50px;
          color: #fff;
          padding: 20px;
          box-sizing: border-box;
          font-size: 30px;
        }
      }
    }
  }
  // 不直接给 list_box 加过度效果是因为 只有在手指松开的才有过渡 手指滑动的时候不需要加过渡
  .animateClass {
    transition: transform 0.5s;
  }
}
</style>