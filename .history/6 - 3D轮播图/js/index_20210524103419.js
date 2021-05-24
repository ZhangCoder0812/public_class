import source from "./source.js";

let container = document.querySelector("#container"),
    wrapper = container.querySelector(".wrapper"),
    buttonPrev = container.querySelector(".button-prev"),
    buttonNext = container.querySelector(".button-next"),
    slides = [];

// 延迟函数
const delay = function(interval) {
    // interval = 1000 默认值会有坑
    if (typeof interval === "undefined") interval = 1000;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

delay().then(() => {
    // 拿到图片数据 控制元素显示
    wrapper.style.opacity = 1;
    buttonPrev.style.opacity = 1;
    buttonNext.style.opacity = 1;

    // 
    
});
