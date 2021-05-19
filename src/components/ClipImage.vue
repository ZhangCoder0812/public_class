<template>
  <div class="clipImageBox">
    <div class="canvasBox" @touchstart="startFunc" @touchmove="moveFunc">
      <canvas :width="CW" :height="CH" ref="canvas"></canvas>
      <div
        class="mark"
        v-show="ISMARK"
        :style="{
          width: MW + 'px',
          height: MH + 'px',
          left: ML + 'px',
          top: MT + 'px',
        }"
      ></div>
    </div>

    <div class="buttonBox">
      <input type="file" class="file" ref="file" @change="changFunc" />
      <button @click="clickFunc">选择图片</button>
      <button @click="scaleFunc(1)">放大</button>
      <button @click="scaleFunc(0)">缩小</button>
      <button @click="saveFunc">保存图片</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let winW = document.documentElement.clientWidth,
      font = parseFloat(document.documentElement.style.fontSize),
      canvasW = winW - 0.4 * font,
      markW = canvasW * 0.7;
    return {
      // 画布大小
      CW: canvasW,
      CH: canvasW,
      // MARK大小和位置
      MW: markW,
      MH: markW,
      ML: (canvasW - markW) / 2,
      MT: (canvasW - markW) / 2,
      // 上传图片的大小和位置
      IW: 0,
      IH: 0,
      IL: 0,
      IT: 0,
      // 是否显示MARK
      ISMARK: false,
    };
  },
  methods: {
    clickFunc() {
      // 触发file选择文件操作
      this.$refs.file.click(); //直接触发input的点击事件
    },
    changFunc() {
      // 已经选择了图片
      this.ISMARK = true;
      console.dir(this.$refs.file); // 文件信息
      let file = this.$refs.file.files[0];
      if (!file) return; //点击取消 没有选择就不往下走
      // 先基于FileReader进行文件读取
      let fileExample = new FileReader();
      fileExample.readAsDataURL(file); // 读成base64
      // 读取完成触发
      fileExample.onload = (e) => {
        // e.target.result  base64码
        //创建新图片
        this.IMAGE = new Image();
        this.IMAGE.src = e.target.result;
        this.IMAGE.onload = () => {
          // 给图片设置宽高/位置
          this.IW = this.IMAGE.width;
          this.IH = this.IMAGE.height;
          // 重新按照比列计算宽高 图片很宽 让宽和画布保持一致 高等比缩放，图片很高 让高和画布保持一致 宽等比缩放，
          let n = 1; // 缩放比
          if (this.IW > this.IH) {
            n = this.CW / this.IW;
            this.IW = this.CW;
            this.IH = this.IH * n;
          } else {
            n = this.CH / this.IH;
            this.IH = this.CH;
            this.IW = this.IW * n;
          }

          this.IL = (this.CW - this.IW) / 2;
          this.IT = (this.CH - this.IH) / 2;
          this.drawImage();
        };
      };
    },
    // 在canvas中绘制图片
    drawImage() {
      this.CTX = this.$refs.canvas.getContext("2d");
      this.CTX.clearRect(0, 0, this.CW, this.CH); //清空画布
      // 绘制图片  需要绘制的图片,图片位置，图片宽高
      this.CTX.drawImage(this.IMAGE, this.IL, this.IT, this.IW, this.IH);
    },
    // 缩放图片
    scaleFunc(flag) {
      if (!this.IMAGE) return;
      // 按照图片宽高比进行缩放
      let n = this.IW / this.IH,
        n1 = 20,
        n2 = n1 / n;
      if (flag) {
        this.IW += n1;
        this.IH += n2;
      } else {
        this.IW -= n1;
        this.IH -= n2;
      }
      this.drawImage();
    },
    startFunc(e) {
      // 按下的时候记录手指的坐标
      if (!this.IMAGE) return;
      let point = e.changedTouches[0];
      this.startX = point.clientX;
      this.startY = point.clientY;
    },
    //移动遮罩层
    moveFunc(e) {
      if (!this.IMAGE) return;
      let point = e.changedTouches[0];
      this.changeX = point.clientX - this.startX;
      this.changeY = point.clientY - this.startY;
      // 防止手指抖动 误操作 
      if (Math.abs(this.changeX) > 10 || Math.abs(this.changeY) > 10) {
        this.IL += this.changeX;
        this.IT += this.changeY;
        this.drawImage();
        this.startX = point.clientX;
        this.startY = point.clientY;
      }
    },
    saveFunc() {
      if (!this.IMAGE) return;
      // 获取指定区域的像素信息 即遮罩层的覆盖的区域
      let imageData = this.CTX.getImageData(this.ML, this.MT, this.MW, this.MH);
      // 创建新的画布 不需要往页面中放 只是用于生成图片 
      let canvas2 = document.createElement("canvas"),
        canvas2CTX = canvas2.getContext("2d");
      canvas2.width = this.MW;
      canvas2.height = this.MH;
      // 把像素信息放置到画布中
      canvas2CTX.putImageData(imageData, 0, 0, 0, 0, this.MW, this.MH);
      // 把画布中的内容生成图片的BASE64
      this.$emit("saveImage", canvas2.toDataURL("image/png"));
    },
  },
};

/*
 *  1. 我们需要准备一些数据：画布的大小、MARK遮罩层的大小和位置、上传图片的大小和位置、是否显示MARK...
 *  2. 上传图片：选中图片，把其绘制到画布中
 *  3. 实现图片的拖拽Touch：重新绘制图片所在的位置
 *  4. 实现如图的方法和缩小：重新绘制图片的大小
 *  5. 保存图片的时候：把遮罩层选中的部分（像素）最后生成一张新的图片
 */
</script>

<style lang="less" scoped>
.clipImageBox {
  padding: 0.2rem;
}

.clipImageBox .canvasBox {
  position: relative;
  overflow: hidden;
}

.clipImageBox .canvasBox canvas {
  display: block;
  box-sizing: border-box;
  margin: 0 auto;
  width: 7.1rem;
  height: 7.1rem;
  border: 0.02rem solid #ddd;
}

.clipImageBox .canvasBox .mark {
  box-sizing: border-box;
  position: absolute;
  z-index: 20;
  width: 70%;
  height: 70%;
  border: 0.02rem dashed lightcoral;
  background: rgba(0, 0, 0, 0.2);
}

.clipImageBox .buttonBox .file {
  display: none;
}

.clipImageBox .buttonBox {
  margin-top: 0.3rem;
}

.clipImageBox .buttonBox button {
  margin-right: 0.2rem;
  padding: 0.2rem;
  border: none;
  font-size: 0.28rem;
  background: lightblue;
  cursor: pointer;
}
</style>