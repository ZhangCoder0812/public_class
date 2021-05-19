import Vue from "vue";
import { debounce, throttle } from "./utils";

// 点击复制
Vue.directive("copy", {
  bind(el, binding) {
    // 获取值 放在el上 便于每次拿到最新的值
    el.$value = binding.value;
    // 将添加的方法放在属性上 便于后面移除
    el.$handle = function() {
      let text = el.$value,
        textarea,
        copyText = "";
      if (!text) {
        return alert("复制的内容不能为空");
      }
      textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.readOnly = "readOnly";
      // textarea.style.display = "none"; 这样隐藏拿不到复制的信息
      textarea.style.cssText = "opacity:0;position:fixed;left:-999999px";
      document.body.appendChild(textarea);
      textarea.select();
      copyText = document.execCommand("Copy");
      if (copyText) {
        alert("复制成功");
      }
      document.body.removeChild(textarea);
    };
    el.addEventListener("click", el.$handle);
  },
  // 插入到指定的元素中 可能该元素还没插入到页面中
  inserted() {},
  // 该指令所在的组件更新 可能自组件还未更新完
  update() {},
  // 指令所在组件全部更新完 包括子组件
  componentUpdated(el, binding) {
    el.$value = binding.value;
  },
  // 组件销毁 指令也销毁了
  unbind(el) {
    el.removeEventListener("click", el.$handle);
  },
});

// 自定义触发事件 自动触发
const trgger = function(el, type) {
  let e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

// 限制不能输入特俗字符
Vue.directive("emoji", {
  bind(el) {
    el.$handle = function() {
      let value = el.value,
        reg = /[^0-9a-zA-Z]/g;
      el.value = value.replace(reg, "");
      // 同步到响应式数据中
      trgger(el, "input");
    };
    el.addEventListener("keyup", el.$handle);
  },
  unbind(el) {
    el.removeEventListener("keyup", el.$handle);
  },
});

// 防抖 节流
const config = {
  bind(el, binding) {
    let val = binding.value,
      wait = 500,
      immediate = false,
      type = "click",
      params = [],
      func,
      handle = binding.name === "debounce" ? debounce : throttle;

    if (val == null) return;
    if (typeof val !== "object" && typeof val !== "function") return;
    if (binding.arg) wait = +binding.arg;
    if (binding.modifiers && binding.modifiers.immediate) immediate = true;
    if (typeof val === "function") func = val;
    if (typeof val === "object") {
      func = val.func || function() {};
      type = val.type || "click";
      params = val.params || [];
    }
    el.$type = type;
    el.$handle = handle(
      // 外面包一层函数 可以传递参数
      function proxy(...args) {
        return func.call(this, ...params.concat(args));
      },
      wait,
      immediate
    );
    el.addEventListener(el.$type, el.$handle);
  },
  unbind(el) {
    el.removeEventListener(el.$type, el.$handle);
  },
};
Vue.directive("debounce", config);
Vue.directive("throttle", config);

// 权限校验
Vue.directive("permission", {
  inserted(el, binding) {
    // 获取用户权限列表 格式「xxx｜xxx」
    let permission = localStorage.getItem("permission"),
      permissionList = [];
    if (!permission) permission = "";
    permissionList = permission.split("|");
    // 获取用户传递的权限 格式「xxx｜xxx」
    let passText = binding.value,
      passTextArr = [];
    if (!passText) passText = "";
    passTextArr = passText.split("|");
    // 验证是否有权限
    let flag = false,
      i = 0,
      len = passTextArr.length;
    for (; i < len; i++) {
      if (permissionList.includes(passTextArr[i])) {
        flag = true;
        break;
      }
    }
    // 控制元素是否显示 有个弊端就是移除节点删除之后回不来了 可以先存起来或者通过css设置显示隐藏
    // 一般来说权限改变都是重新登陆的
    if (!flag) el.parentNode && el.parentNode.removeChild(el);
  },
});

//图片懒加载
const ob_config = {
  threshold: [1],
};
const ob = new IntersectionObserver((entries) => {
  entries.forEach((item) => {
    let { target, isIntersecting } = item;
    if (!isIntersecting) return;
    let imgBox = target.querySelector("img");
    console.log(imgBox)
    if (!imgBox) return;
    imgBox.src = target.$src;
    imgBox.style.opacity = 1;
    ob.unobserve(target);
  });
}, ob_config);

Vue.directive("lazyload", {
  inserted(el, binding) {
    console.log(binding)
     let imgBox = el.querySelector("img");
    if (!imgBox) return;
    imgBox.src = "";
    imgBox.style.opacity = 0;
    imgBox.style.transition = "opacity .3s";
    el.$src = binding.value;
    ob.observe(el);
  },
});

/* 
3.0
    app.directive("demo", {
    beforeMount(el, binding, vnode, prevVnode) {}, // bind
    mounted() {}, // inserted
    beforeUpdate() {},
    updated() {}, // componentUpdated
    beforeUnmount() {},
    unmounted() {}, // unbind
    });
 */
