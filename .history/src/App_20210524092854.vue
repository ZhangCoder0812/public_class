<template>
  <div id="app">
 
  </div>
</template>

<script>
 
export default {
  data() {
    return {
      tranName: ""
    };
  },
  
};
</script>

<style lang="less" scoped>
.video-enter-active {
  transition: 0.5s;
}
.video-enter {
  transform: translate(-100%);
}
.video-enter-to {
  transform: translateX(0);
}
.video-leave-active {
  transition: 0.5s;
}
.video-leave {
  opacity: 1;
}
.video-leave-to {
  opacity: 0;
}
.song-enter-active {
  transition: 0.5s;
}
.song-enter {
  opacity: 0;
}
.song-enter-to {
  opacity: 1;
}
.song-leave-active {
  transition: 0.5s;
}
.song-leave {
  transform: translateX(0);
}
.song-leave-to {
  transform: translateX(-100%);
}
</style>