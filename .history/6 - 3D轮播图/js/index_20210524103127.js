import source from "./source.js";

let container = document.querySelector

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

delay().then(()=>{

})