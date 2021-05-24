import source from "./source.js";

let container = document.querySelector("#container"),
    wrapper = container.querySelector(".wrapper"),
    buttonPrev = container.querySelector(".button-prev"),
    buttonNext = container.querySelector(".button-next"),
    slides = [];

// 数据渲染
const render = function(inital) { // inital 是否第一次渲染
    let str = ``;
    source.forEach(item => {
        let { pic , descript:{ name ,identity , dream } } = item 
        str += `
            <div class="slide active">
                <img src="images/01.jpg" alt="" />
                <div class="mark"></div>
                <p class="detail">
                    <span>蒙奇·D·路飞</span>
                    <span>身份：草帽海贼团船长</span>
                    <span>梦想：找到ONE PIECE，并成为海贼王</span>
                </p>
            </div> 
      `;
    });
};

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

    // 将获取的数据补充 保证是5个 差几个从第一个开始补几个
    let diff = source.length - 5;
    if (diff < 0) {
        diff = Math.abs(diff);
        source.slice(0, difff).forEach(item => {
            // 将补充数据的id 自增
            source.push({
                ...item,
                id: parseInt(source[source.length - 1].id) + 1,
            });
        });
    }
});

render(true);
