<template>
  <div id="app">
    <section>
      <!--   <h2 v-demo:100.stop="text">{{ text }}</h2> -->
      <h2 v-copy="text">{{ text }}</h2>
    </section>

    <!-- 限制输入 -->
    <section>
      <input type="text" v-model="inputText" v-emoji />
      <br />
      <span>{{ inputText }}</span>
    </section>
    <!-- 防抖截流  可以设置多个参数 多种情况
                  v-debounce:[wait].immediate = "{
                    func:fn,
                    type:'click',
                    params:[1,2,3]
                  }" 

                  直接传函数 其他参数走默认值
                  v-debounce="fn"
    -->
    <section>
      <button v-debounce:1000.immediate="fn">防抖</button>
      <button
        v-throttle:1000="{
          func: fn,
          params: [10, 20],
        }"
      >
        截流
      </button>
    </section>
    <!-- 权限校验 -->
    <section>
      <button @click="login" v-if="!isLogin">登陆</button>
      <div v-else>
        <button v-permission="'select'">查询</button>
        <button v-permission="'insert'">添加</button>
        <button v-permission="'update'">修改</button>
        <button v-permission="'delete'">删除</button>
      </div>
    </section>
    <div style="height: 1000px"></div>
    <!-- 图片懒加载 -->
    <!--   <div
      v-lazyload="
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F4c%2Fa6%2F31%2F4ca631a8841304be2351295d50cf801d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623730878&t=2e532484a512adac6b4bbad274a11247'
      "
    >
      <img width="500" height="200" alt="" />
    </div> -->
      <img width="500" height="200" src="./assets/glc.png" alt="" />
    <div v-lazyload="'./assets/glc.png'">
      <img width="500" height="200" alt="" />
    </div>
  </div>
</template>

<script>
/* IMPORT CSS */
import "./assets/reset.min.css";
import "./assets/basic.less";

export default {
  data() {
    return {
      text: "王清是傻逼",
      inputText: "",
      isLogin: false,
    };
  },
  methods: {
    fn(x, y) {
      console.log("ok", x, y);
    },
    login() {
      this.isLogin = true;
      localStorage.setItem("permission", ["select|insert"]);
    },
  },
};
</script>

<style lang="less">
#app {
  overflow-y: scroll;
}
section {
  margin-bottom: 20px;
}
</style>