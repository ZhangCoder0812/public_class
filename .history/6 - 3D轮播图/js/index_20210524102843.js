import source from "./source.js";

const delay = function(interval = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};
