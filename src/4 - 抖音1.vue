<template>
  <div class="dy_box">
    <div
      class="list_box"
      :style="{ transform: `translateY(${y}px)` }"
      :class="{ animateClass: flag }"
    >
      <div
        class="video_box"
        v-for="(item, index) in list"
        :key="item.id"
        @touchstart="start"
        @touchmove="move"
        @touchend="end($event, index)"
      >
        <video
          ref="video"
          :src="item.src"
          class="video"
          :muted="item.muted"
          :autoplay="index == 0"
          loop
        ></video>
        <div class="content_box">
          <p class="title">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let clientY =
  document.body.clientHeight || document.documentElement.clientHeight;
export default {
  data() {
    return {
      list: [
        // muted 控制静音
        {
          id: 1,
          muted: true,
          src: require("./assets/videos/1.mp4"),
          title: "阜阳",
        },
        {
          id: 2,
          muted: true,
          src: require("./assets/videos/2.mp4"),
          title: "王嘉尔",
        },
        {
          id: 3,
          muted: true,
          src: require("./assets/videos/3.mp4"),
          title: "安东尼",
        },
        {
          id: 4,
          muted: true,
          src: require("./assets/videos/4.mp4"),
          title: "魏晨",
        },
        {
          id: 5,
          muted: true,
          src: require("./assets/videos/5.mp4"),
          title: "陈冠希",
        },
      ],
      y: 0, // 控制向上移动的距离
      flag: false,
    };
  },
  methods: {
    start(e) {
      this.flag = false;
      this.startY = e.touches[0].pageY;
      this.startMoveY = this.y; // 当前这次移动之前已经移动的距离
    },
    move(e) {
      let moveY = e.touches[0].pageY - this.startY;
      this.y = moveY + this.startMoveY;
    },
    end(e, n) {
      // 松手时移动的距离
      let endY = e.changedTouches[0].pageY - this.startY;
      // 移动的距离不超过1/4 回到原位 , 大于1/4屏就滑倒下一个
      if (Math.abs(endY) < clientY / 4) {
        this.y = this.startMoveY;
      } else {
        // 向上滑 看下一个视屏
        if (endY < 0) {
          // 说明当前视屏下面还有视屏
          if (this.list[n + 1]) {
            // 在当前的基础下 往下滑动一屏
            this.y = this.startMoveY - clientY;
            // 当前视屏播放暂停 下一个视屏播放
            this.$refs.video[n].pause();
            this.$refs.video[n + 1].play();
          } else {
            // 下面没有视屏了 回到当前视屏 或者可以做个加载更多
            this.y = this.startMoveY;
          }
        } else {
          // 向下滑 看上一个视屏
          // 说明当前视屏上面还有视屏
          if (this.list[n - 1]) {
            // 在当前的基础下 往上滑动一屏
            this.y = this.startMoveY + clientY;
            // 当前视屏播放暂停 上一个视屏播放
            this.$refs.video[n].pause();
            this.$refs.video[n - 1].play();
          } else {
            // 上面没有视屏了 回到当前视屏 或者可以做个刷新所有视屏
            this.y = this.startMoveY;
          }
        }
      }
      this.flag = true;
    },
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