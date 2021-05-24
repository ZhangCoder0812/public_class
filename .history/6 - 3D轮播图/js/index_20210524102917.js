import source from "./source.js";

const delay = function(interval) {
    // interval = 1000
    if (typeof interval === "undefined") interval = 1000;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};
